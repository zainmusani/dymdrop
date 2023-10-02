// @flow
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Text} from '../../components';

function Empty(props) {
  return (
    <View style={styles.container}>
      <Text>Empty Container</Text>
    </View>
  );
}

Empty.propTypes = {};

Empty.defaultProps = {};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Empty);
