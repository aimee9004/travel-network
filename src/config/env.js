/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
import { getUrlParam } from './mUtils'

let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
	imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){
	if(getUrlParam('apiUrl')==='') {
		baseUrl = localStorage.getItem('apiUrl') || 'https://www.travel-network.xin/mixin-apis'
	}else {
		baseUrl = getUrlParam('apiUrl')
	}
	// baseUrl = 'https://www.travel-network.xin/mixin-apis';
	imgBaseUrl = '//https://www.travel-network.xin/mixin-apis/img/';
}




export {
	baseUrl,
	routerMode,
	imgBaseUrl
}
