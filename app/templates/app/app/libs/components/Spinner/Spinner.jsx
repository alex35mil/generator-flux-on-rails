import React, { PropTypes } from 'react';

import styles from './Spinner.scss';


export default class Spinner extends React.Component {

  static propTypes = {
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    color  : PropTypes.string,
    bgColor: PropTypes.string,
  }


  render() {
    const color   = this.props.color || '#29d';
    const size    = this.props.size  || 30;
    const width   = this.props.width || 2;
    const bgColor = this.props.bgColor;

    const sizePx  = `${size}px`;
    const widthPx = `${width}px`;

    const wrapperStyle = bgColor ? { backgroundColor: bgColor } : null;

    const sizeStyle = {
      width : sizePx,
      height: sizePx,
    };

    const cutStyle = {
      width : `${size / 2}px`,
      height: sizePx,
    };

    const donutStyle = {
      width            : sizePx,
      height           : sizePx,
      border           : `${widthPx} solid ${color}`,
      borderRadius     : '50%',
      borderLeftColor  : 'transparent',
      borderBottomColor: 'transparent',
    };

    return (
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.hoopWrapper} style={sizeStyle}>
          <div className={styles.hoopIcon} style={sizeStyle}>
            <div className={styles.hoopCut} style={cutStyle}>
              <div className={styles.hoopDonut} style={donutStyle} />
            </div>
          </div>
        </div>
      </div>
    );
  }


}
