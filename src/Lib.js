import React, { Component, PropTypes } from 'react';
import { makeCancelable } from './utils';

export default class SlidePreview extends Component {

  static viewport = [
    PropTypes.string,
    PropTypes.number
    ];

  static propTypes = {
    src: PropTypes.string,
    headers: PropTypes.object,
    width: PropTypes.oneOfType(SlidePreview.viewport),
    height: PropTypes.oneOfType(SlidePreview.viewport),
    rotate: PropTypes.oneOf([0, 90, 180, 270]),
    className: PropTypes.string,
    transform: PropTypes.bool,
    onLoading: PropTypes.func,
    onLoad: PropTypes.func,
    onFail: PropTypes.func
  };

  static defaultProps = {
    className: '',
    transform: true,
    onLoading: () => {},
    onLoad: () => {},
    onFail: () => {},
  };

  state = {
    src: '',
  };

  componentDidMount() {
    if (this.props.src) {
      this.promise = this.fetchBlob(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { src, headers } = this.props;
    if (src !== nextProps.src) {
      if (this.promise) {
        this.promise.cancel();
      }
      if (this.props.src) {
        this.promise = this.fetchBlob(nextProps);
      }
    }
  }

  componentWillUnmount() {
    if (this.promise) {
      this.promise.cancel();
    }
  }

  fetchBlob(props) {
    const { onLoading, onFail } = this.props;
    this.promise = fetch(props.src, {
      headers: props.headers
    });

    const cancelablePromise = makeCancelable(this.promise);
    onLoading();

    cancelablePromise
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(src => this.setState({ src }))
      .catch(onFail);

    return cancelablePromise;
  }

  render() {
    const { width, height, transform, className, rotate, ...rest } = this.props;

    const [ _width, _height ] = transform && [90, 270].includes(rotate) ? [height, width] : [width , height];

    const { src } = this.state;

    return (
      <img
        role="img"
        {...rest}
        src={src}
        width={_width}
        height={_height}
        className={`blob-image rotate${rotate} ${className}`}
      />
    );
  }
}

