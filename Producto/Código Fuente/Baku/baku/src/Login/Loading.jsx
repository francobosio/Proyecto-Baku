import React from 'react';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      'background': 'linear-gradient(180deg, #076F55 0%, #C2F1E9 100%);',
      'height': '100vh',
    },

    circulo:{
        'color': '#076F55'
    }
  }));

export const Loading = () => {
    const classes = useStyles();
    return (<div>
                <Container justifyContent="center" maxWidth="xl" className={classes.root}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                        >

                        <Grid item xs={3}>
                            <CircularProgress className={classes.circulo} size="10rem"/>
                        </Grid>   

                    </Grid> 
                </Container>
            </div>)
}