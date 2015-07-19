import React  from 'react';


export default class Loader extends React.Component {


  constructor(props) {
    super(props);
  }


  render() {

    const size  = this.props.size  || 30;
    const width = this.props.width || 2;
    const color = this.props.color || '#29d';

    const sizePx  = `${size}px`;
    const widthPx = `${width}px`;

    const sizeStyle = {
      width : sizePx,
      height: sizePx
    };

    const cutStyle = {
      width : `${size / 2}px`,
      height: sizePx
    };

    const donutStyle = {
      width            : sizePx,
      height           : sizePx,
      border           : `${widthPx} solid ${color}`,
      borderRadius     : '50%',
      borderLeftColor  : 'transparent',
      borderBottomColor: 'transparent'
    };

    return (
        <div className="loader-wrapper">
          <div className="loader-spinner-wrapper" style={sizeStyle}>
            <div className="loader-spinner-icon" style={sizeStyle}>
              <div className="loader-spinner-cut" style={cutStyle}>
                <div className="loader-spinner-donut" style={donutStyle} />
              </div>
            </div>
          </div>
        </div>
    );

  }


}
