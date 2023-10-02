import React, {useCallback, useRef, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch} from 'react-redux';
import {forgotPasswordRequest} from '../../actions/UserActions';
import {
  AlertModal,
  ButtonComponent,
  KeyboardAwareScrollViewComponent,
  OnBoardingHeader,
  Text,
  TextInput,
} from '../../components';
import {ALERT_TIMER} from '../../constants';
import {Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import _ from 'lodash';

function ForgotPassword() {
  const [email, setEmail] = useState(() => '');
  const [emailError, setEmailError] = useState(() => '');
  const [alertModal, setAlertModal] = useState(() => false);
  const [alertModalText, setAlertModalText] = useState(() => '');
  const [isLoading, setIsLoading] = useState(() => false);
  const [hasError, setHasError] = useState(() => false);

  const emailRef = useRef(null);

  const dispatch = useDispatch();

  const isButtonDisplay = email === '';

  const onSubmitPress = () => {
    setEmail(_.trim(email));
    setEmailError('');

    if (validation()) {
      Keyboard.dismiss();
      setIsLoading(true);

      const payload = {
        email: _.trim(email),
      };

      dispatch(
        forgotPasswordRequest(payload, res => {
          setIsLoading(false);
          if (res.status) {
            Actions.verificationCode({
              fromForgotPassword: true,
              headerText: 'Verify Email',
              incomingEmail: payload.email,
            });
          } else {
            setHasError(true);
            setAlertModalText(res.message);
            setAlertModal(true);
          }
        }),
      );
    }
  };

  const validation = () => {
    let validate = true;

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

  const getAlertText = useCallback(() => {
    return alertModalText;
  }, [alertModalText]);

  const guidelineSection = () => {
    return (
      <View style={styles.guidelineContainer}>
        <Text
          style={{textAlign: 'center'}}
          color={Colors.text.secondary}
          size={16}>
          Enter your email address and we'll send a code to reset your password.
        </Text>
      </View>
    );
  };

  const inputFormsAndForgotPassSection = () => {
    return (
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
              onSubmitPress();
            }}
            ref={emailRef}
            error={emailError}
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
          />
        </View>
      </View>
    );
  };

  const buttonRender = () => {
    return (
      <ButtonComponent
        text={'Send Code'}
        action={() => onSubmitPress()}
        isBtnDisabled={isButtonDisplay || isLoading}
        isLoading={isLoading}
      />
    );
  };

  const returnToSignIn = () => {
    return (
      <View style={styles.returnToSignInContainer}>
        <TouchableOpacity onPress={() => Actions.pop()}>
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

        <View style={styles.container}>
          <KeyboardAwareScrollViewComponent scrollEnabled={true}>
            <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
              <OnBoardingHeader headerText={'Forgot Password'} />
            </View>
            <View style={[{top: !util.isPlatformAndroid() ? -50 : -30}]}>
              {guidelineSection()}
              {inputFormsAndForgotPassSection()}
              {buttonRender()}
              {returnToSignIn()}
            </View>
          </KeyboardAwareScrollViewComponent>
        </View>
      </SafeAreaView>
    </>
  );
}

ForgotPassword.propTypes = {};

ForgotPassword.defaultProps = {};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ForgotPassword);
