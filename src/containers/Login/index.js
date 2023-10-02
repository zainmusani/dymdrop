import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {connect, useDispatch} from 'react-redux';
import styles from './styles';
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
import {userSigninRequest} from '../../actions/UserActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import _ from 'lodash';

function Login(props) {
  const {
    isAlertFromAnotherScreen,
    isSaveUserDataAlert,
    isDeleteUserDataAlert,
    isUserLoggedOutAlert,
    isUserBlocked,
    incomingAlertText,
    userData,
  } = props;

  const isAlertModal =
    isAlertFromAnotherScreen ||
    isSaveUserDataAlert ||
    isDeleteUserDataAlert ||
    isUserBlocked ||
    isUserLoggedOutAlert;

  const [isPasswordVisible, setPasswordVisibility] = useState(() => false);
  const [password, setPassword] = useState(() => '');
  const [email, setEmail] = useState(() => '');
  const [emailError, setEmailError] = useState(() => '');
  const [passwordError, setPasswordError] = useState(() => '');
  const [alertModal, setAlertModal] = useState(() => isAlertModal);
  const [alertModalText, setAlertModalText] = useState(() => incomingAlertText);
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasError, setHasError] = useState(() => isUserBlocked);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserBlocked) {
      setHasError(true);

      setAlertModalText(incomingAlertText);
    }
  }, []);

  const onSubmitPress = () => {
    setEmail(_.trim(email));

    setEmailError('');
    setPasswordError('');

    if (validation()) {
      setIsLoading(true);
      Keyboard.dismiss();
      const useremail = email.toString().toLowerCase();
      const payload = {
        email: _.trim(useremail),
        password,
      };

      dispatch(
        userSigninRequest(payload, res => {
          setIsLoading(false);
          if (res.status) {
            if (res.data.isFormSubmitted) {
              if (!res.data.isUserApproved) {
                Actions.reset('dashboard', {isBlockedAlert: true});
              } else {
                Actions.reset('dashboard');
              }
              return;
            } else if (!res.data.isFormSubmitted) {
              Actions.reset('applyForm');
              return;
            }
          } else {
            setHasError(true);
            setAlertModalText(res.message);
            setAlertModal(true);
          }
        }),
      );
    }
  };

  const isButtonDisplay = email === '' || password === '';

  const validation = () => {
    let validate = true;

    if (util.isEmptyValue(password)) {
      setPasswordError('Password is required');
      passwordRef?.current?.focus?.();
      validate = false;
    }
    if (!util.isEmailValid(_.trim(email))) {
      setEmailError('Invalid email');

      emailRef?.current?.focus?.();

      validate = false;
    }

    if (util.isEmptyValue(email)) {
      setEmailError('Email is required');
      emailRef?.current?.focus?.();
      validate = false;
    }

    return validate;
  };

  const getAlertText = () => {
    if (util.isEmptyValue(alertModalText)) {
      if (isAlertFromAnotherScreen) {
        return 'Password saved';
      } else if (isSaveUserDataAlert) {
        return 'Account is deactivated';
      } else if (isDeleteUserDataAlert) {
        return 'Account is deactivated and deleted';
      } else if (isUserLoggedOutAlert) {
        return 'Logged out';
      }
    } else {
      return alertModalText;
    }
  };

  const alertSec = useCallback(() => {
    setTimeout(() => {
      setAlertModal(false);
      setHasError(false);
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

  const inputFormsAndForgotPassSection = () => (
    <View style={styles.inputSectionContainer}>
      <View>
        <TextInput
          autoFocus
          label={'Email'}
          autoCapitalize="none"
          keyboardType={'email-address'}
          labelColor={Colors.black}
          rightIcon={util.isEmptyValue(email) ? null : Images.CrossIcon}
          onPress={() => setEmail('')}
          labelType={'semiBold'}
          placeholder={'jane@example.com'}
          onSubmitEditing={() => {
            passwordRef?.current?.focus?.();
          }}
          ref={emailRef}
          error={emailError}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
      </View>

      <View style={AppStyles.mTop25}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            Actions.forgotPassword();
          }}
          style={styles.forgotPasswordContainer}>
          <Text size={16} color={Colors.text.reca}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <TextInput
          label={'Password'}
          isPassword
          labelColor={Colors.black}
          labelType={'semiBold'}
          rightIcon={isPasswordVisible ? Images.CrossedEyeIcon : Images.EyeIcon}
          onPress={() => setPasswordVisibility(!isPasswordVisible)}
          secureTextEntry={isPasswordVisible ? false : true}
          placeholder={PASSWORD_PLACEHOLDER}
          onSubmitEditing={() => {
            onSubmitPress();
          }}
          ref={passwordRef}
          error={passwordError}
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
        />
      </View>
    </View>
  );

  const buttonRender = () => (
    <ButtonComponent
      text={'Sign In'}
      action={() => onSubmitPress()}
      isBtnDisabled={isButtonDisplay || isLoading}
      isLoading={isLoading}
    />
  );

  const dontHaveAccountSection = () => (
    <View style={[[styles.noAccountContainer]]}>
      <Text size={16} color={Colors.text.secondary}>
        Don't have an account?{' '}
      </Text>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          Actions.signup();
        }}>
        <Text size={16} color={Colors.text.reca}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );

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
        <View style={[styles.container]}>
          <KeyboardAwareScrollViewComponent scrollEnabled={true}>
            <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
              <OnBoardingHeader headerText={'Sign In'} />
            </View>
            <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
              {inputFormsAndForgotPassSection()}
              {buttonRender()}
              {dontHaveAccountSection()}
            </View>
          </KeyboardAwareScrollViewComponent>
        </View>
      </SafeAreaView>
    </>
  );
}

Login.propTypes = {
  isAlertFromAnotherScreen: PropTypes.bool,
  isSaveUserDataAlert: PropTypes.bool,
  isDeleteUserDataAlert: PropTypes.bool,
  isUserLoggedOutAlert: PropTypes.bool,
  isUserBlocked: PropTypes.bool,
  incomingAlertText: PropTypes.string,
};

Login.defaultProps = {
  isAlertFromAnotherScreen: false,
  isSaveUserDataAlert: false,
  isDeleteUserDataAlert: false,
  isUserLoggedOutAlert: false,
  isUserBlocked: false,
  incomingAlertText: '',
};

const mapStateToProps = ({user}) => ({
  userData: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(Login);
