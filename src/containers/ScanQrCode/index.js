import React, {useCallback, useRef, useState} from 'react';
import {
  Image as RnImage,
  TouchableOpacity,
  StatusBar,
  View,
  Vibration,
  ActivityIndicator,
} from 'react-native';
import {redeemQrcode} from '../../actions/QrCodeAction';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {Text, SpinnerComponent} from '../../components';
// import {ALERT_TIMER, } from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {RNCamera} from 'react-native-camera';

import util from '../../util';
import styles from './styles';
import _ from 'lodash';

function QrCodeScanner() {
  const [isLoading, setLoading] = useState(false);
  const [torchOn, settorchOn] = useState(false);
  const [pauseView, setpauseView] = useState(false);

  const camRef = useRef(null);

  const dispatch = useDispatch();
  const onBarCodeRead = e => {
    setLoading(true);
    pauseViewToggle();
    if (e && e?.data) {
      const payload = {
        qr_code: e.data,
      };
      dispatch(
        redeemQrcode(payload, res => {
          console.log('res', res);
          resumeScanning();
          setLoading(false);
          if (res.status) {
            Actions.reset('dashboard', {isQrCodeScanned: true});
          } else {
            Actions.reset('dashboard', {
              isQrCodeScannedError: true,
              QrCodeScannedError: 'QR Code is unidentified',
            });
          }
        }),
      );
    } else {
      Actions.reset('dashboard', {isQrCodeScannedError: true});
    }
  };
  const pauseViewToggle = () => {
    camRef?.current.pausePreview();
    setpauseView(!pauseView);
    if (util.isPlatformAndroid()) {
      Vibration.vibrate();
    }
  };
  const resumeScanning = () => {
    setTimeout(() => {
      camRef?.current?.resumePreview();
      setpauseView(!pauseView);
    }, 500);
  };
  const handleTorch = () => {
    settorchOn(!torchOn);
  };
  return (
    <>
      <SafeAreaView
        style={[
          {
            backgroundColor: Colors.background.primary,
            // paddingBottom: 40,
            flex: 1,
          },
        ]}
        edges={['top']}>
        <SpinnerComponent isLoading={isLoading} />
        <View style={styles.container}>
          <RNCamera
            style={styles.preview}
            onBarCodeRead={onBarCodeRead}
            ref={camRef}
            captureAudio={false}
            flashMode={
              torchOn
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }>
            <View
              style={pauseView ? [styles.box, styles.redBorder] : styles.box}>
              <ActivityIndicator
                animating={false}
                color={Colors.accent}
                size="large"
                style={styles.loader}
              />
              <View style={styles.dymedropText}>
                <Text
                  size={Fonts.size.xv}
                  type="bold"
                  color="white"
                  style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10,
                  }}>
                  DYMEDROP
                </Text>
              </View>
              <View />
            </View>
          </RNCamera>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={handleTorch}>
            <RnImage
              style={styles.cameraIcon}
              source={torchOn === true ? Images.TouchOn : Images.TouchOff}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(QrCodeScanner);
