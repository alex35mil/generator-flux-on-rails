import React, { PropTypes } from 'react';

import Spinner from '../Spinner/Spinner';

import styles from './Button.scss';


export default class Button extends React.Component {

  static propTypes = {
    wrapperClassName: PropTypes.string,
    wrapperStyle    : PropTypes.object,

    className       : PropTypes.string,
    style           : PropTypes.object,
    children        : PropTypes.string.isRequired,
    onClick         : PropTypes.func,
    isProcessing    : PropTypes.bool,
    useSpan         : PropTypes.bool,

    spinnerColor    : PropTypes.string,
    spinnerSize     : PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    spinnerWidth    : PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }


  render() {
    const {
      wrapperClassName,
      wrapperStyle,

      className,
      style,
      children,
      onClick,
      isProcessing,
      useSpan,

      spinnerSize,
      spinnerWidth,
      spinnerColor,

      ...rest,
    } = this.props;

    const wrapperProps = {
      className: wrapperClassName || styles.wrapper,
      style    : wrapperStyle     || null,
    };

    const buttonProps = {
      className: className    || styles.button,
      style    : style        || null,
      disabled : isProcessing || false,
      onClick  : onClick      || null,
    };

    const spinnerProps = {
      size : spinnerSize  || null,
      width: spinnerWidth || null,
      color: spinnerColor || null,
    };

    return (
      <div {...wrapperProps}>
      {
        useSpan ?
        <span   {...buttonProps} {...rest}>{children}</span> :
        <button {...buttonProps} {...rest}>{children}</button>
      }
      {isProcessing && <Spinner {...spinnerProps} />}
      </div>
    );
  }

}
