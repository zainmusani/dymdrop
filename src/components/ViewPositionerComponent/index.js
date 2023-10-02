import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '../../components';
import util from '../../util';
import styles from './styles';
function ViewPositionerComponent(props) {
  const {
    containerImg,
    title,
    onSelectOption,
    isActive,
    isPositionBoxClickable,
  } = props;
  return (
    <TouchableOpacity
      onPress={onSelectOption}
      style={[
        styles.container,
        isActive && styles.activeStyle,
        isPositionBoxClickable && {opacity: 0.4},
      ]}
      disabled={isPositionBoxClickable}>
      <Image source={containerImg} />
      <View style={{marginTop: 12}}>
        <Text size={14} type="semiBold">
          {util.capitalizeString(title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ViewPositionerComponent.propTypes = {
  containerImg: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onSelectOption: PropTypes.func,
  isPositionBoxClickable: PropTypes.bool,
};

ViewPositionerComponent.defaultProps = {
  isActive: false,
  onSelectOption: Function(),
  isPositionBoxClickable: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ViewPositionerComponent);
