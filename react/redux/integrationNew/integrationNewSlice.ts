import * as toolkit from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  fetchIntegrationsList,
  fetchIntegrationSchema,
  createIntegration,
} from './integrationNewAPI';

// Initital states
// TODO: create type for the state
const initialState: any = {
  status: null, // can use for loading status in the future
  step: 0,
  list: [], // default data without filters
  choosenService: null,
  connectionFields: null,
  connectionDetails: null,
  deployRoles: null,
  statusRequest: null,
};

// Async actions
export const initData = toolkit.createAsyncThunk(
  'requests/fetchIntegrationsList',
  async () => {
    const response = await fetchIntegrationsList();
    return response;
  }
);

export const getSchema = toolkit.createAsyncThunk(
  'requests/fetchIntegrationSchema',
  // TODO: create type for the service
  async (service: any) => {
    const response = await fetchIntegrationSchema(service);
    return response;
  }
);

export const createNewIntegration = toolkit.createAsyncThunk(
  'request/CreateIntegration',
  // TODO: create type for the request
  async ({ integration, callback }: any, { getState }: any) => {
    const response = await createIntegration(
      integration,
      getState().system.token
    );
    console.log(callback);
    if (callback) {
      callback();
    }
    return response;
  }
);

// Reducer actions
export const integrationNewSlice = toolkit.createSlice({
  name: 'integrationNew',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step = state.step + 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setService: (state, action) => {
      state.choosenService = action.payload;
    },
    setConnectionDetails: (state, action) => {
      state.connectionDetails = action.payload;
    },
    setDeployRoles: (state, action) => {
      state.deployRoles = action.payload;
    },
    clearAll: (state) => {
      state.step = 0;
      state.choosenService = null;
      state.connectionFields = null;
      state.connectionDetails = null;
      state.deployRoles = null;
      state.statusRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchema.fulfilled, (state, action) => {
        state.connectionFields = action.payload ? [...action.payload] : [];
      })
      .addCase(initData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initData.fulfilled, (state, action) => {
        state.status = 'done';
        state.list = action.payload ? [...action.payload] : [];
      })
      .addCase(createNewIntegration.fulfilled, (state, action) => {
        // TODO: after adding API request, make checking of response here
        if (action.payload.status === 200 || action.payload.status === 201) {
          state.statusRequest = {
            status: 'success',
            msg: 'Your stack was successfully updated',
          };
        } else {
          state.statusRequest = {
            status: 'error',
            msg: 'We couldn’t connect to your account, please verify the details provided are correct.',
          };
        }
      })
      .addCase(createNewIntegration.rejected, (state, action) => {
        // TODO: after adding API request, make checking of response here
        state.statusRequest = {
          status: 'error',
          msg: 'We couldn’t connect to your account, please verify the details provided are correct.',
        };
      });
  },
});

// Export of reducer actions
export const {
  nextStep,
  setStep,
  setService,
  setConnectionDetails,
  setDeployRoles,
  clearAll,
} = integrationNewSlice.actions;

export const integrate = (callback) => (dispatch, getState) => {
  const service = selectService(getState());
  const details = selectConnectionDetails(getState());
  const roles = selectDeployRoles(getState());

  // TODO: change this params in API method. Use account_data instead of separate params (because we can have any scheme)
  const integration = {
    account_identifier: service === 'Okta' ? roles['url'] : undefined,
    ...details,
    type: _.toLower(service),
    connection_details: roles,
  };

  dispatch(createNewIntegration({ integration, callback }));
};

// Selectors
export const selectInitData = (state) => state.integrationNew.list;
export const selectStatusRequest = (state) =>
  state.integrationNew.statusRequest;
export const selectService = (state) => state.integrationNew.choosenService;
export const selectFormFields = (state) =>
  state.integrationNew.connectionFields;
export const selectConnectionDetails = (state) =>
  state.integrationNew.connectionDetails;
export const selectDeployRoles = (state) => state.integrationNew.deployRoles;
export const selectStep = (state) => state.integrationNew.step;
export const selectStatus = (state) => state.integrationNew.status;

export default integrationNewSlice.reducer;
