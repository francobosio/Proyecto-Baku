import react from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { ButtonBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#99cfbf",
  },
  content: {
    'background': '#99cfbf',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
  },
}));

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const classes = useStyles();

  return (
    isAuthenticated && (
      <div className={classes.root}>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <img alt="complex" src="/static/images/grid/complex.jpg" />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Standard license
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Full resolution 1920x1080 • JPEG
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: 1030114
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  $19.00
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Container size="100%" className={classes.content}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <img src={user.picture} alt={user.name}></img>
            </Grid>
            <Grid item xs={12}>
              <h2>{user.name}</h2>
            </Grid>
            <Grid item xs={12}>
              <p>{user.email}</p>
            </Grid>
            <Grid item xs={12}>
              <pre>{JSON.stringify(user)}</pre>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  );
}

export default Profile;
