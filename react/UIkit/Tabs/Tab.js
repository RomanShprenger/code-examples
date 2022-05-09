import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { resolveStyles } from 'utils';
import { Tab as ReactTab } from 'react-tabs';

const stylePath = resolveStyles('Tabs/styles');
import(`../${stylePath}`).then();

const Tab = ({ classNamePrefix, className, ...otherProps }) => {
  const mergedClassName = cx(classNamePrefix, className);

  return (
    <ReactTab
      className={mergedClassName}
      disabledClassName={`${classNamePrefix}--disabled`}
      selectedClassName={`${classNamePrefix}--selected`}
      {...otherProps}
    />
  );
};

Tab.propTypes = {
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
};

Tab.defaultProps = {
  classNamePrefix: 'yui-tabs__tab',
  className: '',
};

Tab.tabsRole = 'Tab';

export default Tab;
