import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Colors, Images} from '../../theme';
import styles from './styles';

function CheckBox(props) {
  const {onPressAction, isChecked, isError, isDisabled} = props;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressAction}
      style={[
        styles.checkboxStyle,
        [
          isChecked
            ? styles.checkBoxEnabled
            : isError
            ? [styles.checkBoxDisabled, {borderColor: Colors.error.primary}]
            : styles.checkBoxDisabled,
        ],
      ]}>
      <Image
        source={Images.TickIcon}
        style={{tintColor: Colors.badge.primary}}
      />
    </TouchableOpacity>
  );
}
CheckBox.propTypes = {
  onPressAction: PropTypes.func,
  isChecked: PropTypes.bool,
  isError: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

CheckBox.defaultProps = {
  onPressAction: Function(),
  isChecked: false,
  isError: false,
  isDisabled: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CheckBox);
