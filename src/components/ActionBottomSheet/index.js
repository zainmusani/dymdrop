// @flow
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import BottomSheet from 'react-native-bottomsheet';
import {connect} from 'react-redux';
``;
function ActionBottomSheet(props) {
  const {
    firstBtnText,
    secondBtnText,
    firstBtnAction,
    secondBtnAction,
    cancelBtnAction,
  } = props;
  return (
    <View>
      {BottomSheet.showBottomSheetWithOptions(
        {
          options: [firstBtnText, secondBtnText, 'Cancel'],
          dark: false,
          cancelButtonIndex: 2,
          failureCallback: cancelBtnAction(),
        },
        value => {
          if (value === 0) {
            firstBtnAction();
          }
          if (value === 1) {
            secondBtnAction();
          }
          if (value === 2) {
            cancelBtnAction();
          }
        },
      )}
    </View>
  );
}

ActionBottomSheet.propTypes = {
  firstBtnText: PropTypes.string,
  secondBtnText: PropTypes.string,
  firstBtnAction: PropTypes.func,
  secondBtnAction: PropTypes.func,
  cancelBtnAction: PropTypes.func,
};

ActionBottomSheet.defaultProps = {
  firstBtnText: 'abc',
  secondBtnText: 'dev',
  firstBtnAction: Function(),
  secondBtnAction: Function(),
  cancelBtnAction: Function(),
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ActionBottomSheet);
