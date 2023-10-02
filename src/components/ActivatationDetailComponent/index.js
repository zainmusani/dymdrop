// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

function ActivatationDetailComponent(props) {
  const {
    isModalVisible,
    setModalVisibility,
    modalView,
    incomingStyle,
    ...rest
  } = props;

  return (
    <Modal
      style={incomingStyle}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setModalVisibility(false);
      }}
      onBackButtonPress={() => {
        setModalVisibility(false);
      }}
      backdropOpacity={0.5}
      {...rest}>
      {modalView()}
    </Modal>
  );
}

ActivatationDetailComponent.propTypes = {
  isModalVisible: PropTypes.bool,
  setModalVisibility: PropTypes.func,

  modalView: PropTypes.func,
  incomingStyle: PropTypes.object,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
};

ActivatationDetailComponent.defaultProps = {
  isModalVisible: false,
  setModalVisibility: Function(),

  modalView: Function(),
  incomingStyle: {zIndex: 1},

  animationIn: 'zoomInUp',
  animationOut: 'zoomOut',
  animationInTiming: 2,
  animationOutTiming: 150,
};

const mapStateToProps = ({}) => ({});

const actions = {};
export default connect(mapStateToProps, actions)(ActivatationDetailComponent);
