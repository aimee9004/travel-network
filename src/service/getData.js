import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


// test
export const testjj = (platform, curVersion) => fetch('/api/appBase/checkAppVersion', { platform, curVersion }, 'POST');
export const testjj2 = (parentId, sameLevel) => fetch('/api/appArticle/areaList', { parentId, sameLevel }, 'POST');

// list-QC
export const listQc = (accessToken) => fetch('/api/exchange/assetParsList', { accessToken }, 'POST');

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
