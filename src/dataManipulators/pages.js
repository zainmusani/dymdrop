import util from '../util';

export function manipulatePageData(data) {
  let pageObj = {};
  pageObj['id'] = data?.id ?? Math.random(10);
  pageObj['imageId'] = data?.image_id ?? Math.random(10);
  pageObj['members'] = data?.members ?? 0;
  pageObj['isInvited'] = data?.invited_page ?? false;
  pageObj['imagePreview'] = data?.screenshot ?? '';
  pageObj['isPublished'] = !util.isFieldNil(data?.is_published)
    ? data?.is_published
    : false;
  pageObj['passenable'] = !util.isFieldNil(data?.passenable)
    ? data?.passenable
    : false;
  pageObj['performance'] =
    util.isFieldNil(data?.performance) || util.isEmptyValue(data?.performance)
      ? {}
      : manipulatePerformanceData(data?.performance);
  pageObj['topAttendence'] = util.isArrayOrObjEmpty(data?.top_attendence)
    ? []
    : manipulateAttendanceData(data?.top_attendence);
  return pageObj;
}

export function manipulateAttendanceData(list) {
  let pageAttendance = [];
  list.forEach((data, index) => {
    let attObj = {};
    attObj['events'] = data?.qr_code_usage ?? 0;
    attObj['title'] = `${data?.user?.first_name ?? ''} ${
      data?.user?.last_name ?? ''
    }`;
    attObj['thumb'] =
      util.isFieldNil(data?.user?.image_url) ||
      util.isEmptyValue(data?.user?.image_url)
        ? null
        : data?.user?.image_url;
    attObj['activationName'] = data?.activation?.activation_name ?? '';
    pageAttendance.push(attObj);
  });
  return pageAttendance;
}
export function manipulatePerformanceData(data) {
  let perfObj = {};
  perfObj['id'] = data?.id ?? 0;
  perfObj['title'] = data?.title ?? '';

  perfObj['clicks'] = data?.clicks ?? 0;
  perfObj['views'] = data?.views ?? 0;
  perfObj['publishDate'] = data?.published_at ?? '';
  perfObj['links'] = data?.links ?? [];
  perfObj['imagePreview'] = data?.screenshot ?? '';

  return perfObj;
}

export function manipulatePageDetails(data) {
  let pageDetailsObj = {};
  pageDetailsObj['id'] = data?.id ?? Math.random(10);
  pageDetailsObj['title'] = data?.title ?? '';
  pageDetailsObj['image'] = data?.image ?? '';
  pageDetailsObj['url'] = data?.url ?? '';
  pageDetailsObj['passenable'] = data?.passenable ?? false;
  pageDetailsObj['imageType'] = data?.image_type ?? '';
  pageDetailsObj['description'] = data?.description ?? '';
  pageDetailsObj['members'] = data?.members ?? 0;
  pageDetailsObj['isInvited'] = data?.invited_page ?? false;
  pageDetailsObj['contactOptions'] = data?.contact_buttons ?? {};
  pageDetailsObj['isPublished'] = !util.isFieldNil(data?.is_published)
    ? data?.is_published
    : false;

  pageDetailsObj['isInitiallyPublished'] =
    util.isFieldNil(data?.performance) || util.isEmptyValue(data?.performance)
      ? false
      : true;
  pageDetailsObj['links'] = util.isArrayOrObjEmpty(data?.links)
    ? []
    : manipulateLinksData(data?.links);
  pageDetailsObj['isPurchased'] = data?.isPurchased ?? false;
  pageDetailsObj['isActivePass'] = data?.perfect_pass ?? false;
  pageDetailsObj['publishedActivation'] = data?.active_activations ?? 0;

  return pageDetailsObj;
}

const manipulateLinksData = list => {
  let pageLinkList = [];

  list.forEach((data, index) => {
    let pageLink = {};
    pageLink['id'] = data?.id ?? Math.random(10);
    pageLink['title'] = data?.title ?? '';
    pageLink['description'] = data?.description ?? '';
    pageLink['image'] = {
      image: data?.thumbnail ?? 'abc.com',
      type: data?.type ?? 'jpeg',
    };
    pageLink['viewType'] =
      util.isFieldNil(data?.position) || util.isEmptyValue(data?.position)
        ? 'left'
        : data?.position;

    pageLink['showThumbnail'] = !util.isFieldNil(data?.show_thumbnail)
      ? data?.show_thumbnail
      : false;
    pageLink['actionTitle'] = data?.action?.text ?? 'Go';
    pageLink['link'] = data?.action?.url ?? 'https://fast.com/';
    pageLink['linkHeight'] = data?.link_height ?? 200;

    pageLinkList.push(pageLink);
  });
  return pageLinkList;
};

export function getPagesListManipulator(list) {
  if (util.isArrayOrObjEmpty(list)) return [];
  let pagesList = [];

  list.forEach((item, index) => {
    pagesList.push(manipulatePageData(item));
  });
  return pagesList;
}
