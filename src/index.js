// @flow
import React, {Component} from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import applyConfigSettings from './config';
import AppNavigator from './navigator';
import DataHandler from './services/DataHandler';
import configureStore from './store';
import AppStyles from './theme/AppStyles';

const reducers = require('./reducers').default;

applyConfigSettings();

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
      this._loadingCompleted();
      this.setState({isLoading: false});
    }),
  };

  _loadingCompleted() {
    DataHandler.setStore(this.state.store);
  }

  componentDidMount() {}

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <SafeAreaView style={[AppStyles.flex]} edges={['right', 'left']}>
        <StatusBar
          backgroundColor={'white'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
      </SafeAreaView>
    );
  }
}

AppRegistry.registerComponent('AutoConnect', () => App);
