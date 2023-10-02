import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import {SpinnerComponent} from '../../components';
import {Image, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {Images, Metrics} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';

function WebViewContainer(props) {
  const [loading, setLoading] = useState(() => true);
  const {incomingURL} = props;

  const backBtnSec = () => (
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={[styles.backBtnStyle, {top: 60, left: 20}]}>
      <Image source={Images.BackButtonIcon} style={styles.backbtnIconStyle} />
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{height: Metrics.screenHeight, backgroundColor: 'white'}}>
        <SpinnerComponent isLoading={loading} />
        {!loading && backBtnSec()}
        <View style={{height: Metrics.screenHeight, marginTop: 30}}>
          <WebView
            style={{flex: 1, marginTop: 25}}
            scalesPageToFit={true}
            source={{uri: incomingURL}}
            onLoadEnd={() => setLoading(false)}
            cacheEnabled={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

WebViewContainer.propTypes = {
  incomingURL: PropTypes.string,
};

WebViewContainer.defaultProps = {
  incomingURL: 'https://www.google.com',
};

export default WebViewContainer;
