// ==UserScript==
// @name         自动跳转微博短链接
// @version      0.1.0
// @author       wlkz
// @description  fuck weibo url shorter service (t.cn) redirect blocking page, and redirect to target page automatically.
// @homepage     https://github.com/wlkz/userscript-fuck-weibo-redirect-block
// @supportURL   https://github.com/wlkz/userscript-fuck-weibo-redirect-block/issues
// @match        *://t.cn/*
// @grant        none
// @run-at       document-end
// @license MIT
// @namespace https://github.com/wlkz/userscript-fuck-weibo-redirect-block
// ==/UserScript==

(function () {
    'use strict';
    function redirectTo(url) {
        location.replace(url);
    }

    var targetElement = document.getElementsByClassName('link')[0];
    if (targetElement !== undefined) {
        var targetLink = targetElement.textContent;
        if (targetLink) {
            var p = document.createElement("p");
            p.textContent = 'redirect to target page, please wait.'
            document.getElementsByClassName('wrap')[0].append(p);
            setTimeout(redirectTo, 1000, targetLink);
            return;
        }
    }
})();