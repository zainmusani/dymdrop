import util from '../util';

export function manipulatePassData(data) {
  let pageObj = {};
  pageObj['id'] = data?.id ?? Math.random(10);
  pageObj['activationName'] = data?.activationName ?? 'Activation Name';
  pageObj['activationPrice'] = data?.activationPrice ?? 0;
  pageObj['activationFrequency'] = data?.activationFrequency ?? '';
  pageObj['activationDescription'] = data?.activationDescription ?? '';
  pageObj['activationScanlimit'] = data?.activationScanlimit ?? 0;
  pageObj['activationFanlimit'] = data?.activationFanlimit ?? 0;
  pageObj['activationPromocode'] = data?.activationPromocode ?? 0;
  pageObj['activationPublished'] = data?.activationPublished ?? 0;
  pageObj['isPurchased'] = data?.isPurchased ?? false;

  return pageObj;
}

export function getPassListManipulator(list) {
  if (util.isArrayOrObjEmpty(list)) return [];

  let pagesList = [];

  list?.forEach((item, index) => {
    pagesList.push(manipulatePassData(item));
  });
  return pagesList;
}

export function manipulatePageActivationData(data) {
  let pageObj = {};
  pageObj['id'] = data?.id ?? Math.random(10);
  pageObj['activationId'] = data?.activationId ?? Math.random(10);
  pageObj['activationName'] = data?.activationName ?? 'Activation Name';
  pageObj['activationPrice'] = data?.activationPrice ?? 0;
  pageObj['activationFrequency'] = data?.activationFrequency ?? '';
  pageObj['activationDescription'] = data?.activationDescription ?? '';
  pageObj['activationScanlimit'] = data?.activationScanlimit ?? 0;
  pageObj['activationFanlimit'] = data?.activationFanlimit ?? 0;
  pageObj['activationPromocode'] = data?.activationPromocode ?? 0;
  pageObj['activationPageName'] = data?.activationPageName ?? 'Page Name';
  pageObj['activationPageImage'] = data?.activationPageImage ?? '';
  pageObj['activationTime'] = data?.activationTime ?? Date();
  pageObj['activationStatus'] = data?.activationStatus ?? false;
  pageObj['isSubscribed'] = data?.isSubscribed ?? false;
  pageObj['purchaseId'] = data?.purchaseId ?? '';
  pageObj['pageId'] = data?.pageId ?? 0;
  pageObj['isExpire'] = data?.isExpire ?? false;

  return pageObj;
}

export function getPageActivationListManipulator(list) {
  if (util.isArrayOrObjEmpty(list)) return [];

  let pagesList = [];

  list.forEach((item, index) => {
    pagesList.push(manipulatePageActivationData(item));
  });
  return pagesList;
}
