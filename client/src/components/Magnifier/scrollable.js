import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import videoPlayIcon from './video-play-icon.png'

class Scrollable extends Component {
  constructor() {
    super()
    this.state = {
      thumbContainerStyle: {
        left: '0',
      },
    }

    this.config = {
      moveLength: 0,
      viewNumber: 5,
      stepNumber: 1,
      step: 46,
    }

    this.onPrev = this.onPrev.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  onPrev() {
    const currentLeft = this.state.thumbContainerStyle.left.split('px')[0]
    const stride = this.config.step * this.config.stepNumber
    const isMovable = this.config.moveLength > stride
    const currentMoveLength = isMovable ? stride : this.config.moveLength
    const thumbContainerLeft = parseInt(currentLeft, 10) + currentMoveLength

    if (this.config.moveLength > 0) {
      this.setStyle('thumbContainerStyle', { left: `${thumbContainerLeft}px` })
      this.config.moveLength = isMovable ? this.config.moveLength - stride : 0
    }
  }

  onNext() {
    const currentLeft = this.state.thumbContainerStyle.left.split('px')[0]
    const stride = this.config.step * this.config.stepNumber
    const countLength = (this.props.photos.length - this.config.viewNumber) * stride
    const thumbContainerLeft = parseInt(currentLeft, 10) - stride
    if (this.config.moveLength < countLength) {
      this.setStyle('thumbContainerStyle', { left: `${thumbContainerLeft}px` })
      this.config.moveLength += stride
    }
  }

  setStyle(stateName, obj) {
    const stateValue = this.state[stateName]
    Object.keys(obj).forEach((key) => {
      stateValue[key] = obj[key]
    })
    this.setState({ stateName: stateValue })
  }

  render() {
    const { photos, onPreview } = this.props
    if (this.props.displaySingle) {
      return ''
    }

    return (
      <div className="scroll">
        <a className="prev" onClick={this.onPrev} role="button" tabIndex="-1">&lt;</a>
        <a className="next" onClick={this.onNext} role="button" tabIndex="-1">&gt;</a>
        <div className="items">
          <ul id="imgContainer" style={{ ...this.state.thumbContainerStyle }}>
            {
              photos.map((photo, idx) => {
                const imgProps = photo.video ?
                  { className: 'video-play-icon', src: videoPlayIcon } :
                  { src: photo.thumb }

                const mouseMoveHandler = () => {
                  onPreview(photo)
                }

                return (
                  <li key={idx}>
                    <img
                      alt=""
                      {...imgProps}
                      onMouseMove={mouseMoveHandler}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

Scrollable.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    thumb: PropTypes.string,
    full: PropTypes.string,
    video: PropTypes.bool,
  })).isRequired,
  onPreview: PropTypes.func,
  displaySingle: PropTypes.bool,
}

export default Scrollable
