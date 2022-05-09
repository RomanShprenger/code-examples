import * as React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { compose } from 'recompose';
import cx from 'classnames';
import { resolveStyles } from 'utils';
import { withReduxFormProps, withFocusedState, withEmptyState, withCounter } from 'hocs';
import MaskedInput from 'react-text-mask';

const stylePath = resolveStyles('TextField/styles');
import(`../${stylePath}`).then();

const TextField = (props) => {
  const {
    component: Component,
    type,
    disabled,
    invalid,
    focused,
    empty,
    readOnly,
    mask,
    kind,
    label,
    helper,
    counter,
    counterText,
    classNamePrefix,
    className,
    labelClassName,
    helperClassName,
    elementId,
    elementRef,
    elementClassName,
    elementBefore,
    elementAfter,
    marginTop,
    ...otherProps
  } = props;

  const mergedClassName = cx(
    classNamePrefix,
    {
      [`${classNamePrefix}--${kind}`]: kind,
      [`${classNamePrefix}--empty`]: empty,
      [`${classNamePrefix}--active`]: !readOnly && focused,
      [`${classNamePrefix}--readonly`]: readOnly,
      [`${classNamePrefix}--error`]: invalid,
      [`${classNamePrefix}--disabled`]: disabled,
    },
    className,
  );

  const mergedElementClassName = cx(elementClassName, `${classNamePrefix}__element`);
  const mergedElementBeforeClassName = cx(`${classNamePrefix}__before`);
  const mergedElementAfterClassName = cx(`${classNamePrefix}__after`);

  const mergedLabelClassName = cx(labelClassName, `${classNamePrefix}__label`);
  const mergedHelperClassName = cx(helperClassName, `${classNamePrefix}__helper`,
    { [`${classNamePrefix}__helper--counter`]: counter });

  const elementProps = { ...otherProps, readOnly, disabled };

  return (
    <div className={mergedClassName}>
      {elementBefore && (
      <div className={mergedElementBeforeClassName}>{elementBefore}</div>
      )}
      {elementAfter && (
      <div className={mergedElementAfterClassName}>{elementAfter}</div>
      )}
      {mask ? (
        <MaskedInput
          {...elementProps}
          mask={mask}
          type={type}
          id={elementId}
          ref={elementRef}
          className={mergedElementClassName}
          style={{ marginTop }}
        />
      ) : (
        <Component
          {...elementProps}
          type={type}
          id={elementId}
          ref={elementRef}
          className={mergedElementClassName}
          style={{ marginTop }}
        />
      )}
      {label && (<span className={mergedLabelClassName}>{label}</span>)}
      <span className={mergedHelperClassName}>{helper || counterText}</span>
    </div>
  );
};

TextField.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  kind: PropTypes.oneOf(['grey', 'white']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  focused: PropTypes.bool,
  empty: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  mask: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf((propValue, key) => {
      const isString = typeof propValue[key] === 'string';
      const isRegEx = propValue[key] instanceof RegExp;

      if (!(isString || isRegEx)) {
        return new Error('Invalid prop');
      }
      return true;
    }),
  ]),
  label: PropTypes.node,
  helper: PropTypes.node,
  counter: PropTypes.bool,
  counterText: PropTypes.node,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  helperClassName: PropTypes.string,
  elementId: PropTypes.string,
  elementRef: PropTypes.func,
  elementClassName: PropTypes.string,
  elementBefore: PropTypes.node,
  elementAfter: PropTypes.node,
  marginTop: PropTypes.string,
};

TextField.defaultProps = {
  component: 'input',
  kind: 'grey',
  type: 'text',
  disabled: false,
  invalid: false,
  focused: false,
  empty: true,
  readOnly: false,
  placeholder: undefined,
  mask: null,
  label: '',
  helper: '',
  counter: false,
  counterText: '',
  classNamePrefix: 'yui-input',
  className: '',
  labelClassName: '',
  helperClassName: '',
  elementId: undefined,
  elementRef: noop,
  elementClassName: '',
  elementBefore: undefined,
  elementAfter: undefined,
  marginTop: '24px',
};

export default compose(withReduxFormProps, withFocusedState, withEmptyState, withCounter)(TextField);
