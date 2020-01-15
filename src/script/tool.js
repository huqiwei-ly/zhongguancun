//1.封装函数获取任意css的属性值。
function getStyle(obj, attr) {
    if (window.getComputedStyle) { //标准
        return window.getComputedStyle(obj)[attr];
    } else { //IE
        return obj.currentStyle[attr];
    }
}

//2.随机数如何设定范围（封装函数）
function rannum(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}

//3.获取元素
function $(selector, all) {
    if (all === true) {
        return document.querySelectorAll(selector);
    } else {
        return document.querySelector(selector);
    }
}
//4.缓冲运动
function bufferMove(obj, json, fn) { //fn:回调函数
    let speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let flag = true;
        for (let attr in json) {
            let currentValue = null;
            if (attr === 'opacity') {
                currentValue = Math.round(getStyle(obj, attr) * 100);
            } else {
                currentValue = parseInt(getStyle(obj, attr));
            }
            speed = (json[attr] - currentValue) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (currentValue !== json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (currentValue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentValue + speed) + ')';
                } else {
                    obj.style[attr] = currentValue + speed + 'px';
                }
                flag = false;
            }

        }
        if (flag === true) {
            clearInterval(obj.timer);
            //继续运动
            fn && typeof fn === 'function' && fn();
        }
    }, 10);
}
//5.ajax方法
function objtostring(obj) {
    if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
        let objarr = [];
        for (let attr in obj) {
            objarr.push(attr + '=' + obj[attr]);
        }
        return objarr.join('&');
    } else {
        throw new Error('请输入对象');
    }

}

function $ajax(option) {
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        option.type = option.type || 'get';
        if (!option.url) {
            throw new Error('请输入接口地址');
        }
        if (option.data && Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') {
            option.data = objtostring(option.data);
        }
        if (option.data && option.type == 'get') {
            option.url += '?' + option.data;
        }
        if (option.async === 'false' || option.async === false) {
            option.async = false;
        } else {
            option.async = true;
        }
        ajax.open(option.type, option.url, option.async);
        if (option.data && option.type == 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }
        if (option.async) {
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        let data = ajax.responseText;
                        if (option.dataType === 'json') {
                            data = JSON.parse(data);
                        }
                        resolve(data);
                    } else {
                        reject('接口地址不存在');
                    }
                }
            }
        } else {
            if (ajax.status === 200) {
                let data = ajax.responseText;
                if (option.dataType === 'json') {
                    data = JSON.parse(data);
                }
                resolve(data);
            } else {
                reject('接口地址不存在');
            }
        }
    });
    return promise; //一定要返回promise对象。
}

//6.cookie的应用
let cookie = {
    add: function (key, value, days) {
        let d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + d;
    },
    get: function (key) {
        let cookiearr = decodeURIComponent(document.cookie).split('; ');
        for (let value of cookiearr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    },
    del: function (key) {
        cookie.add(key, '', -1);
    }
}