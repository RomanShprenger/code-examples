import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { resolveStyles } from 'utils';
import { TabPanel as ReactTabPanel } from 'react-tabs';

const stylePath = resolveStyles('Tabs/styles');
import(`../${stylePath}`).then();

const TabPanel = ({ classNamePrefix, className, ...otherProps }) => {
  const mergedClassName = cx(classNamePrefix, className);

  return (
    <ReactTabPanel
      className={mergedClassName}
      selectedClassName={`${classNamePrefix}--selected`}
      {...otherProps}
    />
  );
};

TabPanel.propTypes = {
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
};

TabPanel.defaultProps = {
  classNamePrefix: 'yui-tabs__tab-panel',
  className: '',
};

TabPanel.tabsRole = 'TabPanel';

export default TabPanel;
