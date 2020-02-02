import React, { useState, useEffect } from 'react';
import { validateAnimation } from '../utils'

// create appropriate animation css properties
export const getAnimation = props => {
  const [ delay_waited, setDelayWaited ]              = useState(false);
  const [ in_time_waited, setInTimeWaited ]           = useState(false);
  const [ between_time_waited, setBetweenTimeWaited ] = useState(false);
  const [ transite_in, setTransiteIn ]                = useState(false);
  const [ transite_out, setTransiteOut ]              = useState(false);
  const [ transite_continuous, setTransiteContinous ] = useState(false);
  const [ delay_out_waited, setDelayOutWaited ]       = useState(false);
  const { animation }                                 = props;

  // runs only on component mount to start timer for delay property in animation css
  useEffect(() => {
    // Validate Animation
    validateAnimation(animation);

    //Set delay_waited regardless of specified or not
    setDelayAsWaited(calculateDelayInTime(animation));

    return () => clearTimeout(setDelayAsWaited);
  }, []);

  // after the delay for the animation in has been waited start animation by updating state in triggerAnimation 
  useEffect( () => {
    if (!delay_waited) return;
    triggerInAnimation();

    // Do we have a continouos animation if so we trigger update 
    // in-time state to trigger next phase of continouse animation
    if (haveAnimationContinuous(animation)) {
      // Wait untill the duration of the IN animation is done
      setInTimeAsWaited(calculateDurationInTime(animation));

      return () => clearTimeout(setInTimeAsWaited);
 
    } else {
      // Do we have an animation out? if so trigger out animation
      if (haveAnimationOut(animation)) {
        // Wait untill the duration between animations is done
        setBetweenTimeAsWaited(calculateDurationDelayBetween(animation));

        return () => clearTimeout(setBetweenTimeAsWaited);
      }
    }
    
  }, [delay_waited]);

  // once in time for continous animation has been waited trigger continous animation 
  useEffect( () => {
    if (!in_time_waited) return;
    // then trigger the CONTINUOUS animation
    triggerContinuousAnimation();
    
    // do we have an animation out?
    if (haveAnimationOut(animation)) {
      // wait untill the duration between animations is done
      if (haveAnimationIn(animation)) {
        setBetweenTimeAsWaited(calculateDurationDelayBetween(animation));

        return () => clearTimeout(setBetweenTimeAsWaited);
      } else {
        setDelayOutAsWaited()
      }
    }
  }, [in_time_waited]);

  // if exiting animation after between animations and delay for exiting animation have been set trigger out animation
  useEffect( () => {
    if (!between_time_waited && !delay_out_waited) return;

    // Then trigger the OUT animation
    triggerOutAnimation();
  }, [between_time_waited, delay_out_waited]);

  const triggerInAnimation = () => {
    return setTransiteIn(true);
  };

  const triggerOutAnimation = () => {
    setTransiteOut(true);
    setTransiteContinous(false);
  };

  const triggerContinuousAnimation = () => {
    return setTransiteContinous(true);
  };

  const setDelayAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setDelayWaited(true);
      return
    }, waitTime)
  };

  //FUNCTION FOR COUNTING IN TIME
  const setInTimeAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setInTimeWaited(true)
    }, waitTime);
  };

  //FUNCTION FOR COUNTING BETWEEN TIME
  const setBetweenTimeAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setBetweenTimeWaited(true);
    }, waitTime);
  };

  //FUNCTION FOR COUNTING DELAY OUT
  const setDelayOutAsWaited = (waitTime = 0) => {
    setTimeout( function() {
      setDelayOutWaited(true);
    }, waitTime)
  }

  const haveAnimationIn = animation => {
    if (!animation) return;
    return 'in' in animation;
  };

  const haveAnimationOut = animation => {
    if (!animation) return;
    return 'out' in animation;
  };

  const haveAnimationContinuous = animation => {
    if (!animation) return;
    return 'continuous' in animation;
  };

  const calculateDelayInTime = animation => {
    if (!animation) return;
    return animation.delay_in * 1000 || 0;
  };

  const calculateDelayOutTime = animation => {
    if (!animation) return;
    return animation.delay_out * 1000 || 0;
  };

  const calculateDurationInTime = animation => {
    if (!animation) return;
    return animation.duration_in * 1000 || 0;
  };

  const calculateDurationDelayBetween = animation => {
    if (!animation) return;
    return animation.delay_between * 1000 || 0;
  };

  // gets appropriate animation keyframes for lifecycle of animation based on various state properties
  const getCurrentAnimation = () => {
    if (!animation) return;
    const animationKeyFrames = transite_in && !transite_continuous && !transite_out
      ? animation.in
      : transite_in && transite_continuous
        ? animation.continuous
        : ((transite_in && !transite_continuous) ||
            (!transite_in && !transite_continuous)) &&
          transite_out
          ? animation.out
          : null;

    return animationKeyFrames;
  };

  // gets appropriate animation duration for lifecycle of animation based on various state properties
  const getCurrentDuration = () => {
    if (!animation) return;
    
    const duration = transite_in && !transite_continuous && !transite_out
      ? animation.duration_in
      : transite_continuous && !transite_out
        ? animation.duration_continuous
        : transite_out
          ? animation.duration_out
          : null;

    return typeof duration === 'number' ? `${duration}s`:duration;
  };

  const getCurrentIteration = () => {

    if (!animation) return;

    return transite_continuous ? 'infinite' : animation.iteration;
  };

  //TODO: add validation check that correct animation-fill-mode is provided
  const getAnimationFillMode = () => {
    if (!animation) return;

    return animation.animation_fill_mode;
  }

  //TODO: add validation check that correct animation-timing-function is provided
  const getAnimationTimingFunction = () => {
    if (!animation) return;

    return animation.animation_timing_function;
  }

  //TODO: add validation check that correct animation-direction is provided
  const getAnimationDirection = () => {
    if (!animation) return;

    return animation.animation_direction;
  }

  // build animation object for styled-component conversion to css
  const getAnimationValues = () => {

    const timedAnimation = {
      animation: getCurrentAnimation(),
      animationFillMode: getAnimationFillMode(),
      animationTimingFunction: getAnimationTimingFunction(),
      animationDirection: getAnimationDirection(),
      duration: getCurrentDuration(),
      iteration: getCurrentIteration(),
    }


    return timedAnimation;
  }

  return delay_waited && transite_in ? getAnimationValues() : '';

}
