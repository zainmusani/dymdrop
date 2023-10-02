import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  paymentBoxContainer: {
    flex: 1,
    marginHorizontal: 21,
    marginTop: 25,
    borderRadius: 16,
    borderWidth: 2,

    paddingLeft: 24,
    paddingRight: 21,
    paddingTop: 20,
    paddingBottom: 34,
    borderColor: Colors.border.quaternary,
  },
  borderLineStyle: {
    borderColor: Colors.border.primary,
    opacity: 0.1,
    borderBottomWidth: 1,
    marginVertical: 24,
    height: 1,
  },

  selectPlanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  offeredItemsSecContainer: {
    flexDirection: 'row',
    marginTop: 17,
    justifyContent: 'space-between',
  },

  selectPlanFirstText: {flexDirection: 'row', alignItems: 'center'},

  selectPlanFirstTextChild: {textAlign: 'auto', top: 2, marginLeft: 7},
  buildYouBrandSecItemsColumn: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },

  buildYourSecItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  buildYourSecItemImageContainer: {
    width: 18,
    height: 18,
    backgroundColor: Colors.background.heca,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  buildYourSecItemImage: {
    width: 9,
    height: 9,
    tintColor: 'white',
    zIndex: 1,
  },
  buildYourSecItemTextContainer: {
    backgroundColor: Colors.background.primary,
    width: 85,
  },
});
