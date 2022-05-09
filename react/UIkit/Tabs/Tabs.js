import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { resolveStyles } from 'utils';
import { Tabs as ReactTabs } from 'react-tabs';

const stylePath = resolveStyles('Tabs/styles');
import(`../${stylePath}`).then();

const Tabs = ({ classNamePrefix, className, ...otherProps }) => {
  const mergedClassName = cx(classNamePrefix, className);

  return (
    <ReactTabs
      className={mergedClassName}
      {...otherProps}
    />
  );
};

Tabs.propTypes = {
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
};

Tabs.defaultProps = {
  classNamePrefix: 'yui-tabs',
  className: '',
};

export default Tabs;
