//http://10.31.152.19/zhongguancun/php/zgcjk.php

(function () {
    class Zhongguancun {
        constructor() {
            this.xrnr = $('.xrnr')
        }
        init() {
            $ajax({
                url: 'http://10.31.152.19/zhongguancun/php/zgcjk.php',
                dataType: 'json'
            }).then((date) => {
                let xr = '<ul class=xrul>'
                for (let value of date) {
                  xr +=  `
                        <li class=xrli>
                        <img src="${value.picurl}">
                        <a href=# target="_blank" class=wza>${value.title}</a>
                        <p>${value.price}元</p>
                        <a class=ana href=# target="_blank">
                        <span>去看看>
                        </span></a>
                        </li>
                    `;

                };
                xr += '</ul>';
                this.xrnr.innerHTML += xr
            })
        }
    }
    new Zhongguancun().init()
})();