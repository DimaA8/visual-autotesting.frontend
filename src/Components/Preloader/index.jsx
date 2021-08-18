import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import React from 'react'

const useStyles = makeStyles(() => ({
  preloader: {
    position: 'fixed',
    backgroundColor: 'rgba(#fafafa, 0.8)',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zZndex: '1000'
  }
}))

function Preloader() {
  const styles = useStyles();
  return (
    <div className={styles.preloader}>
      <CircularProgress />
    </div>
  )
}

export default Preloader
