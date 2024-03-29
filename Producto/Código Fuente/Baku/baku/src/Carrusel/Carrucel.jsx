import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import imgCarrusel1 from '../Imagenes/CarruselBaku1.png'
import imgCarrusel2 from '../Imagenes/CarruselBaku2.png'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const useStyles = makeStyles((theme) => ({
  carousel: {
    [theme.breakpoints.up('md')]: {
      height: '15rem',
      maxWidth: '80rem',
  },[theme.breakpoints.only('md')]: {
    height: '10rem',
    maxWidth: '60rem',
  },[theme.breakpoints.only('sm')]: {
      display: 'none' ,
  },[theme.breakpoints.only('xs')]: {
    height: '5.2rem',
      display: 'none' ,
  }
  },
}));

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:imgCarrusel1,
  },
  {
    label: 'Bird',
    imgPath:imgCarrusel2,
  }
];

function SwipeableTextMobileStepper({valor}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const [alto, setAlto] = React.useState('15rem');
  const [ancho, setAncho] = React.useState('80rem');
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const classes = useStyles();
  return (
    <Box sx={{ maxWidth: ancho, flexGrow: 1 }}>
        
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                className={classes.carousel}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
      sx={{background: '#99cfbf',position: 'relative'}}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;