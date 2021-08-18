import React from 'react'
import { connect } from 'react-redux'
import Preloader from '@Components/Preloader'
import TestInfoView from './Components/TestInfoView'

function TestInfo({ test }) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  React.useEffect(() => {
    setIsLoaded(false)
  }, [test.desktop.example, test.desktop.reference, test.desktop.compare,
    test.tablet.example, test.tablet.reference, test.tablet.compare, 
    test.mobile.example, test.mobile.reference, test.mobile.compare])

  if (test) {   
    return (
      <>
        <>
          {!isLoaded && (<Preloader />)}
        </>
        <TestInfoView test={test} setIsLoaded={setIsLoaded}/>
      </>
    )
  } else {
    return (
      <div className="TestInfo">
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    test: state.test.activeTest
  }
}

export default connect(mapStateToProps)(TestInfo)
