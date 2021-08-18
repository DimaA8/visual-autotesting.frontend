import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '345px',
  },
  link: {
    textDecoration: 'none'
  },
  image: {
    height: '145px',
    width: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    margin: '0 auto'
  },
  title: {
    color: grey[800]
  }
}))

function ProjectCard({ project }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link to={project.link} className={classes.link}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.image}
            src={project.logo ? project.logo : ''}  
            title="project"
          />
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h5" 
              component="h2" 
              className={classes.title}
            >
              {project.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default ProjectCard
