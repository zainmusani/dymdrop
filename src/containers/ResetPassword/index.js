import React, {useCallback, useRef, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {connect, useDispatch} from 'react-redux';
import {
  AlertModal,
  ButtonComponent,
  KeyboardAwareScrollViewComponent,
  OnBoardingHeader,
  Text,
  TextInput,
} from '../../components';
import {ALERT_TIMER, PASSWORD_PLACEHOLDER} from '../../constants';
import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import {
  userChangePasswordRequest,
  userResetPasswordRequest,
} from '../../actions/UserActions';
import {SafeAreaView} from 'react-native-safe-area-context';

function ResetPassword(props) {
  const {fromSettingsScreen, hasBackBtn, setSettingsAlert, otp, email, token} =
    props;

  const [isNewPasswordVisible, setNewPasswordVisibility] = useState(
    () => false,
  );
  const [isConfirmNewPasswordVisible, setConfirmNewPasswordVisibility] =
    useState(() => false);
  const [newPassword, setNewPassword] = useState(() => '');
  const [confirmNewPassword, setConfirmNewPassword] = useState(() => '');

  const [newPasswordError, setNewPasswordError] = useState(() => '');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(
    () => '',
  );

  const [oldPassword, setOldPassword] = useState(() => '');
  const [isOldPasswordVisible, setOldPasswordVisibility] = useState(
    () => false,
  );
  const [oldPasswordError, setOldPasswordError] = useState(() => '');

  const [alertModal, setAlertModal] = useState(() => false);
  const [alertModalText, setAlertModalText] = useState(() => false);

  const [isLoading, setIsLoading] = useState(false);

  const [hasError, setHasError] = useState(() => false);

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const dispatch = useDispatch();

  const isButtonDisplay = fromSettingsScreen
    ? oldPassword === '' || newPassword === '' || confirmNewPassword === ''
    : newPassword === '' || confirmNewPassword === '';

  const onSubmitPress = () => {
    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');

    if (validation()) {
      Keyboard.dismiss();
      setIsLoading(true);

      let payload = {};

      if (fromSettingsScreen) {
        payload = {
          current_password: oldPassword,
          password: newPassword,
        };

        dispatch(
          userChangePasswordRequest(payload, res => {
            setIsLoading(false);
            if (res.status) {
              Actions.popTo('settings');
              setSettingsAlert();
            } else {
              setAlertModalText(res.message);
              setHasError(true);
              setAlertModal(true);
            }
          }),
        );
      } else {
        payload = {
          otp,
          email,
          token,
          password: newPassword,
        };
        dispatch(
          userResetPasswordRequest(payload, res => {
            setIsLoading(false);
            if (res.status) {
              Actions.reset('login', {isAlertFromAnotherScreen: true});
            } else {
              setAlertModalText(res.message);
              setHasError(true);
              setAlertModal(true);
            }
          }),
        );
      }
    }
  };

  const alertSec = useCallback(() => {
    setTimeout(() => {
      setHasError(false);
      setAlertModal(false);
    }, ALERT_TIMER);
    return (
      <AlertModal
        getAlertText={getAlertText}
        hasError={hasError}
        styleSpacingFromTopofScreen={{
          top: util.isPlatformAndroid()
            ? Metrics.screenHeight / 6.6
            : Metrics.screenHeight / 9.4,
        }}
      />
    );
  }, [alertModal]);

  const getAlertText = useCallback(() => {
    // if (!util.isEmptyValue(responseMessageFromApiCall)) {
    //   return responseMessageFromApiCall;
    // }

    return alertModalText;
  }, [alertModalText]);

  const validation = () => {
    let validate = true;

    if (
      util.isOnlyWhiteSpace(confirmNewPassword) &&
      !util.isOnlyWhiteSpace(newPassword)
    ) {
      setConfirmNewPasswordError('Invalid Password');
      confirmNewPasswordRef?.current?.focus?.();
      validate = false;
    }

    if (util.isEmptyValue(confirmNewPassword)) {
      setConfirmNewPasswordError('Password is required');

      confirmNewPasswordRef?.current?.focus?.();
      validate = false;
    }

    if (!util.isPasswordValid(newPassword)) {
      setNewPasswordError('Password cannot be less than 6 characters');

      newPasswordRef?.current?.focus?.();
      validate = false;
    }

    if (util.isOnlyWhiteSpace(newPassword)) {
      setNewPasswordError('Password cannot be only whitespaces');
      newPasswordRef?.current?.focus?.();
      validate = false;
    }

    if (util.isEmptyValue(newPassword)) {
      setNewPasswordError('Password is required');
      newPasswordRef?.current?.focus?.();
      validate = false;
    }

    if (
      confirmNewPassword !== newPassword &&
      !util.isEmptyValue(confirmNewPassword) &&
      !util.isEmptyValue(newPassword)
    ) {
      setConfirmNewPasswordError('Password is not same');
      confirmNewPasswordRef?.current?.focus?.();
      validate = false;
    }

    if (fromSettingsScreen) {
      if (util.isEmptyValue(oldPassword)) {
        setOldPasswordError('Password is required');
        oldPasswordRef?.current?.focus?.();
        validate = false;
      }
    }

    return validate;
  };

  const inputFormsAndForgotPassSection = () => {
    return (
      <View style={styles.inputSectionContainer}>
        {fromSettingsScreen && (
          <View style={AppStyles.mBottom25}>
            <TextInput
              autoFocus
              label={'Old Password'}
              labelColor={Colors.black}
              labelType={'semiBold'}
              rightIcon={
                isOldPasswordVisible ? Images.CrossedEyeIcon : Images.EyeIcon
              }
              isPassword
              onPress={() => setOldPasswordVisibility(!isOldPasswordVisible)}
              secureTextEntry={isOldPasswordVisible ? false : true}
              // fontSize={util.isPlatformAndroid() ? 12 : 14}
              placeholder={PASSWORD_PLACEHOLDER}
              onSubmitEditing={() => {
                newPasswordRef?.current?.focus?.();
              }}
              ref={oldPasswordRef}
              error={oldPasswordError}
              value={oldPassword}
              onChangeText={val => {
                setOldPassword(val);
              }}
            />
          </View>
        )}
        <View>
          <TextInput
            autoFocus={!fromSettingsScreen}
            label={'New Password'}
            labelColor={Colors.black}
            labelType={'semiBold'}
            rightIcon={
              isNewPasswordVisible ? Images.CrossedEyeIcon : Images.EyeIcon
            }
            isPassword
            onPress={() => setNewPasswordVisibility(!isNewPasswordVisible)}
            secureTextEntry={isNewPasswordVisible ? false : true}
            // fontSize={util.isPlatformAndroid() ? 12 : 14}
            placeholder={PASSWORD_PLACEHOLDER}
            onSubmitEditing={() => {
              confirmNewPasswordRef?.current?.focus?.();
            }}
            ref={newPasswordRef}
            error={newPasswordError}
            value={newPassword}
            onChangeText={val => {
              setNewPassword(val);
            }}
          />
        </View>

        <View style={AppStyles.mTop25}>
          <TextInput
            label={'Confirm New Password'}
            labelColor={Colors.black}
            labelType={'semiBold'}
            rightIcon={
              isConfirmNewPasswordVisible
                ? Images.CrossedEyeIcon
                : Images.EyeIcon
            }
            isPassword
            onPress={() =>
              setConfirmNewPasswordVisibility(!isConfirmNewPasswordVisible)
            }
            secureTextEntry={isConfirmNewPasswordVisible ? false : true}
            // fontSize={util.isPlatformAndroid() ? 12 : 14}
            placeholder={PASSWORD_PLACEHOLDER}
            onSubmitEditing={() => {
              onSubmitPress();
            }}
            ref={confirmNewPasswordRef}
            error={confirmNewPasswordError}
            value={confirmNewPassword}
            onChangeText={val => {
              setConfirmNewPassword(val);
            }}
          />
        </View>
      </View>
    );
  };

  const buttonRender = () => {
    return (
      <ButtonComponent
        text={'Save'}
        action={() => onSubmitPress()}
        isBtnDisabled={isButtonDisplay || isLoading}
        isLoading={isLoading}
      />
    );
  };

  const returnToSignIn = () => {
    return (
      <View style={styles.returnToSignInContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            Actions.reset('login');
          }}>
          <Text size={16} color={Colors.text.reca}>
            Return to Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
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
        {alertModal && alertSec()}
        <View style={{backgroundColor: Colors.background.primary, flex: 1}}>
          <View
            style={{
              height: Metrics.screenHeight,
              backgroundColor: Colors.background.primary,
            }}>
            <KeyboardAwareScrollViewComponent
              scrollEnabled={true}
              style={styles.container}>
              <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
                <OnBoardingHeader
                  headerText={'Reset Password'}
                  hasBackBtn={hasBackBtn}
                />
              </View>
              <View
                style={[
                  {height: '100%', marginBottom: 40},
                  {top: !util.isPlatformAndroid() ? -50 : -30},
                ]}>
                {inputFormsAndForgotPassSection()}
                {buttonRender()}
                {!fromSettingsScreen && returnToSignIn()}
              </View>
            </KeyboardAwareScrollViewComponent>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

ResetPassword.propTypes = {
  fromSettingsScreen: PropTypes.bool,
  hasBackBtn: PropTypes.bool,
  setSettingsAlert: PropTypes.func,
};

ResetPassword.defaultProps = {
  fromSettingsScreen: false,
  hasBackBtn: false,
  setSettingsAlert: Function(),
};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ResetPassword);
