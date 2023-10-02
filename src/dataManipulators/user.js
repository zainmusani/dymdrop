export function manipulateUserData(data) {
  let userObj = {};
  userObj['id'] = data?.id ?? 0;
  userObj['isActive'] = data?.is_active ?? true;
  userObj['email'] = data?.email ?? '';
  userObj['access_token'] = data?.access_token ?? '';
  userObj['refresh_token'] = data?.refresh_token ?? '';
  userObj['isFormSubmitted'] = data?.is_form_submitted ?? false;
  userObj['isUserBlocked'] = data?.is_blocked ?? false;
  userObj['isUserApproved'] = data?.status === 'approved' ? true : false;
  userObj['isTeammate'] = data?.is_invited ?? false;
  userObj['isAccountSetup'] = data?.accountSetup ?? false;

  return userObj;
}
