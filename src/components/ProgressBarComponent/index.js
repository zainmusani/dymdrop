// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

function ProgressBarComponent(props) {
  const {
    onProgressCompleteAction,
    incomingStyle,
    progressBarDuration,
    onCallBackFunc,
  } = props;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const loaderValue = useRef(new Animated.Value(0));

  useEffect(() => {
    countInterval.current = setInterval(
      () => setCount(old => old + 5),
      progressBarDuration,
    );
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  const load = count => {
    Animated.timing(loaderValue?.current, {
      toValue: count, //final value
      duration: progressBarDuration,
      easing: Easing.ease,

      // useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    load(count);

    if (count >= 85.9 && count <= 91.9) {
      onCallBackFunc();
    }

    if (count >= 99.9) {
      setCount(100);
      clearInterval(countInterval);
    }
  }, [count]);

  const width = loaderValue?.current?.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (width?._parent?._value >= 99.9) {
      onProgressCompleteAction();
    }
  }, [width]);

  return (
    <Animated.View
      style={([StyleSheet.absoluteFill], [{...incomingStyle, width}])}
    />
  );
}

ProgressBarComponent.propTypes = {
  onProgressCompleteAction: PropTypes.func,
  incomingStyle: PropTypes.object,
  progressBarDuration: PropTypes.number,
  onCallBackFunc: PropTypes.func,
};

ProgressBarComponent.defaultProps = {
  onProgressCompleteAction: Function(),
  incomingStyle: {},
  progressBarDuration: 300,
  onCallBackFunc: Function(),
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ProgressBarComponent);
