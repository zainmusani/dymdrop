// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Text} from '..';
import Spinner from 'react-native-spinkit';
import {Colors} from '../../theme';

function SpinkitComponent(props) {
  const {isVisible, spinnerColor, hasOverlay, loaderSize} = props;
  return (
    <>
      <View
        style={[
          styles.container,
          hasOverlay && {backgroundColor: 'rgba(0,0,0,.6)'},
        ]}>
        <Spinner
          style={[{alignSelf: 'center'}]}
          isVisible={isVisible}
          size={loaderSize}
          type={'FadingCircleAlt'}
          color={spinnerColor}
        />
      </View>
      {hasOverlay && <StatusBar backgroundColor={'rgba(0,0,0,.6)'} />}
    </>
  );
}

SpinkitComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  spinnerColor: PropTypes.string,
  hasOverlay: PropTypes.bool,
  loaderSize: PropTypes.number,
};

SpinkitComponent.defaultProps = {
  spinnerColor: Colors.white,
  hasOverlay: true,
  loaderSize: 30,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SpinkitComponent);
