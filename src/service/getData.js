import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
let envBaseUrl = ''
if (process.env.NODE_ENV == 'development') {
	envBaseUrl = '/api'
}else if(process.env.NODE_ENV == 'production'){
	envBaseUrl = ''
}

// test
export const testjj = (platform, curVersion) => fetch(envBaseUrl+'/appBase/checkAppVersion', { platform, curVersion }, 'POST');
export const testjj2 = (parentId, sameLevel) => fetch(envBaseUrl+'/appArticle/areaList', { parentId, sameLevel }, 'POST');

// list-QC
export const listQc = (token) => fetch(envBaseUrl+'/exchange/assetParsList', { accessToken: token }, 'POST');

// buy-sell 
export const assetOrderDeepInfo = (token, assetId, type) => fetch(envBaseUrl+'/exchange/assetOrderDeepInfo', { accessToken: token, assetId, type }, 'POST');
export const myCurOrders = (token, assetId, type) => fetch(envBaseUrl+'/exchange/myCurOrders', { accessToken: token, assetId, type }, 'POST');
export const myDealOrders = (token, assetId, type) => fetch(envBaseUrl+'/exchange/myDealOrders', { accessToken: token, assetId, type }, 'POST');
export const addBuy = (token, assetId, price, amount) => fetch(envBaseUrl+'/exchange/addBuy', { accessToken: token, assetId, price, amount }, 'POST');
export const addSell = (token, assetId, price, amount) => fetch(envBaseUrl+'/exchange/addSell', { accessToken: token, assetId, price, amount }, 'POST');
export const paymentLink = (token, assetUId, amount, memo) => fetch(envBaseUrl+'/exchange/paymentLink', { accessToken: token, assetUId, amount, memo }, 'POST');
export const assetCurInfo = (token, assetId) => fetch(envBaseUrl+'/exchange/assetCurInfo', { accessToken: token, assetId }, 'POST');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
