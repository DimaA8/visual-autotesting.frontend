import React from 'react'
import { connect } from 'react-redux'
import TestImage from '@Components/TestImage'
import Button from '@material-ui/core/Button'
import ImageModal from '@Components/ImageModal'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '30px'
  },
  changeRef: {
    flexDirection: 'row-reverse'
  },
  image: {
    maxHeight: '450px',
    overflow: 'hidden'
  },
  col: {
    width: '33%',
    padding: '30px'
  }
}))

function TestInfoCategory({ data, selectReference, isTestMarked }) {
  const [reference, setReference] = React.useState(data.reference)
  const [example, setExample] = React.useState(data.example)
  const [isModalOpened, setIsModalOpened] = React.useState(false)
  const [status, setStatus] = React.useState(null);
  const [time, setTime] = React.useState((new Date()).getTime())
  const classes = useStyles();

  React.useEffect(() => {
    // const ref = reference
    // setReference(example)
    // setExample(ref)
    setExample(example)
    setReference(reference)
  }, [data.toggled])

  React.useEffect(() => {
    if (status === null) {
      setStatus(data.status)
    }
  })

  React.useEffect(() => {
    if (isTestMarked) {
      setTime((new Date()).getTime())
    }
  }, [isTestMarked])

  const closeModal = () => {
    setIsModalOpened(false)
  }

  return (
    <div>
      {isModalOpened && <ImageModal onHide={closeModal} images={[
        data.reference && data.reference,
        data.compare && data.compare,
        data.example && data.example
      ]}/>}
      <div className={classes.row}>
        {data.reference && (
          <div className={classes.col} style={data.toggled ? {
            order: '1'
          } : {}}>
            <div className={classes.image} onClick={() => { setIsModalOpened(true) }}>
              <TestImage src={data.reference + `?${time}`} alt={'reference'} />
            </div>
          </div>
        )}

        {data.compare && (
          <div className={classes.col}>
            <div className={classes.image} onClick={() => { setIsModalOpened(true) }}>
              <TestImage src={data.compare + `?${time}`} alt={'compare'} />
            </div>
          </div>
        )}

        {data.example && (
          <div className={classes.col} style={data.toggled ? {
            order: '-1'
          } : {}}>
            <div className={classes.image} onClick={() => { setIsModalOpened(true) }}>
              <TestImage src={data.example + `?${time}`} alt={'example'} />
            </div>
          </div>
        )}
      </div>
      <div className={clsx(classes.row, {
        [classes.changeRef]: data.toggled
      })}>
        <Button 
          variant="contained" 
          disabled 
          style={{marginTop: '32px'}} 
        >
          Отмечено
        </Button>

        {status === "warning" && (
          <Button 
            variant="contained" 
            color="primary" 
            style={{marginTop: '32px'}} 
            onClick={() => {
              selectReference()
            }}
          >
            Отметить эталон
          </Button>
        )}
      </div>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isTestMarked: state.test.isTestMarked
  }
}

export default connect(mapStateToProps)(React.memo(TestInfoCategory))
