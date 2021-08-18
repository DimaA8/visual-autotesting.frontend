import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Cancel from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CancelIcon from '@material-ui/icons/Cancel';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import List from '@material-ui/core/List';
import { yellow, green, orange } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { setActiveTest } from '@Redux/actions/test'

const statusIcons = {
  success: <CheckCircleIcon style={{ color: green[400] }} />,
  warning: <ErrorIcon style={{ color: yellow[400] }} />,
  error: <CancelIcon style={{ color: orange[400] }} />,
  critical: <OfflineBoltIcon color="secondary"/>,
}

function TestNavList({ testList, setActiveTest, activeTestId, projectName }) {
  const testClick = (testIndex) => {
    setActiveTest(testIndex)
  }
  return (
    <>
      <List>
        {testList && testList.map((test, index) => (
          <Link 
            to={`/${projectName}/${test.name}`} 
            key={index} 
            style={{
              color: 'rgba(0, 0, 0, 0.87)',
              textDecoration: 'none',

            }}
          >
            <ListItem 
              button 
              onClick={() => testClick(test.id) } 
              style={{ 
                backgroundColor: test.id === activeTestId ? '#CCCCCC' : 'transparent',
                userSelect: 'auto'
              }}
            > 

                <ListItemIcon>{statusIcons[test.status]}</ListItemIcon>
                <ListItemText primary={test.name} secondary={test.url}/>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    testList: state.test.filteredTests,
    activeTestId: state.test.activeTest.id,
    projectName: state.test.projectName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTest: (testIndex) => dispatch(setActiveTest(testIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestNavList)
