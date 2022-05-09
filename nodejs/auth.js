const axios = require('axios');
const Arweave = require('arweave');

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

const expire = () => Date.now() + 24 * 3600000; // 24 hours from now

async function verifyNonce(signature, userprofile) {
    const decode_signature = Arweave.utils.b64UrlToBuffer(signature)
    const decode_nonce = Arweave.utils.stringToBuffer(userprofile.nonce)
    if (Date.now() > userprofile.nonceexpiry) {
        userprofile.nonce = Math.random.toString()
        userprofile.nonceexpiry = expire();
        return undefined
    }
    return await arweave.transactions.crypto.verify(userprofile.publickey, decode_nonce, decode_signature)
}

class AuthRoutes {
  constructor(authData) {
    this.authModel = authData;
  }

  async login(req, res) {
    try {
      const { address, signature } = req.body;

      if (!(address && signature)) {
        res.status(400).send("All input is required");
      }

      const querySpec = {
        query: `SELECT * from c WHERE c.id = "${address}"`
      };

      const items = await this.authModel.find(querySpec);
      const userprofile = items[0];

      if (!userprofile) {
        res.status(400).send("User isn't found");
      }

      const verification_result = await verifyNonce(signature, userprofile);

      switch (verification_result) {
          case undefined:
              res.status(400).send("expired nonce")
              return
          case true:
              res.send({
                  statusCode: 200,
                  profile: userprofile
              })
              return
          case false:
              res.status(401).send("improperly signed nonce")
              return
      }
    } catch (err) {
        console.error(err.message)
        res.status(402).send(err.message)
    }
  }

  async createUser(req, res) {
    try {
        const onboardingjson = req.body
        if (!('id' in onboardingjson && 'publickey' in onboardingjson)) {
            res.status(400).send("All input is required");
        }
        try {
            const nonce = Math.random().toString()
            onboardingjson.nonce = nonce
            onboardingjson.nonceexpiry = expire()
            await this.authModel.addItem(onboardingjson);
            res.send({
                statusCode: 200,
                nonce: nonce,
                message: "User created"
            })
        } catch (ex) {
            res.send({
                statusCode: 401,
                message: "Unable to create user, user already present"
            })
        }
    } catch {
        res.status(402).send("login error")
    }
  }

  async getUser(req, res) {
    try {
      const { address, signature } = req.query;

      if (!(address && signature)) {
        res.status(400).send("All input is required");
      }

      const querySpec = {
        query: `SELECT * from c WHERE c.id = "${address}"`
      };

      const items = await this.authModel.find(querySpec);
      const userprofile = items[0];

      if (!userprofile) {
        res.status(400).send("User isn't found");
      }

      const verification_result = await verifyNonce(signature, userprofile);

      switch (verification_result) {
          case undefined:
              res.status(400).send("expired nonce")
              return
          case true:
              res.send({
                  statusCode: 200,
                  profile: userprofile
              })
              return
          case false:
              res.status(401).send("improperly signed nonce")
              return
      }
    } catch (err) {
        console.error(err.message)
        res.status(402).send(err.message)
    }
  }

  async getNonce(req, res) {
    try {
      const {
        address: publickey,
      } = req.query;

      const querySpec = {
        query: `SELECT * from c WHERE c.id = "${publickey}"`
      };

      const items = await this.authModel.find(querySpec);

      const readDoc = items[0];
      if (typeof readDoc === 'undefined') {
          res.send({
              status: 200,
              nonce: Math.random().toString()
          })
      } else {
          readDoc.nonce = Math.random().toString();
          readDoc.nonceexpiry = expire();
          await this.authModel.updateItem(readDoc, publickey);
          res.send({
              status: 200,
              nonce: readDoc.nonce
          })
      }
    } catch(err) {
      res.status(402).send("login error")
    }
  }
}

module.exports = AuthRoutes;
