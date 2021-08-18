import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PageNav from '@Components/PageNav'
import { connect } from 'react-redux'
import { fetchTests } from '@Redux/actions/test'
import TestInfo from '@Components/TestInfo'
import { useParams } from 'react-router-dom'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  preloader: {
    zIndex: 1000,
    position: 'fixed',
    top: '50%',
    left: '50%'
  },
  section: {
    position: 'relative'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function PageView({ 
  fetchTests, 
  pageLoaded, 
  projectName
}) {
  const classes = useStyles();
  const { project, page } = useParams();

  React.useEffect(() => {
    if (projectName !== project) {
      fetchTests(project, page)
    }
  })

  return (
    <div className={classes.root}>
      {pageLoaded ? 
        <>
          <PageNav />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.section}>
              <TestInfo />
            </div>
          </main>
        </> : (
          <CircularProgress className={classes.preloader}/>
        )
      }
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pageLoaded: state.page.pageLoaded,
    projectName: state.test.projectName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (projectName, testName) => dispatch(fetchTests(projectName, testName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageView)
