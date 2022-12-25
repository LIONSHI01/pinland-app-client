export const fetchUser = () => {
  const userInfo =
    JSON.parse(localStorage.getItem('pinland-user')) !== 'undefined'
      ? JSON.parse(localStorage.getItem('pinland-user'))
      : localStorage.clear();

  return userInfo;
};
