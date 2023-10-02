// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  paymentBox: {
    marginHorizontal: 12,
    marginTop: 30,
  },
  setupPaymentBtn: {
    paddingHorizontal: 10,
    marginTop: 48,
    paddingVertical: 16,
    borderRadius: 10,
    borderColor: Colors.border.quaternary,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  earningBox: {
    shadowColor: '#8a8a8a',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8,
    elevation: 7,
    paddingHorizontal: 22,
    paddingVertical: 24,
    borderRadius: 16,
    marginHorizontal: 8,
    backgroundColor: Colors.background.primary,
    marginBottom: 40,
  },
  weekAct: {
    width: '48%',
  },
  balance: {
    width: '52%',
  },
  bottomLine: {
    marginTop: 25,
    marginBottom: 25,
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    height: 1,
  },
  saleItemContainer: {
    marginBottom: 0,
  },
  saleThumb: {
    backgroundColor: Colors.label.penta,
    borderRadius: 50,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleDetail: {
    flex: 1,
    paddingHorizontal: 15,
  },
  saleAmount: {
    position: 'absolute',
    right: 0,
    top: 7,
  },
});
