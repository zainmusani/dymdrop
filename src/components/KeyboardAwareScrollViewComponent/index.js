import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollViewComponent = props => (
  <KeyboardAwareScrollView
    ref={props.scrollRef}
    onScroll={props?.onScroll ?? Function()}
    scrollToOverflowEnabled={false}
    showsVerticalScrollIndicator={false}
    onScrollBeginDrag={props?.onScrollBeginDrag ?? Function()}
    onScrollEndDrag={props?.onScrollEndDrag ?? Function()}
    bounces={false}
    behavior={'padding'}
    keyboardShouldPersistTaps="handled"
    enableOnAndroid={true}
    extraHeight={150}
    extraScrollHeight={props?.incomingExtraScrollHeight ?? 30}
    alwaysBounceVertical={false}
    keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
    scrollEnabled={props.scrollEnabled}
    enableAutomaticScroll={true}
    contentContainerStyle={props?.style}
    style={props?.incomingStyle}>
    {props?.children}
  </KeyboardAwareScrollView>
);

export default KeyboardAwareScrollViewComponent;
