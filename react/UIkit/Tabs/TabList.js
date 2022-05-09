import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { resolveStyles } from 'utils';
import { TabList as ReactTabList } from 'react-tabs';

const stylePath = resolveStyles('Tabs/styles');
import(`../${stylePath}`).then();

const TabList = ({ children, classNamePrefix, className, ...otherProps }) => {
  const mergedClassName = cx(
    classNamePrefix,
    className,
    `${classNamePrefix}--${children.length}`,
  );

  return (
    <ReactTabList className={mergedClassName} {...otherProps}>
      {children}
    </ReactTabList>
  );
};

TabList.propTypes = {
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

TabList.defaultProps = {
  classNamePrefix: 'yui-tabs__tab-list',
  className: '',
};

TabList.tabsRole = 'TabList';

export default TabList;
