// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';

function DestructiveActionBottomSheet(props) {
  const {
    ActionSheetRef,
    firstOptionToggle,
    secondOptionToggle,
    options,
    cancelBtnIndex,
    destructiveBtnIndex,
  } = props;
  return (
    <ActionSheet
      ref={ActionSheetRef}
      options={options}
      cancelButtonIndex={cancelBtnIndex}
      destructiveButtonIndex={destructiveBtnIndex}
      onPress={index => {
        if (index === 0) {
          firstOptionToggle();
        }
        if (index === 1) {
          secondOptionToggle();
        }
      }}
    />
  );
}

DestructiveActionBottomSheet.propTypes = {
  ActionSheetRef: PropTypes.any,
  firstOptionToggle: PropTypes.func,
  secondOptionToggle: PropTypes.func,
  options: PropTypes.array,
  cancelBtnIndex: PropTypes.number,
  destructiveBtnIndex: PropTypes.number,
};

DestructiveActionBottomSheet.defaultProps = {
  firstOptionToggle: Function(),
  secondOptionToggle: Function(),
  options: [],
  cancelBtnIndex: 2,
  destructiveBtnIndex: null,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(DestructiveActionBottomSheet);
