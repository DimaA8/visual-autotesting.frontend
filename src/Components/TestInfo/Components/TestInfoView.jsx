import React from 'react'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TestInfoCategory from "@Components/TestInfoCategory"
import { Typography } from '@material-ui/core';
import { selectReference, setIsTestMarked } from '@Redux/actions/test'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  category: {
    paddingTop: '24px',
    paddingBottom: '24px'
  },
  top: {
    display: 'flex',
    alignItems: 'center'
  },
  date: { 
    backgroundColor: 'rgba(0,0,0,0.3)',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: '16px',
    borderRadius: '20px',
    padding: '6px 10px'
  }
}))

let timer = null;
const rusMonth = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]
const createDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return ('00' + date.getDate()).slice(-2) + ' ' + 
    rusMonth[date.getMonth()] + ' ' + 
    date.getFullYear() + ', ' + 
    date.toLocaleTimeString().slice(0, date.toLocaleTimeString().length - 3)
}

function TestInfoView({ 
  test, 
  setIsLoaded, 
  isTestMarked,
  setIsTestMarked,
  dispatchSelectReference 
}) {
  const classes = useStyles();
  const [timerEmptyPage, setTimerEmptyPage] = React.useState(null);
  const onLoad = () => {
    if (isTestMarked) {
      setIsLoaded(true)
      setIsTestMarked(false)
      return
    }
    if (timerEmptyPage) {
      clearTimeout(timerEmptyPage);
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)
  }

  React.useEffect(() => {
    setTimerEmptyPage(setTimeout(() => {
      setIsLoaded(true)
    }, 5000))
  }, [test])
  const selectReference = (category) => {
    dispatchSelectReference({
      id: test.id,
      category: category,
      requestData: {
        env: category,
        page: test.name
      }
    })
  }

  const selectRefTablet = () => {
    selectReference('tablet')
  }
  const selectRefDesktop = () => {
    selectReference('desktop')
  }
  const selectRefMobile = () => {
    selectReference('mobile')
  }
  return (
    <div onLoad={onLoad} >
      <div className={classes.category}>
        <div className={classes.top}>
          <Typography variant="h5" component="h5">Desktop</Typography>
          
            <div className={classes.date}>
              <Typography variant="body1" component="p">
                {createDate(test.desktop.date)}
              </Typography>
            </div>
          
        </div>
        
        <Typography variant="body1" component="p">{test.desktop.message}</Typography>
        <TestInfoCategory data={test.desktop} selectReference={selectRefDesktop}/>
        <Divider />
      </div>
      <div className={classes.category}>
        <div className={classes.top}>
          <Typography variant="h5" component="h5">Tablet</Typography>
          <div className={classes.date}>
            <Typography variant="body1" component="p">
              {createDate(test.tablet.date)}
            </Typography>
          </div>
        </div>
        
        <Typography variant="body1" component="p">{test.tablet.message}</Typography>
        <TestInfoCategory data={test.tablet} selectReference={selectRefTablet}/>
        <Divider />
      </div>
      <div className={classes.category}>
        <div className={classes.top}>
          <Typography variant="h5" component="h5">Mobile</Typography>
          <div className={classes.date}>
            <Typography variant="body1" component="p">
              {createDate(test.mobile.date)}
            </Typography>
          </div>
         
        </div>
        
        <Typography variant="body1" component="p">{test.mobile.message}</Typography>
        <TestInfoCategory data={test.mobile} selectReference={selectRefMobile}/>
        <Divider />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isTestMarked: state.test.isTestMarked
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSelectReference: (data) => dispatch(selectReference(data)),
    setIsTestMarked: (value) => dispatch(setIsTestMarked(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TestInfoView))
