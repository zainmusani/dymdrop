// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  TextInput as RNTextInput,
  View,
  ViewPropTypes,
} from 'react-native';
import {ButtonView, Text} from '../';
import {Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

export default class TextInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isFocused: false,
    };
  }
  static propTypes = {
    disabled: PropTypes.bool,
    largeIcon: PropTypes.bool,
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    labelColor: PropTypes.string,
    labelStyle: PropTypes.object,
    labelType: PropTypes.string,
    inputContainerStyle: PropTypes.object,
    rightIcon: PropTypes.any,
    leftIcon: PropTypes.any,
    editable: PropTypes.bool,
    fontSize: PropTypes.number,
    isPassword: PropTypes.bool,
  };

  static defaultProps = {
    largeIcon: false,
    disabled: false,
    error: '',
    label: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    labelColor: Colors.grey2,
    labelStyle: {marginBottom: 2},
    labelType: 'base',
    inputContainerStyle: {},
    rightIcon: null,
    leftIcon: null,
    editable: true,
    fontSize: 14,
    isPassword: false,
  };

  focus() {
    this.myRef.focus();
    this.setState({isFocused: true});
  }

  blur() {
    this.myRef.blur();
    this.setState({isFocused: false});
  }

  render() {
    const {
      largeIcon,
      disabled,
      label,
      labelColor,
      labelStyle,
      labelType,
      inputContainerStyle,
      error,
      containerStyle,
      onPress,
      multiline,
      rightIcon,
      leftIcon,
      editable,
      fontSize,
      isPassword,
      ...rest
    } = this.props;

    const {isFocused} = this.state;
    const isError = !util.isEmptyValue(error) && !util.isFieldNil(error);
    return (
      <View style={[containerStyle]}>
        <Text
          size={16}
          color={labelColor}
          style={[labelStyle]}
          type={labelType}>
          {label}
        </Text>

        <View pointerEvents={!editable ? 'none' : 'auto'}>
          <RNTextInput
            ref={ref => {
              this.myRef = ref;
            }}
            style={[
              styles.input,
              {fontSize: /*  util.isPlatformAndroid() ? 16 : */ fontSize},
              {
                backgroundColor: Colors.background.tertiary,
                borderRadius: 8,
              },
              multiline ? {maxHeight: 140} : {height: 46},

              rightIcon !== null && {paddingRight: 40},
              leftIcon !== null && {paddingLeft: 45},

              isError
                ? {
                    borderColor: Colors.error.primary,
                    borderWidth: 2,
                  }
                : {
                    borderColor: isFocused
                      ? Colors.border.hepta
                      : Colors.border.tertiary,

                    borderWidth: isFocused ? 2 : 0,
                  },

              multiline ? styles.multilineInput : {},
            ]}
            blurOnSubmit={false}
            selectionColor={Colors.blue}
            multiline={multiline}
            onFocus={() => this.focus()}
            onBlur={() => this.blur()}
            editable={!disabled}
            {...rest}
          />
        </View>
        {((!util.isFieldNil(rightIcon) && !isPassword) ||
          (!util.isFieldNil(rightIcon) && isPassword && isFocused)) && (
          <ButtonView onPress={onPress} style={[styles.buttonOverlay]}>
            <Image
              source={!util.isFieldNil(rightIcon) ? rightIcon : rightEyeIcon}
              style={styles.arrowIcon}
            />
          </ButtonView>
        )}
        {!util.isFieldNil(leftIcon) && (
          <ButtonView style={[styles.buttonOverlayLeft]}>
            <Image
              source={leftIcon}
              style={[
                styles.arrowIconLeft,
                largeIcon && styles.arrowIconLeftLarge,
              ]}
            />
          </ButtonView>
        )}
        {isError && (
          <Text
            size="small"
            color={Colors.text.error}
            style={{
              position: 'absolute',
              top: multiline ? 148 : 72,
              left: 3,
              fontSize: 12,
            }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
