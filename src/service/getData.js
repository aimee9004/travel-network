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

// debug to server
export const debugReport = (act, pars, returnData, otherData) => fetch(envBaseUrl+'/appBase/debugReport', { act, pars, returnData, otherData }, 'POST');

// list-QC
export const listQc = (token) => fetch(envBaseUrl+'/exchange/assetParsList', { accessToken: token }, 'POST');

// buy-sell 
export const assetOrderDeepInfo = (token, assetId, type) => fetch(envBaseUrl+'/exchange/assetOrderDeepInfo', { accessToken: token, assetId, type }, 'POST');
export const myCurOrders = (token, assetId, type) => fetch(envBaseUrl+'/exchange/myCurOrders', { accessToken: token, assetId, type }, 'POST');
export const myDealOrders = (token, assetId, type) => fetch(envBaseUrl+'/exchange/myDealOrders', { accessToken: token, assetId, type }, 'POST');
export const addBuy = (token, assetPairId, price, amount) => fetch(envBaseUrl+'/exchange/addBuy', { accessToken: token, assetPairId, price, amount }, 'POST');
export const addSell = (token, assetPairId, price, amount) => fetch(envBaseUrl+'/exchange/addSell', { accessToken: token, assetPairId, price, amount }, 'POST');
export const paymentLink = (token, assetUId, amount, memo, otherData) => fetch(envBaseUrl+'/exchange/paymentLink', { accessToken: token, assetUId, amount, memo, otherData }, 'POST');
export const assetCurInfo = (token, assetId) => fetch(envBaseUrl+'/exchange/assetCurInfo', { accessToken: token, assetId }, 'POST');
export const cancelSellOrder = (token, orderUid, memberId) => fetch(envBaseUrl+'/exchange/cancelSellOrder', { accessToken: token, orderUid, memberId }, 'POST');
export const cancelBuyOrder = (token, orderUid, memberId) => fetch(envBaseUrl+'/exchange/cancelBuyOrder', { accessToken: token, orderUid, memberId }, 'POST');

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
