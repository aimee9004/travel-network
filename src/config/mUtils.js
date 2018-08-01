
/**
 * 获取 URL 参数
 */
export const getUrlParam = (name) => {
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)"); 
    var r =  window.location.search.substr(1).match(reg);
    var strValue = "";
    if (r!=null){
        strValue= unescape(r[2]);
    }
    return strValue;
}

/**
 * 保留四位小数 向上取整
 */
export const getProperNum =(num) => {
    return Math.ceil(num*10000)/10000
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 
