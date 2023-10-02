import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Colors} from '../../theme';
import Spinner from 'react-native-loading-spinner-overlay';

function SpinnerComponent(props) {
  const {isLoading, loaderColor} = props;

  return (
    <Spinner
      visible={isLoading}
      color={Colors.white}
      size="large"
      overlayColor="rgba(0,0,0,0.7)"
    />
  );
}

SpinnerComponent.propTypes = {
  isLoading: PropTypes.bool,
  loaderColor: PropTypes.string,
};

SpinnerComponent.defaultProps = {
  isLoading: false,
  loaderColor: Colors.black,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SpinnerComponent);
