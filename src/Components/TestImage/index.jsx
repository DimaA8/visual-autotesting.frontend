import React from 'react'
import { connect } from 'react-redux'

import { setImageModal } from '@Redux/actions/imageModal'

function TestImage({ src, setImageModal }) {
  const imageClick = () => {
    setImageModal(src)
  }
  return (
    <div onClick={imageClick}>
      <img src={src} alt="image" style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}/>
    </ div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImageModal: (src) => dispatch(setImageModal(src))
  }
}

export default connect(null, mapDispatchToProps)(TestImage)
