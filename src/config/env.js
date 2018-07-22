/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl = '';
let accessToken = 'c0RFeGNMcXBySDJkL2xmTjFSaUlTdjlNNlB0ZTV4MnlFVDZSV05KdWdFTUd1ZG83SHJ6WlJYNGo3TTJlS0svc2tsaEJMRVFKbEVvTG1ab1RsbHo5S2Z1ZElRT3dwT1FQeUl2K1hWWk44TWJtYUZmaDNVUlZQUWZqTVlZWlhIWHJ5QVFES2VCVno2bE5tZWJjbFp0WWltRTRkMjZJTVRnZUp2YTVGa3BxRnhvPQ==';


if (process.env.NODE_ENV == 'development') {
	imgBaseUrl = '/img/';
	// baseUrl = 'https://www.travel-network.xin/mixin-apis'

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '//elm.cangdu.org';
    imgBaseUrl = '//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	accessToken
}