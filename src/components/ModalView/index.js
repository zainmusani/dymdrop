// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import util from '../../util';

function ModalView(props) {
  const {
    mainText,
    subMainText,

    isCloseAlertMsg,
    toggleModal,
    hasThirdBtn,
    cancelable,
    btnArrOfModal,
  } = props;

  if (hasThirdBtn) {
    if (util.isPlatformAndroid()) {
      btnArrOfModal.reverse();
    }
  }
  return (
    <View style={styles.container}>
      {Alert.alert(mainText, subMainText, [...btnArrOfModal], {
        cancelable,
        onDismiss: () => toggleModal(false),
      })}
    </View>
  );
}

ModalView.propTypes = {
  mainText: PropTypes.string,
  subMainText: PropTypes.string,
  firstBtnText: PropTypes.string,
  secondBtnText: PropTypes.string,
  thirdBtnText: PropTypes.string,
  firstBtnAction: PropTypes.func,
  secondBtnAction: PropTypes.func,
  thirdBtnAction: PropTypes.func,
  isCloseAlertMsg: PropTypes.bool,
  toggleModal: PropTypes.func,
  hasThirdBtn: PropTypes.bool,
  cancelable: PropTypes.bool,
  btnArrOfModal: PropTypes.array,
};

ModalView.defaultProps = {
  mainText: '',
  subMainText: '',
  firstBtnText: '',
  secondBtnText: '',
  thirdBtnText: '',
  firstBtnAction: Function(),
  secondBtnAction: Function(),
  thirdBtnAction: Function(),

  toggleModal: Function(),
  isCloseAlertMsg: false,
  hasThirdBtn: false,
  cancelable: true,
  btnArrOfModal: [],
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ModalView);
