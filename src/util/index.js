// @flow
import moment from 'moment';
import {Linking, Platform} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {
  cloneDeep,
  filter,
  find,
  includes,
  isEmpty,
  isEqual,
  isNil,
  has,
  findIndex,
  uniqBy,
  every,
} from 'lodash';
import DataHandler from '../services/DataHandler';
import {BASE_URL} from '../config/WebService';
import {refreshToken, userSignOutSuccess} from '../actions/UserActions';
class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length >= 6;
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  uniqBy = (mArr, func) => uniqBy(mArr, func);

  getFileExtension = url => {
    return url.slice((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1);
  };

  getDomainName = url => {
    console.log({DIDDU: url});
    let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    return matches && matches[1];
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  capitalizeString(string) {
    return string.toUpperCase();
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  async refreshAccessToken() {
    console.log('here in refreshAccessToken');
    let options = Object.assign({method: 'POST'});
    let data = {};
    data.token = this.getCurrentUserRefreshToken();
    console.log({refreshData: data});

    options.body = JSON.stringify(data);

    console.log({options});
    try {
      const response = await fetch(`${BASE_URL}auth/v1/refresh-token`, options);

      console.log({newAccessToken: response});
      const responseJson = await response.json();
      console.log({newAccessToken: responseJson.data});
      DataHandler.getStore().dispatch(refreshToken(responseJson.data));
      return responseJson.data.access_token;
    } catch (error) {
      console.log({refreshTokenError: error});

      DataHandler.getStore().dispatch(userSignOutSuccess());
      return false;
    }
  }

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  getCurrentUserRefreshToken() {
    return DataHandler.getStore().getState().user.data.refresh_token;
  }

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }
  isPrice(val) {
    return /^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/.test(val);
  }
  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }
  generateCode() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 7; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  numberCount(count) {
    let number = null;
    if (count <= 9) {
      number = count;
    } else if (count > 9) {
      number = '9+';
    }
    return number;
  }

  isFieldNil = field => isNil(field);

  isArrayOrObjEmpty = item => {
    return isEmpty(item);
  };

  // isEmptyValue = (value = '') => isEmpty(String(value?.trim()));

  cloneDeepItem = mArr => cloneDeep(mArr);

  findDataFromArray = (mArr, mObj) => find(mArr, mObj);

  isArrayIncludesValue = (mArr, mValue) => includes(mArr, mValue);

  areValuesEqual = (objA, objB) => isEqual?.(objA, objB);

  isEmptyValue = (value = '') => isEmpty(value);

  excludeIdFromArray = (mArr, id) => filter(mArr, item => item.id != id);

  filterArray = (mArr, mFunc) => filter(mArr, mFunc);

  doesArrayContainsParticularId = (array, mId) => {
    if (find(array, {id: mId})) return true;
    else return false;
  };

  isOnlyWhiteSpace(str) {
    return !str.trim();
  }

  hasObjectWithKey = (mObj, key) => has(mObj, key);

  every = (mArr, _func) => every(mArr, _func);

  getIndexOfObjFromArray_byID = (mArr, id) =>
    findIndex(mArr, item => item.id == id);

  deleteObjectFromArray = (arr, id) => {
    let arrToReturn = arr.filter(a => a.id !== id);
    return arrToReturn;
  };

  deleteObjectFromArrayByInviteId = (arr, invitation_id) => {
    let arrToReturn = arr.filter(a => a.invitation_id !== invitation_id);
    return arrToReturn;
  };
  deleteObjectFromArrayByEmail = (arr, email) => {
    let arrToReturn = arr.filter(a => a.email !== email);
    return arrToReturn;
  };
  getIdsFromArray = mArr => {
    let idsArr = [];
    mArr.map(item => {
      idsArr.push(item.id);
    });
    return idsArr;
  };
  geenrateColor = () => {
    return 'hsla(' + Math.floor(Math.random() * 360) + ', 100%, 70%, 1)';
  };
  async openLink(incomingLink) {
    try {
      const url = incomingLink;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#fff',
          preferredControlTintColor: '#000',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          // toolbarColor: '',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          showInRecents: true,

          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        // Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      console.log('sss', error);
      // Alert.alert(error.message);
    }
  }
}

export default new Util();
