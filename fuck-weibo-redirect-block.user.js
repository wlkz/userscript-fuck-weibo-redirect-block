// ==UserScript==
// @name         自动跳转微博短链接
// @version      0.1.1
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

    function processer0() {
        // match '如需浏览，请长按网址复制后使用浏览器访问' page
        var targetElement = document.getElementsByClassName('link')[0];
        if (targetElement !== undefined) {
            var targetLink = targetElement.textContent;
            if (targetLink) {
                var p = document.createElement("p");
                p.textContent = 'redirect to target page, please wait.'
                document.getElementsByClassName('wrap')[0].append(p);
                setTimeout(redirectTo, 1000, targetLink);
                return true;
            }
        }
        return false;
    }

    function processer1() {
        // match '警告：访问的网址可能存在风险' page
        var targetElement = document.getElementsByClassName('url_view_code')[0];
        if (targetElement !== undefined) {
            var targetLink = targetElement.textContent;
            if (targetLink) {
                var p = document.createElement("p");
                p.textContent = 'redirect to target page, please wait.'
                p.classList.add('normal_note');
                document.getElementsByClassName('link_quality_note')[0].append(p);
                setTimeout(redirectTo, 1000, targetLink);
                return true;
            }
        }
        return false; 
    }

    var processers = [processer0, processer1];
    for (var i = 0; i < processers.length; i++) {
        if (processers[i]()) {
            return;
        }
    }
})();