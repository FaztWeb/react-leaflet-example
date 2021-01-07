import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems : 'center',
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'column',
    left: '25%',
    height : '100%',
    width : '50%',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '30%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    flexWrap:"wrap",
    width: '100%',
  },
}));

const Home = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h2>Longitude = {state.longitude}</h2>
        <h2>Latitude = {state.latitude}</h2>
      </Paper>
      <Link
        to={{
          pathname: "/map",
          state,
        }}
      >
        See marker
      </Link>
    </div>
  );
};

export default Home;
