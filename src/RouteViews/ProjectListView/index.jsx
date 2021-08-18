import React from 'react'
import { connect } from 'react-redux'
import { fetchProjectList } from '@Redux/actions/projects'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from '@Components/ProjectCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  projectList: {
    marginTop: '64px',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-16px',
    marginRight: '-16px'
  },
  projectCard: {
    paddingTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px'
  }
}));

function ProjectListView({ 
  projectList, 
  fetchProjectList, 
  isProjectListFetched 
}) {

  const classes = useStyles();

  React.useEffect(() => {
    fetchProjectList()
  }, [isProjectListFetched])

  const projectListView = projectList && projectList.map((project, index) => {
    return (
      <div className={classes.projectCard} key={index}>
        <ProjectCard project={project} />
      </div>
    )
  })

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>Проекты</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.projectList}>
        {projectListView}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    projectList: state.projects.projectList,
    isProjectListFetched: state.projects.isProjectListFetched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectList: () => dispatch(fetchProjectList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListView)
