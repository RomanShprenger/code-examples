import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import cx from 'classnames';
import { resolveStyles } from 'utils';
import { withFocusedState } from 'hocs';

const stylePath = resolveStyles('Button/styles');
import(`../${stylePath}`).then();

const Button = (props) => {
  const {
    disabled,
    focused,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    component: Component,
    size,
    format,
    kind,
    classNamePrefix,
    className,
    onFocus,
    onBlur,
    type,
    ...other
  } = props;

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (disabled) {
      setHovered(false);
      setPressed(false);
    }
  }, [disabled]);

  const handleMouseEnter = (e) => {
    if (disabled) {
      return false;
    }

    setHovered(true);

    return onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    if (disabled) {
      return false;
    }

    setHovered(false);
    setPressed(false);

    return onMouseLeave(e);
  };

  const handleMouseDown = (e) => {
    if (disabled) {
      return false;
    }

    setPressed(true);

    if (!focused) {
      setTimeout(() => typeof e.focus === 'function' && e.focus(), 0);
    }

    return onMouseDown(e);
  };

  const handleMouseUp = (e) => {
    if (disabled) {
      return false;
    }

    setPressed(false);

    return onMouseUp(e);
  };

  const handleClick = (e) => {
    if (disabled) {
      return false;
    }

    return onClick(e);
  };

  const mergedClassName = cx(
    classNamePrefix,
    {
      [`${classNamePrefix}--${size}`]: size,
      [`${classNamePrefix}--${format}`]: format,
      [`${classNamePrefix}--${kind}`]: kind,
      [`${classNamePrefix}--disabled`]: disabled === true,
      [`${classNamePrefix}--active`]: focused,
      [`${classNamePrefix}--hover`]: hovered && !focused,
      [`${classNamePrefix}--hover-active`]: hovered && focused,
      [`${classNamePrefix}--press`]: pressed,
    },
    className,
  );

  return (
    <Component
      {...{
        ...other,
        disabled,
        className: mergedClassName,
        onClick: handleClick,
        onFocus,
        onBlur,
        type: Component === 'button' ? type : null,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
      }}
    />
  );
};

Button.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  kind: PropTypes.oneOf(['primary', 'secondary', 'outline', 'inside', 'inverse']),
  size: PropTypes.oneOf(['s', 'm', 'l']),
  format: PropTypes.oneOf(['icon', 'file']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  component: 'button',
  kind: 'primary',
  size: 'm',
  format: undefined,
  type: 'button',
  disabled: false,
  classNamePrefix: 'yui-button',
  className: '',
  focused: false,
  onFocus: noop,
  onBlur: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onMouseDown: noop,
  onMouseUp: noop,
  onClick: noop,
};

export default withFocusedState(Button);
