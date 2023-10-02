import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {backgroundColor: Colors.background.primary, flex: 1},

  didNotReceiveCodeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  codeInputStyle: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: Colors.background.tertiary,
    marginRight: 23,
    width: '20%',
    height: 56,
  },

  codeSentMsgContainer: {
    marginTop: 12,
    alignItems: 'center',
    marginHorizontal: 39,
    justifyContent: 'center',
  },

  enterCodeContainer: {
    paddingLeft: 30,
    paddingRight: 24,
    marginTop: 24,
  },
});
