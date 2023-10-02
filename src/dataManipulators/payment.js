import util from '../util';

export function manipulatePaymentDetails(data) {
  console.log('obaidddd', data);
  let paymentObj = {};
  paymentObj['status'] = data?.paymentStatus ?? false;
  // paymentObj['balance'] = util.isFieldNil(data?.totalEarning)
  //   ? 0
  //   : data?.totalEarning >= 1
  //   ? parseFloat(data?.totalEarning).toFixed(2)
  //   : parseInt(data?.totalEarning);
  paymentObj['availableBalance'] = util.isFieldNil(data?.available_amount)
    ? 0
    : data?.available_amount;
  paymentObj['balance'] = util.isFieldNil(data?.stripe_balance)
    ? 0
    : data?.stripe_balance;
  paymentObj['soldActivations'] = data?.weeklyActivations ?? 0;
  paymentObj['recentSales'] = util.isArrayOrObjEmpty(data?.recent_sales)
    ? []
    : manipulateSalesData(data?.recent_sales);

  return paymentObj;
}

export function manipulateSalesData(list) {
  let recentSale = [];
  list.forEach((data, index) => {
    let saleObj = {};
    saleObj['title'] = `${data?.first_name ?? ''} ${data?.last_name ?? ''}`;
    saleObj['thumb'] =
      util.isFieldNil(data?.avatar) || util.isEmptyValue(data?.avatar)
        ? null
        : data?.avatar;
    saleObj['amount'] = data?.activation_price ?? 0;
    saleObj['time'] = data?.createdAt ?? Date();
    recentSale.push(saleObj);
  });
  return recentSale;
}
