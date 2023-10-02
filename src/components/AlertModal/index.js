// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {ProgressBarComponent, Text} from '../../components';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import Spinner from 'react-native-spinkit';

function AlertModal(props) {
  const {
    btnText,
    btnAction,
    getAlertText,
    hasError,
    hasBtn,
    setPagePublished,
    isPublishingMode,
    incomingStyle,
    styleSpacingFromTopofScreen,
    onPagePublishApiCall,
    disableBtn,
    hasWarning,
    invitation,
    btnLoading,
  } = props;
  let secondaryBtn = isPublishingMode || hasError;

  const progressBarContentSec = () => (
    <>
      <View style={{position: 'absolute', left: 15}}>
        <Text size={17} color={'white'} style={AppStyles.mLeft10}>
          {getAlertText()}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          {position: 'absolute', right: 0},
          styles.btnContainer,
          secondaryBtn && {
            backgroundColor: 'transparent',
            borderColor: Colors.border.quaternary,
            borderWidth: 1,
          },
        ]}
        onPress={btnAction}>
        <Text color={Colors.text.tertiary} type={'semiBold'} size={14}>
          {util.capitalizeString(btnText)}
        </Text>
      </TouchableOpacity>
    </>
  );

  const getAlertType = () => {
    if (hasError) {
      return Images.ErrorAlertIcon;
    } else if (hasWarning) {
      return Images.WarningAlertIcon;
    }

    return Images.ConfirmAlertIcon;
  };

  return (
    <View style={[styles.container, styleSpacingFromTopofScreen]}>
      <View style={[styles.alertViewContainer, incomingStyle]}>
        {isPublishingMode && (
          <>
            <ProgressBarComponent
              onProgressCompleteAction={setPagePublished}
              incomingStyle={styles.progessBarStyle}
              onCallBackFunc={onPagePublishApiCall}
            />
            {progressBarContentSec()}
          </>
        )}

        {!isPublishingMode && (
          <>
            <View style={styles.alertTextContainer}>
              {!invitation && (
                <Image
                  source={getAlertType()}
                  style={styles.alertIconStyle}
                  resizeMode="contain"
                />
              )}
              <Text
                size={16}
                color={'white'}
                style={
                  invitation
                    ? [AppStyles.mLeft0, {width: Metrics.screenWidth / 1.8}]
                    : AppStyles.mLeft10
                }>
                {getAlertText()}
              </Text>
            </View>

            {hasBtn && (
              <TouchableOpacity
                disabled={disableBtn}
                style={[
                  styles.btnContainer,
                  secondaryBtn && {
                    backgroundColor: 'transparent',
                    borderColor: Colors.border.quaternary,
                    borderWidth: 1,
                  },
                  invitation && {
                    backgroundColor: Colors.alertBtn.quaternary,
                  },
                  disableBtn && {opacity: invitation ? 1 : 0.4},
                ]}
                onPress={btnAction}>
                {btnLoading ? (
                  <Spinner
                    style={[{alignSelf: 'center', opacity: 1}]}
                    isVisible={true}
                    size={16}
                    type={'FadingCircleAlt'}
                    color={Colors.white}
                  />
                ) : (
                  <Text
                    color={Colors.text.tertiary}
                    type={'semiBold'}
                    size={14}
                    style={[
                      {left: 2},
                      invitation && {fontWeight: '700'},
                      disableBtn && {opacity: invitation ? 1 : 0.4},
                    ]}>
                    {util.capitalizeString(btnText)}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

AlertModal.propTypes = {
  btnText: PropTypes.string,
  btnAction: PropTypes.func,
  getAlertText: PropTypes.func,
  setPagePublished: PropTypes.func,
  alertText: PropTypes.string,
  hasBtn: PropTypes.bool,
  hasError: PropTypes.bool,
  isPublishingMode: PropTypes.bool,
  incomingStyle: PropTypes.object,
  styleSpacingFromTopofScreen: PropTypes.object,
  onPagePublishApiCall: PropTypes.func,
  disableBtn: PropTypes.bool,
  hasWarning: PropTypes.bool,
  invitation: PropTypes.bool,
  btnLoading: PropTypes.bool,
};

AlertModal.defaultProps = {
  btnText: '',
  btnAction: Function(),
  getAlertText: Function(),
  setPagePublished: Function(),
  alertText: '',
  hasBtn: false,
  hasError: false,
  isPublishingMode: false,
  incomingStyle: {marginHorizontal: 10},
  invitation: false,
  styleSpacingFromTopofScreen: {top: 50},
  onPagePublishApiCall: Function(),
  disableBtn: false,
  hasWarning: false,
  btnLoading: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(AlertModal);
