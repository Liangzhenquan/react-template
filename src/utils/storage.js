/*
 * @Description:
 * @Autor: liang
 * @Date: 2020-05-28 15:05:21
 * @LastEditors: liang
 * @LastEditTime: 2020-05-29 09:45:51
 */
const storageKeys = {
  token: 'token'
};
const getStorage = (key, storageType = 'local') => {
  try {
    if (key === undefined) {
      throw new Error('key is not defined');
    }
    let value =
      storageType === 'session'
        ? sessionStorage.getItem(key)
        : localStorage.getItem(key);
    return JSON.parse(value);
  } catch (err) {
    console.log(err);
  }
};
const setStorage = (key, value, storageType = 'local') => {
  try {
    if (key === undefined || value === undefined) {
      throw new Error('key or value is not defined');
    }
    let formateValue = JSON.stringify(value);
    storageType === 'session'
      ? sessionStorage.setItem(key, formateValue)
      : localStorage.setItem(key, formateValue);
    return true;
  } catch (err) {
    console.log(err);
  }
};
export { getStorage, setStorage, storageKeys };
