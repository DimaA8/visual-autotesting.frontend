import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '5000',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  rootClose: {
    display: 'none'
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '16px 16px',
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: '5002'
  },
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '5001',
    overflow: 'scroll'
  },
  images: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0px)',
    maxWidth: '98%',
    maxHeight: '98%',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'zoom-out'
  },
  imagesZoom: {
    transform: 'translate3d(-50%, -50%, 0px) translate3d(0, 0, 0)',
    maxWidth: 'unset',
    maxHeight: 'unset',
    cursor: 'move',
    height: 'auto',
    cursor: 'zoom-in'
  },
  image: {
    margin: '0 16px',
    display: 'inline-block',
    maxWidth: '30%',
    maxHeight: '98%'
  },
  imageZoom: {
    maxWidth: '30%',
    maxHeight: 'none',
    pointerEvents: 'auto'
  },
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 4000,
    top: '0',
    left: '0',
    display: 'none',
  },
  canvasZoom: {
    display: 'block',
  }
}))

function ImageModal({ images, onHide }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)
  const [zoom, setZoom] = React.useState(false)
  const canvasStyle = { top: 0, transform: `translate3d(-50%, 100px, 0px) translate3d(0px, 0px, 0)` }
  React.useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  })

  const closeModal = () => {
    setOpen(false)
    onHide()
  }

  return (
    <div className={clsx(classes.root, {
      [classes.rootClose]: !open
    })}>
      <div className={classes.header}>
        <CloseIcon style={{ color: '#ffffff', cursor: 'pointer' }} onClick={() => closeModal()}/>
      </div>
      <div className={classes.content}>
        <div>
          <div 
            className={
              clsx(
                classes.images, 
                {
                  [classes.imagesZoom]: !zoom
                }
              )
            } 
            style={zoom ? canvasStyle : null}
            onClick={() => {setZoom(!zoom)}}
          >
            <div className={clsx(classes.canvas, {
              [classes.canvasZoom]: zoom
            })}
            ></div>
            {images && images.map((image, key) => {
              if (image) {
                return <img src={image + `?${(new Date()).getTime()}`} key={key} className={clsx(classes.image, {
                  [classes.imageZoom]: zoom
                })} />
              }
              return null;
            })}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default React.memo(ImageModal)
