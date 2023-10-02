// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  BottomSheetComponent,
  Text,
  TextInput,
  CheckBox,
  KeyboardAwareScrollViewComponent,
  ButtonComponent,
} from '../../../components';
import {FREQUENCY_OPTIONS} from '../../../constants';
import {verifyActivationCode} from '../../../actions/PassActivationActions';
import {AppStyles, Colors, Images, Metrics} from '../../../theme';
import util from '../../../util';
import styles from './styles';

function CreateActivation({
  toggle,
  data,
  dataindex,
  title,
  type,
  onSubmit,
  activations,
  newactivations,
}) {
  const dispatch = useDispatch();
  const [onFieldFocus, setOnFieldFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeBottomSheetId, setActiveBottomSheetId] = useState(1);
  const [name, setName] = useState(data?.activationName ?? '');
  const [price, setPrice] = useState(data?.activationPrice.toString() ?? '');
  const [frequency, setFrequency] = useState(
    data?.activationFrequency ?? FREQUENCY_OPTIONS[0].value,
  );
  const [description, setDescription] = useState(
    data?.activationDescription ?? '',
  );
  const [scanLimit, setScanLimit] = useState(data?.activationScanlimit ?? '');
  const [fanLimit, setFanLimit] = useState(data?.activationFanlimit ?? '');
  const [promoCode, setPromoCode] = useState(data?.activationPromocode ?? '');
  const [isGenerateCode, setisGenerateCode] = useState(false);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [frequencyError, setFrequencyError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [scanLimitError, setScanLimitError] = useState('');
  const [fanLimitError, setFanLimitError] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');

  const [nameFocus, setNameFocus] = useState(false);
  const [priceFocus, setPriceFocus] = useState(false);
  const [frequencyFocus, setFrequencyFocus] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);
  const [scanLimitFocus, setScanLimitFocus] = useState(false);
  const [fanLimitFocus, setFanLimitFocus] = useState(false);
  const [promoCodeFocus, setPromoCodeFocus] = useState(false);

  const refRBSheet = useRef(null);
  const bottomRef = useRef(null);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const frequencyRef = useRef(null);
  const descriptionRef = useRef(null);
  const scanLimitRef = useRef(null);
  const fanLimitRef = useRef(null);
  const promoCodeRef = useRef(null);

  const onCloseBottomSheet = () => {
    setNameFocus(false);
    setPriceFocus(false);
    setFrequencyFocus(false);
    setDescriptionFocus(false);
    setScanLimitFocus(false);
    setFanLimitFocus(false);
    setPromoCodeFocus(false);
    setActiveBottomSheetId(null);
    toggle();
  };
  const validation = () => {
    let isValid = true;

    if (promoCode.length < 6 && promoCode.length >= 1) {
      setPromoCodeError('Discount Code cannot be less than 6 characters');
      promoCodeRef?.current?.focus();
      isValid = false;
    }

    if (fanLimit !== 'unlimited' && !util.isNumber(fanLimit)) {
      setFanLimitError('Invalid Format');
      fanLimitRef?.current?.focus();
      isValid = false;
    }

    if (scanLimit !== 'unlimited' && !util.isNumber(scanLimit)) {
      setScanLimitError('Invalid Format');
      scanLimitRef?.current?.focus();
      isValid = false;
    }

    if (!util.isPrice(price)) {
      setPriceError('Invalid Format');
      priceRef?.current?.focus();
      isValid = false;
    }
    // if (util.isEmptyValue(promoCode) || util.isOnlyWhiteSpace(promoCode)) {
    //   setPromoCodeError('Discount Code is required');
    //   promoCodeRef?.current?.focus();
    //   isValid = false;
    // }

    if (util.isEmptyValue(fanLimit) || util.isOnlyWhiteSpace(fanLimit)) {
      setFanLimitError('Fan limit is required');
      fanLimitRef?.current?.focus();
      isValid = false;
    }

    if (util.isEmptyValue(scanLimit) || util.isOnlyWhiteSpace(scanLimit)) {
      setScanLimitError('Voucher quantity is required');
      scanLimitRef?.current?.focus();
      isValid = false;
    }

    if (util.isEmptyValue(description) || util.isOnlyWhiteSpace(description)) {
      setDescriptionError('Description is required');
      descriptionRef?.current?.focus();
      isValid = false;
    }

    if (util.isEmptyValue(price) || util.isOnlyWhiteSpace(price)) {
      setPriceError('Price is required');
      priceRef?.current?.focus();
      isValid = false;
    }

    if (util.isEmptyValue(name) || util.isOnlyWhiteSpace(name)) {
      setNameError('Name is required');
      nameRef?.current?.focus();
      isValid = false;
    }

    return isValid;
  };
  const onSubmitPress = () => {
    // let checkActivations = [...activations, ...newactivations];
    if (validation()) {
      // setIsLoading(true);
      // if (
      //   checkActivations.some(
      //     x => x.activationPromocode === promoCode && x.activationName !== name,
      //   )
      // ) {
      //   setPromoCodeError('Already in use');
      //   promoCodeRef?.current.focus();
      //   setIsLoading(false);
      // } else {
      //   let payload = {code: promoCode, voucher_id: data?.id};
      //   dispatch(
      //     verifyActivationCode(payload, res => {
      //       setIsLoading(false);
      //       if (!res.status) {
      //         setPromoCodeError(res.message);
      //         promoCodeRef?.current.focus();
      //       } else {
      let payload = {
        id: data?.id,
        activationName: name,
        activationPrice: price,
        activationFrequency: frequency,
        activationDescription: description,
        activationScanlimit: scanLimit,
        activationFanlimit: fanLimit,
        activationPromocode: promoCode,
        activationPublished: data?.activationPublished ?? 0,
      };
      setNameFocus(false);
      setPriceFocus(false);
      setFrequencyFocus(false);
      setDescriptionFocus(false);
      setScanLimitFocus(false);
      setFanLimitFocus(false);
      setPromoCodeFocus(false);
      // setActiveBottomSheetId(null);
      onSubmit(payload, dataindex);
      // toggle();
      // }
      //   }),
      // );
      // }
    }
  };

  function inputValidation(title, option, errorFunc, price, number, code) {
    if (!code && util.isEmptyValue(option)) {
      errorFunc(
        `${title.charAt(0).toUpperCase() + title.slice(1)} is required`,
      );
    } else if (!code && util.isOnlyWhiteSpace(option)) {
      errorFunc(`Invalid ${title}`);
    } else if (price && !util.isPrice(option)) {
      errorFunc(`Invalid ${title}`);
    } else if (number && option !== 'unlimited') {
      if (!util.isNumber(option)) {
        errorFunc(`Invalid ${title}`);
      }
    } else if (code && option.length < 6 && option.length >= 1) {
      errorFunc(`${title} cannot be less than 6 characters`);
    } else {
      errorFunc('');
    }
  }
  useEffect(() => {
    // bottomRef?.current?.scrollToEnd({animated: false});
    // setOnFieldFocus(true);
  }, []);
  useEffect(() => {
    if (util.isFieldNil(activeBottomSheetId)) {
      refRBSheet?.current?.snapTo(1);
    } else {
      refRBSheet?.current?.snapTo(0);
    }
  }, [activeBottomSheetId]);

  useEffect(() => {
    if (onFieldFocus) {
      if (util.isPlatformAndroid()) {
        bottomRef?.current?.scrollToFocusedInput(0, 30, 15);
      }
    }
  }, [onFieldFocus]);

  const inputRender = () => (
    <View style={[AppStyles.pTop25, styles.pageBottomSheetMargins]}>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5]}>
        <TextInput
          autoFocus={nameFocus}
          label="Name"
          placeholder="10-And-0"
          maxLength={72}
          autoCapitalize="none"
          labelColor={Colors.black}
          labelType={'semiBold'}
          value={name}
          ref={nameRef}
          keyboardType="text"
          onSubmitEditing={() => {
            inputValidation('name', name, setNameError);
            setNameFocus(false);
            priceRef?.current.focus();
          }}
          rightIcon={util.isEmptyValue(name) ? null : Images.CrossIcon}
          onPress={() => {
            setName('');
            nameRef?.current?.focus?.();
            setNameFocus(false);
            setPriceFocus(true);
          }}
          error={nameError}
          onChangeText={val => {
            if (!/^\s/.test(val)) {
              setName(val);
            }
          }}
          onBlur={() => {
            inputValidation('name', name, setNameError);
            setNameFocus(false);
            setPriceFocus(true);
            nameRef?.current?.blur?.();
          }}
        />
        <Text style={styles.lengthStl}>{name.length} / 72</Text>
      </View>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5, {width: '50%'}]}>
        <TextInput
          autoFocus={priceFocus}
          label="Price"
          placeholder="$65"
          autoCapitalize="none"
          maxLength={6}
          labelColor={Colors.black}
          labelType={'semiBold'}
          value={price}
          ref={priceRef}
          keyboardType={util.isPlatformAndroid() ? 'number-pad' : 'decimal-pad'}
          onSubmitEditing={() => {
            inputValidation('price', price, setPriceError, true);
            setPriceFocus(false);
          }}
          // rightIcon={Images.CrossIcon}
          onPress={() => {
            setPrice('');
            nameRef?.current?.focus?.();
            setPriceFocus(false);
          }}
          error={priceError}
          onChangeText={val => {
            if (
              !val.includes('-') &&
              val !== '0' &&
              val.split('.').length !== 3
            ) {
              setPrice(val);
            }
          }}
          onBlur={() => {
            inputValidation('price', price, setPriceError, true);
            setPriceFocus(false);
            priceRef?.current?.blur?.();
          }}
        />
      </View>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5]}>
        <Text style={styles.title} type="semiBold">
          Frequency
        </Text>
        <View style={styles.frequencyWrapper}>
          {FREQUENCY_OPTIONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setFrequency(item.value);
              }}
              style={[
                styles.frequencyItem,
                frequency === item.value && styles.activeFrequencyItem,
              ]}>
              <Text style={styles.frequencyItemText}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5]}>
        <TextInput
          autoFocus={descriptionFocus}
          multiline
          label="Description"
          maxLength={1500}
          placeholder="Enter Description"
          autoCapitalize="none"
          labelColor={Colors.black}
          labelType={'semiBold'}
          value={description}
          ref={descriptionRef}
          keyboardType="text"
          onSubmitEditing={() => {
            inputValidation('description', description, setDescriptionError);
            setDescriptionFocus(false);
            scanLimitRef?.current.focus();
          }}
          onPress={() => {
            setDescription('');
            descriptionRef?.current?.focus?.();
          }}
          error={descriptionError}
          onChangeText={val => {
            if (!/^\s/.test(val)) {
              setDescription(val);
            }
          }}
          onBlur={() => {
            inputValidation('description', description, setDescriptionError);
            descriptionRef?.current?.blur?.();
          }}
        />
        <Text style={styles.lengthStl}>{description.length} / 1500</Text>
      </View>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5]}>
        <Text style={styles.title} type="semiBold">
          Voucher Quantity
        </Text>
        <Text style={styles.description}>
          Number of QR scans allowed each billing period
        </Text>
        <View style={styles.fieldWrapper}>
          <View style={styles.leftField}>
            <TextInput
              disabled={scanLimit === 'unlimited'}
              autoFocus={scanLimitFocus}
              maxLength={5}
              placeholder={scanLimit === 'unlimited' ? '' : '10'}
              autoCapitalize="none"
              leftIcon={Images.QRIcon}
              value={scanLimit === 'unlimited' ? '' : scanLimit}
              ref={scanLimitRef}
              keyboardType="number-pad"
              onSubmitEditing={() => {
                inputValidation(
                  'voucher quantity',
                  scanLimit,
                  setScanLimitError,
                  false,
                  true,
                );
                setScanLimitFocus(false);
                fanLimitRef?.current.focus();
              }}
              error={scanLimitError}
              onChangeText={val => {
                if (!val.includes('-') && val !== '0' && !val.includes('.')) {
                  setScanLimit(val);
                }
              }}
              onBlur={() => {
                inputValidation(
                  'scan limit',
                  scanLimit,
                  setScanLimitError,
                  false,
                  true,
                );
                scanLimitRef?.current?.blur?.();
              }}
            />
            {scanLimit === 'unlimited' && (
              <Image source={Images.Infinity} style={styles.infinityStyle} />
            )}
          </View>
          <View style={styles.rightfield}>
            <CheckBox
              onPressAction={() => {
                setScanLimit(scanLimit === 'unlimited' ? '' : 'unlimited');
              }}
              isChecked={scanLimit === 'unlimited'}
            />
            <Text style={styles.checkboxContent}>Unlimited</Text>
          </View>
        </View>
      </View>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5]}>
        <Text style={styles.title} type="semiBold">
          Fan Limit
        </Text>
        <Text style={styles.description}>
          Number of fans that can buy this activation level
        </Text>
        <View style={styles.fieldWrapper}>
          <View style={styles.leftField}>
            <TextInput
              disabled={fanLimit === 'unlimited'}
              autoFocus={fanLimitFocus}
              maxLength={5}
              placeholder={fanLimit === 'unlimited' ? '' : '10'}
              autoCapitalize="none"
              leftIcon={Images.FanLimit}
              largeIcon={true}
              value={fanLimit === 'unlimited' ? '' : fanLimit}
              ref={fanLimitRef}
              keyboardType="number-pad"
              onSubmitEditing={() => {
                inputValidation(
                  'fan limit',
                  fanLimit,
                  setFanLimitError,
                  false,
                  true,
                );
                setFanLimitFocus(false);
                promoCodeRef?.current.focus();
              }}
              error={fanLimitError}
              onChangeText={val => {
                if (!val.includes('-') && val !== '0' && !val.includes('.')) {
                  setFanLimit(val);
                }
              }}
              onBlur={() => {
                inputValidation(
                  'fan limit',
                  fanLimit,
                  setFanLimitError,
                  false,
                  true,
                );
                fanLimitRef?.current?.blur?.();
              }}
            />
            {fanLimit === 'unlimited' && (
              <Image source={Images.Infinity} style={styles.infinityStyle} />
            )}
          </View>
          <View style={styles.rightfield}>
            <CheckBox
              onPressAction={() => {
                setFanLimit(fanLimit === 'unlimited' ? '' : 'unlimited');
              }}
              isChecked={fanLimit === 'unlimited'}
            />
            <Text style={styles.checkboxContent}>Unlimited</Text>
          </View>
        </View>
      </View>
      <View style={[AppStyles.pBottom20, AppStyles.mBottom5]}>
        <Text style={styles.title} type="semiBold">
          Discount Code
        </Text>
        <Text style={styles.description}>
          Enter a discount code used to redeem this voucher
        </Text>
        <View style={styles.fieldWrapper}>
          <View style={styles.leftField}>
            <TextInput
              // disabled={isGenerateCode}
              autoFocus={promoCodeFocus}
              maxLength={6}
              placeholder="Enter"
              autoCapitalize="characters"
              leftIcon={Images.PromoCode}
              largeIcon={true}
              value={promoCode}
              ref={promoCodeRef}
              keyboardType="text"
              onSubmitEditing={() => {
                inputValidation(
                  'Discount code',
                  promoCode,
                  setPromoCodeError,
                  false,
                  false,
                  true,
                );
                setPromoCodeFocus(false);
                // promoCodeRef?.current.focus();
              }}
              error={promoCodeError}
              onChangeText={val => {
                if (!/^\s/.test(val)) {
                  setPromoCode(val);
                  setisGenerateCode(false);
                }
              }}
              onBlur={() => {
                inputValidation(
                  'Discount code',
                  promoCode,
                  setPromoCodeError,
                  false,
                  false,
                  true,
                );
                promoCodeRef?.current?.blur?.();
              }}
            />
          </View>
          <View style={styles.rightfield}>
            <CheckBox
              onPressAction={() => {
                if (!isGenerateCode) {
                  setPromoCode(util.generateCode());
                }
                setisGenerateCode(!isGenerateCode);
              }}
              isChecked={isGenerateCode}
            />
            <Text style={styles.checkboxContent}>Generate</Text>
          </View>
        </View>
      </View>
    </View>
  );
  const buttonRender = () => (
    <ButtonComponent
      text={type === 'create' ? 'CREATE' : 'UPDATE'}
      top={10}
      hasExtraText={true}
      action={() => onSubmitPress()}
      isBtnDisabled={isLoading}
      isLoading={isLoading}
    />
  );
  const bottomSheetHeader = () => (
    <View
      onTouchEnd={() => {
        //refRBSheet?.current?.snapTo(0);
      }}
      style={[
        {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingTop: 20,
          borderWidth: 0,
          marginBottom: -1,
        },
        styles.pageBottomSheetMargins,
        styles.headerContainer,
        styles.aligningItemsStyle,
        {width: Metrics.screenWidth},
      ]}>
      <View style={styles.topNotchBottomSheet}></View>
      <Text size={24} type="bold">
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          toggle();
          // setOnFieldFocus(false);
          onCloseBottomSheet();
        }}>
        <Image source={Images.CircleCrossIcon} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );

  const bottomSheetView = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.background.primary,
        }}>
        <View
          style={[styles.bottomBorderStyle, {marginRight: 24, marginLeft: 24}]}
        />
        <KeyboardAwareScrollViewComponent
          scrollRef={bottomRef}
          scrollEnabled={true}
          incomingExtraScrollHeight={util.isPlatformAndroid() ? 30 : 50}
          onScrollBeginDrag={() => {
            refRBSheet?.current?.snapTo(0);
          }}
          style={{
            backgroundColor: Colors.background.primary,
            paddingBottom: 50,
            flexGrow: 1,
            zIndex: 999,
          }}
          incomingStyle={{
            height: '100%',
            width: '100%',
          }}>
          <View>
            {inputRender()}
            {buttonRender()}
          </View>
        </KeyboardAwareScrollViewComponent>
      </View>
    );
  };
  return (
    <View style={styles.bottomSheetContainer}>
      <BottomSheetComponent
        refRBSheet={refRBSheet}
        renderViewHeader={bottomSheetHeader}
        renderView={bottomSheetView}
        activeBottomSheetId={activeBottomSheetId}
        onBottomSheetClose={onCloseBottomSheet}
        removeSheet={() => {
          onCloseBottomSheet();
        }}
      />
    </View>
  );
}

CreateActivation.propTypes = {
  activations: PropTypes.array,
  newactivations: PropTypes.array,
  toggle: PropTypes.func,
  onSubmit: PropTypes.func,
};

CreateActivation.defaultProps = {
  activations: [],
  newactivations: [],
  toggle: Function(),
  onSubmit: Function(),
};

const mapStateToProps = ({passActivations}) => ({
  activations: passActivations.activations,
  newactivations: passActivations.newActivations,
});

const actions = {};

export default connect(mapStateToProps, actions)(CreateActivation);
