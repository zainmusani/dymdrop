import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button} from '../../components';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';
import Text from '../Text';

function ButtonComponent(props) {
  const {text, extraText, hasExtraText, action, isBtnDisabled, isLoading, top} =
    props;
  return (
    <View style={[styles.buttonContainer, top && {marginTop: top}]}>
      <Button
        disabled={isBtnDisabled}
        size={15}
        type="semiBold"
        isLoading={isLoading}
        style={styles.buttonStyle}
        onPress={action}>
        {util.capitalizeString(text)}
      </Button>
      {hasExtraText && (
        <View style={AppStyles.mTop10}>
          <Text size={14} color={Colors.text.secondary}>
            {extraText}
          </Text>
        </View>
      )}
    </View>
  );
}

ButtonComponent.propTypes = {
  top: PropTypes.number,
  text: PropTypes.string,
  extraText: PropTypes.string,
  hasExtraText: PropTypes.bool,
  action: PropTypes.func,
  isBtnDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  text: '',
  top: null,
  extraText: '',
  hasExtraText: false,
  isBtnDisabled: false,
  action: Function(),
  isLoading: false,
};

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ButtonComponent);
