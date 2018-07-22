import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

let accessToken = 'c0RFeGNMcXBySDJkL2xmTjFSaUlTdjlNNlB0ZTV4MnlFVDZSV05KdWdFTUd1ZG83SHJ6WlJYNGo3TTJlS0svc2tsaEJMRVFKbEVvTG1ab1RsbHo5S2Z1ZElRT3dwT1FQeUl2K1hWWk44TWJtYUZmaDNVUlZQUWZqTVlZWlhIWHJ5QVFES2VCVno2bE5tZWJjbFp0WWltRTRkMjZJTVRnZUp2YTVGa3BxRnhvPQ==';


// test
export const testjj = (platform, curVersion) => fetch('/api/appBase/checkAppVersion', { platform, curVersion }, 'POST');
export const testjj2 = (parentId, sameLevel) => fetch('/api/appArticle/areaList', { parentId, sameLevel }, 'POST');

// list-QC
export const listQc = () => fetch('/api/exchange/assetParsList', { accessToken: accessToken }, 'POST');

// buy-sell 
export const buySellList = (assetId, type) => fetch('/api/exchange/assetOrderDeepInfo', { accessToken: accessToken, assetId, type }, 'POST');
export const currentOrder = (assetId, type) => fetch('api/exchange/myCurOrders', { accessToken: accessToken, assetId, type }, 'POST');
export const dealOrder = (assetId, type) => fetch('api/exchange/myDealOrders', { accessToken: accessToken, assetId, type }, 'POST');
export const addBuy = (assetId, price, amount) => fetch('api/exchange/addBuy', { accessToken: accessToken, assetId, price, amount }, 'POST');
export const addSell = (assetId, price, amount) => fetch('api/exchange/addSell', { accessToken: accessToken, assetId, price, amount }, 'POST');

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
