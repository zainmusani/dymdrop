import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text} from '..';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

function OnBoardingHeader(props) {
  const {headerText, hasBackBtn, showBottomBorder, isImage, showIcon, subText} =
    props;

  const getMarginTop = () => {
    if (!showIcon) {
      return 10;
    }

    return !showBottomBorder ? 30 : 60;
  };

  const iconRendererAndHeaderText = () => {
    return (
      <>
        {hasBackBtn && backBtnSec()}

        {/* <View style={[AppStyles.flex, AppStyles.mTop20]}> */}
        <View
          style={[
            AppStyles.flex,
            hasBackBtn && {
              marginTop: util.isPlatformAndroid()
                ? Metrics.statusBarHeight + 78
                : Metrics.statusBarHeight + 69,
            },
          ]}>
          <View style={[AppStyles.alignItemsCenter, {marginBottom: 24}]}>
            {showIcon && <Image source={Images.dymedroplogo} />}
            <View
              style={{
                marginTop: getMarginTop(),
              }}>
              <View style={{alignSelf: 'center'}}>
                {isImage ? (
                  <Image
                    style={{width: 100, height: 100}}
                    resizeMode="contain"
                    source={Images.dymedroplogo}
                  />
                ) : (
                  <Text size={32} type="bold">
                    {headerText}
                  </Text>
                )}
              </View>
              {!util.isEmptyValue(subText) && (
                <Text
                  size={16}
                  style={{textAlign: 'center', marginTop: 16}}
                  color={Colors.text.secondary}>
                  {subText}
                </Text>
              )}
            </View>
          </View>
          {showBottomBorder && <View style={styles.bottomLineStyle} />}
        </View>
      </>
    );
  };

  const backBtnSec = () => (
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={[styles.backBtnStyle]}>
      <Image source={Images.BackButtonIcon} style={styles.backbtnIconStyle} />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        !showBottomBorder && AppStyles.mBottom30,
        !hasBackBtn
          ? {
              marginTop: util.isPlatformAndroid()
                ? Metrics.statusBarHeight + 98
                : Metrics.statusBarHeight + 89,
            }
          : {
              marginTop: util.isPlatformAndroid()
                ? Metrics.statusBarHeight + 20
                : Metrics.statusBarHeight + 35,
            },
      ]}>
      {iconRendererAndHeaderText()}
    </View>
  );
}

OnBoardingHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  hasBackBtn: PropTypes.bool,
  showBottomBorder: PropTypes.bool,
  showIcon: PropTypes.bool,
  subText: PropTypes.string,
  isImage: PropTypes.bool,
};

OnBoardingHeader.defaultProps = {
  hasBackBtn: false,
  showBottomBorder: true,
  showIcon: true,
  subText: '',
  isImage: false,
};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(OnBoardingHeader);
