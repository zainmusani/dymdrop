// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Keyboard, ScrollView, TouchableOpacity, View} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import {connect} from 'react-redux';
import styles from './styles';
import {Metrics} from '../../theme';
import util from '../../util';

function BottomSheetComponent(props) {
  const {
    renderViewHeader,
    renderView,
    refRBSheet,

    activeBottomSheetId,
    enableBottomSheetGesture,
  } = props;

  let snapLastIndex = util.isPlatformAndroid()
    ? Metrics.screenHeight * 0.16
    : Metrics.screenHeight * 0.18;
  let snapMidIndex = util.isPlatformAndroid()
    ? Metrics.screenHeight * 0.47
    : Metrics.screenHeight * 0.49;

  const MAX_HEIGHT_BOTTOM_SHEET = util.isPlatformAndroid()
    ? Metrics.screenHeight * 0.91
    : Metrics.screenHeight * 0.88;

  const [snapIndexList, setSnapIndexList] = useState(() => [
    MAX_HEIGHT_BOTTOM_SHEET,
    snapMidIndex,
    snapLastIndex,
  ]);

  const [isKeyboardOpen, setKeyboardOpen] = useState(() => false);

  const [initialSnapToShow, setInitialSnapToShow] = useState(() =>
    !enableBottomSheetGesture ? 0 : 2,
  );

  useEffect(() => {
    if (util.isFieldNil(activeBottomSheetId) && enableBottomSheetGesture) {
      refRBSheet.current.snapTo(1);
    } else {
      refRBSheet.current.snapTo(0);
    }
  }, [activeBottomSheetId]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);

        if (util.isPlatformAndroid()) {
          setSnapIndexList([
            Metrics.screenHeight * 0.548,
            Metrics.screenHeight * 0.516,
            snapLastIndex,
          ]);
          refRBSheet.current.snapTo(0);
        } else {
          refRBSheet.current.snapTo(0);
        }
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);

        if (util.isPlatformAndroid()) {
          setSnapIndexList([
            MAX_HEIGHT_BOTTOM_SHEET,
            snapMidIndex,
            snapLastIndex,
          ]);

          refRBSheet.current.snapTo(0);
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const rbSheetSec = () => {

    return (
      <>
        <BottomSheet
          // enabledInnerScrolling={activeBottomSheetId !== 0}
          onCloseEnd={() => {
            Keyboard.dismiss();
          }}
          ref={refRBSheet}
          snapPoints={snapIndexList}
          initialSnap={initialSnapToShow}
          borderRadius={0}
          renderHeader={renderViewHeader}
          renderContent={renderView}
          enabledContentGestureInteraction={false}
          enabledGestureInteraction={enableBottomSheetGesture}
        />
      </>
    );
  };

  const onCloseSheet = () => {
    if (isKeyboardOpen) {
      Keyboard.dismiss();
    } else {
      // removeSheet();
    }
  };

  const renderContentOfBottomSheet = () => (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.bottomSheetContainerPressStyle}
        onPress={onCloseSheet}>
        <View />
      </TouchableOpacity>
      <View style={{flex: 1, top: 10}}>
        <TouchableOpacity
          onPress={onCloseSheet}
          activeOpacity={1}
          style={{top: -40, height: 90, top: 0}}>
          <View />
        </TouchableOpacity>
        {rbSheetSec()}
      </View>
    </>
  );

  return <View style={{flex: 1, top: 30}}>{renderContentOfBottomSheet()}</View>;
}

BottomSheetComponent.propTypes = {
  renderViewHeader: PropTypes.any,
  renderView: PropTypes.any,
  refRBSheet: PropTypes.any,
  onBottomSheetClose: PropTypes.func,
  isEditMode: PropTypes.bool,
  onSubmitPage: PropTypes.func,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  activeBottomSheetId: PropTypes.number,
  enableBottomSheetGesture: PropTypes.bool,
};

BottomSheetComponent.defaultProps = {
  renderViewHeader: Function(),
  onBottomSheetClose: Function(),
  onSubmitPage: Function(),
  keyboardAvoidingViewEnabled: false,
  activeBottomSheetId: null,
  enableBottomSheetGesture: true,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(BottomSheetComponent);
