import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import Scrollable from './scrollable'

class Gallery extends Component {
  static getOffset(domNode) {
    let node = domNode
    let leftOffset = node.offsetLeft
    let topOffset = node.offsetTop
    while (node.offsetParent != null) {
      node = node.offsetParent
      leftOffset += node.offsetLeft
      topOffset += node.offsetTop
    }
    return { left: leftOffset, top: topOffset }
  }

  static getCommonSize() {
    const commonSize = {}
    const zoomSrc = document.getElementById('zoomSrc')
    if (zoomSrc) {
      const mask = zoomSrc.getElementsByTagName('div')[0]
      const lens = mask.getElementsByTagName('span')[0]
      commonSize.mask = Gallery.getOffset(mask)
      commonSize.mask.width = mask.offsetWidth
      commonSize.mask.height = mask.offsetHeight
      commonSize.lens = { width: lens.offsetWidth, height: lens.offsetHeight }
    }
    const zoomArea = document.getElementById('zoomArea')
    if (zoomArea) {
      const zoomImg = zoomArea.getElementsByTagName('img')[0]
      commonSize.zoomArea = { width: zoomArea.offsetWidth, height: zoomArea.offsetHeight }
      commonSize.zoomImg = { width: zoomImg.offsetWidth, height: zoomImg.offsetHeight }
    }
    return commonSize
  }

  constructor() {
    super()

    this.previewWidth = 250
    this.previewHeight = 250
    this.state = {
      photos: [],
      selectedPhoto: {},
      lensStyle: {
        display: 'none',
        left: '0',
        top: '0',
        width: '0',
        height: '0',
      },
      zoomAreaStyle: {
        display: 'none',
      },
      zoomImgStyle: {
        left: '0',
        top: '0',
      },
    }

    this.onLoadMediaHandler = this.onLoadMediaHandler.bind(this)
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this)
    this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this)
    this.onMouseOutHandler = this.onMouseOutHandler.bind(this)
    this.onPreview = this.onPreview.bind(this)
  }

  componentWillMount() {
    const { photos } = this.props
    this.setState({ photos }, () => {
      if (photos.length > 0) {
        this.setState({ selectedPhoto: photos[0] })
      }
      this.preload()
    })
  }

  onPreview(photo) {
    this.setState({ selectedPhoto: photo })
  }

  onMouseOverHandler() {
    this.setStyle('lensStyle', { display: 'block' })
    this.setStyle('zoomAreaStyle', { display: 'block' })
  }

  onMouseOutHandler() {
    this.setStyle('lensStyle', { display: 'none' })
    this.setStyle('zoomAreaStyle', { display: 'none' })
  }

  onMouseMoveHandler(event) {
    const commonSize = Gallery.getCommonSize()
    const innerArea = {
      width: commonSize.mask.width - commonSize.lens.width,
      height: commonSize.mask.height - commonSize.lens.height,
    }
    let x = event.clientX - commonSize.mask.left - (commonSize.lens.width / 2)
    let y = event.clientY - commonSize.mask.top - (commonSize.lens.height / 2)
    if (x < 0) {
      x = 0
    } else if (x > innerArea.width) {
      x = innerArea.width
    }
    if (y < 0) {
      y = 0
    } else if (y > innerArea.height) {
      y = innerArea.height
    }

    this.setStyle('lensStyle', { left: `${x}px`, top: `${y}px` })

    const zoomPosition = {
      left: -(x / innerArea.width) * (commonSize.zoomImg.width - commonSize.zoomArea.width),
      top: -(y / innerArea.height) * (commonSize.zoomImg.height - commonSize.zoomArea.height),
    }
    this.setStyle('zoomImgStyle', {
      left: innerArea.width === 0 ? 0 : `${zoomPosition.left}px`,
      top: innerArea.height === 0 ? 0 : `${zoomPosition.top}px`,
    })
  }

  onLoadMediaHandler(event) {
    const target = event.target
    const naturalWidth = target.naturalWidth ? target.naturalWidth : target.videoWidth
    const naturalHeight = target.naturalHeight ? target.naturalHeight : target.videoHeight
    const ratio = naturalWidth / naturalHeight

    if (ratio > 1) {
      const previewWidth = this.previewWidth
      const previewHeight = parseInt(this.previewWidth / ratio, 10)
      const width = previewWidth > naturalWidth ? naturalWidth : previewWidth
      const height = previewHeight > naturalHeight ? naturalHeight : previewHeight
      const size = {
        width: `${width}px`,
        height: `${height}px`,
        top: (this.previewWidth * (1 - (1 / ratio))) / 2,
        position: 'absolute',
      }
      const len = (this.previewWidth * this.previewWidth) / naturalWidth
      this.setState({ selectedPhotoStyle: size, zoomMaskStyle: size })
      this.setStyle('lensStyle', {
        width: `${len > width ? width : len}px`,
        height: `${len > height ? height : len}px`,
      })
    } else {
      const previewHeight = this.previewHeight
      const previewWidth = parseInt(this.previewHeight * ratio, 10)
      const width = previewWidth > naturalWidth ? naturalWidth : previewWidth
      const height = previewHeight > naturalHeight ? naturalHeight : previewHeight
      const size = {
        width: `${width}px`,
        height: `${height}px`,
        left: (this.previewHeight * (1 - ratio)) / 2,
        position: 'absolute',
      }
      const len = (this.previewHeight * this.previewHeight) / naturalHeight
      this.setState({ selectedPhotoStyle: size, zoomMaskStyle: size })
      this.setStyle('lensStyle', {
        width: `${len > width ? width : len}px`,
        height: `${len > height ? height : len}px`,
      })
    }
  }

  setStyle(stateName, obj) {
    const stateValue = this.state[stateName]
    Object.keys(obj).forEach((key) => {
      stateValue[key] = obj[key]
    })
    this.setState({ stateName: stateValue })
  }

  preload() {
    const images = []
    this.state.photos.forEach((photo, idx) => {
      images[idx] = new Image()
      images[idx].src = photo.full
    })
  }

  render() {
    if (this.state.photos.length > 0) {
      return (
        <div className="gallery">
          {this.state.selectedPhoto.video ?
            (
              <div className="preview">
                <video
                  style={this.state.selectedPhotoStyle}
                  src={this.state.selectedPhoto.full}
                  controls="true"
                  onLoadedData={this.onLoadMediaHandler}
                >
                  <track
                    kind="captions"
                  />
                </video>
              </div>
            )
            :
            (
              <div className="preview">
                <div id="zoomSrc">
                  <img
                    style={{ ...this.state.selectedPhotoStyle }}
                    src={this.state.selectedPhoto.full}
                    alt={this.state.selectedPhoto.full}
                    onLoad={this.onLoadMediaHandler}
                  />
                  <div
                    className="zoomMask"
                    style={this.state.zoomMaskStyle}
                    onMouseOver={this.onMouseOverHandler}
                    onMouseMove={this.onMouseMoveHandler}
                    onMouseOut={this.onMouseOutHandler}
                  >
                    <span className="zoomLens" style={{ ...this.state.lensStyle }} />
                  </div>
                </div>
                <div id="zoomArea" style={{ ...this.state.zoomAreaStyle }}>
                  <img
                    src={this.state.selectedPhoto.full}
                    alt={this.state.selectedPhoto.full}
                    style={{ ...this.state.zoomImgStyle }}
                  />
                </div>
              </div>
            )}
          <Scrollable
            photos={this.state.photos}
            displaySingle={this.props.displaySingle}
            onPreview={this.onPreview}
          />
        </div>
      )
    }

    return (
      <div className="gallery-empty">
        No Photo
      </div>
    )
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    thumb: PropTypes.string,
    full: PropTypes.string,
    video: PropTypes.bool,
  })).isRequired,
  displaySingle: PropTypes.bool,
}

export default Gallery
