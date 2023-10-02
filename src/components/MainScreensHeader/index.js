// @flow
import React, {useState, useRef} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import {Text, DestructiveActionBottomSheet} from '..';
import util from '../../util';
import {AppStyles, Colors, Metrics} from '../../theme';
import nfcManager from 'react-native-nfc-manager';
import {readNdef} from '../../helpers/NFCHelpers';
import {Actions} from 'react-native-router-flux';

function MainScreensHeader(props) {
  const {
    headerText,
    headerAlign,
    headerSize,
    firstIcon,
    secondIcon,
    isFirstIconButton,
    isSecondIconButton,
    isThirdIconButton,
    firstIconText,
    secondIconText,
    thirdIconText,
    shouldSecondIconPress,
    shouldThirdIconPress,
    firstIconAction,
    secondIconAction,
    thirdIconAction,
    firstIconStyle,
    secondIconStyle,
    thirdIconStyle,
    secondIconTextColor,
    shouldFirstIconPress,
    showFirstIcon,
    borderWidth,
    hasScanBtn,
    scanBtnText,
    hasCustomMargin,
  } = props;
  const ActionSheetRef = useRef(null);
  const iconsRenderer = () => {
    return (
      <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
        {firstBtnSec()}
        <View style={AppStyles.flexRow}>
          {hasScanBtn && scanBtnSec()}
          {secondBtnSec()}
          {isThirdIconButton && thirdBtnSec()}
        </View>
      </View>
    );
  };

  const firstBtnSec = () =>
    showFirstIcon && !isFirstIconButton ? (
      <TouchableOpacity
        disabled={!shouldFirstIconPress}
        onPress={firstIconAction}
        style={{alignSelf: 'center'}}>
        <Image source={firstIcon} style={styles.iconDimensionsStyle} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={firstIconStyle}>
        <Text>{firstIconText}</Text>
      </TouchableOpacity>
    );

  const secondBtnSec = () =>
    !isSecondIconButton ? (
      <TouchableOpacity onPress={secondIconAction}>
        <Image source={secondIcon} style={styles.iconDimensionsStyle} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.buttonStyle, secondIconStyle]}
        onPress={secondIconAction}
        disabled={shouldSecondIconPress}>
        <Text color={secondIconTextColor} type="semiBold" size={14}>
          {util.capitalizeString(secondIconText)}
        </Text>
      </TouchableOpacity>
    );
  const thirdBtnSec = () => (
    <TouchableOpacity
      style={[styles.buttonStyle, thirdIconStyle]}
      onPress={thirdIconAction}
      disabled={shouldThirdIconPress}>
      <Text color={Colors.white} type="semiBold" size={14}>
        {thirdIconText}
      </Text>
    </TouchableOpacity>
  );

  const scanBtnAction = () => {
    ActionSheetRef?.current.show();
  };
  const ScanBtnToggle = () => {
    nfcManager.start();
    readNdef();
  };
  const QrBtnToggle = () => {
    Actions.push('qrcodescanner');
  };

  const scanBtnSec = () => (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        AppStyles.mRight15,
        {backgroundColor: Colors.button.primary},
      ]}
      onPress={QrBtnToggle}>
      <Text color={Colors.text.tertiary} type="semiBold" size={14}>
        {util.capitalizeString(scanBtnText)}
      </Text>
    </TouchableOpacity>
  );

  const headerTextAndBottomLine = () => {
    return (
      <>
        <View style={[AppStyles.mTop40, {alignItems: headerAlign}]}>
          <Text size={headerSize} type="bold">
            {headerText}
          </Text>
        </View>
        <View style={[styles.bottomLineStyle, {width: borderWidth}]} />
      </>
    );
  };
  const ScanSheetRender = () => (
    <DestructiveActionBottomSheet
      ActionSheetRef={ActionSheetRef}
      options={['Scan QR Code', 'Cancel']}
      cancelBtnIndex={1}
      firstOptionToggle={QrBtnToggle}
    />
  );
  // const ScanSheetRender = () => (
  //   <DestructiveActionBottomSheet
  //     ActionSheetRef={ActionSheetRef}
  //     options={['Scan NFC', 'Scan QR Code', 'Cancel']}
  //     cancelBtnIndex={2}
  //     firstOptionToggle={ScanBtnToggle}
  //     secondOptionToggle={QrBtnToggle}
  //   />
  // );
  return (
    <View style={[hasCustomMargin && AppStyles.pBottom0, styles.container]}>
      {iconsRenderer()}
      {headerTextAndBottomLine()}
      {ScanSheetRender()}
    </View>
  );
}

MainScreensHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  headerAlign: PropTypes.string,
  headerSize: PropTypes.number,
  firstIcon: PropTypes.any,
  secondIcon: PropTypes.any,
  isFirstIconButton: PropTypes.bool,
  isSecondIconButton: PropTypes.bool,
  isThirdIconButton: PropTypes.bool,
  firstIconText: PropTypes.string,
  secondIconText: PropTypes.string,
  thirdIconText: PropTypes.string,
  firstIconStyle: PropTypes.object,
  secondIconStyle: PropTypes.object,
  thirdIconStyle: PropTypes.object,
  secondIconTextColor: PropTypes.string,
  firstIconAction: PropTypes.func,
  secondIconAction: PropTypes.func,
  thirdIconAction: PropTypes.func,
  shouldFirstIconPress: PropTypes.bool,
  showFirstIcon: PropTypes.bool,
  borderWidth: PropTypes.number,
  hasScanBtn: PropTypes.bool,
  scanBtnText: PropTypes.string,
  shouldSecondIconPress: PropTypes.bool,
  shouldThirdIconPress: PropTypes.bool,
  hasCustomMargin: PropTypes.bool,
};

MainScreensHeader.defaultProps = {
  headerAlign: 'flex-start',
  headerSize: 32,
  firstIcon: null,
  secondIcon: null,
  isFirstIconButton: false,
  isSecondIconButton: false,
  isThirdIconButton: false,
  firstIconText: '',
  secondIconText: '',
  thirdIconText: '',
  firstIconStyle: {},
  secondIconStyle: {},
  thirdIconStyle: {},
  secondIconTextColor: Colors.text.primary,
  firstIconAction: Function(),
  secondIconAction: Function(),
  thirdIconAction: Function(),
  shouldFirstIconPress: true,
  showFirstIcon: true,
  borderWidth: Metrics.screenWidth / 1.2,
  hasScanBtn: false,
  scanBtnText: '',
  shouldSecondIconPress: false,
  shouldThirdIconPress: false,
  hasCustomMargin: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(MainScreensHeader);
