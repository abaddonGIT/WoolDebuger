/**
 * Created by Abaddon on 31.12.2015.
 */
"use strict";
var Utility = {
    /**
     * Create and return node element
     *
     * @param html
     * @returns {*}
     */
    createElement: (html) => {
        var div = document.createElement("div");
        div.innerHTML = html;
        var dom = div.childNodes[0];
        div = null;
        return dom;
    },
    /**
     * Change page favicon
     *
     * @param icon
     */
    changeFavicon: (icon) => {
        var head = document.querySelector("head");
        if (!head) {
            return;
        }
        var favicon = head.querySelector("#favicon");
        if (favicon) {
            favicon.href = icon;
        }
    },
    /**
     * Create date stamp for debug item
     *
     * @returns {string}
     */
    getDate: () => {
        var date = new Date();
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    },
    /**
     * Add animation event listener
     * @param elem
     * @param type
     * @param callback
     * @param remove
     */
    prefixedEvent: function (elem, type, callback, remove) {
        var pfx = ["webkit", ""];
        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) {
                type = type.toLowerCase();
            }
            if (remove) {
                elem.removeEventListener(pfx[p] + type, callback, false);
            } else {
                elem.addEventListener(pfx[p] + type, callback, false);
            }
        }
    },
    /**
     * Check class in element
     * @param cl
     * @param elem
     * @returns {boolean}
     */
    hasClass: (cl, elem) => {
        if (elem) {
            if (elem.classList.contains(cl)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    /**
     * Add class to element
     * @param cl
     * @param elem
     */
    addClass: (cl, elem) => {
        if (elem) {
            elem.classList.add(cl);
            return Utility;
        }
    },
    /**
     * Remove class from element
     * @param cl
     * @param elem
     */
    removeClass: (cl, elem) => {
        if (elem) {
            elem.classList.remove(cl);
            return Utility;
        }
    },
    /**
     * Check string
     * @param str
     */
    isEmpty: (str) => {
        if (str.length) {
            var str = str.trim();
            str = str.replace(/\s{2,}/g, ' ');
            if (str.length) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    timer: null,
    /**
     * Call function after delay
     * @param fn
     * @param delay
     */
    delay: (fn, delay) => {
        clearTimeout(Utility.timer);
        Utility.timer = setTimeout(function () {
            fn();
        }, delay);
    },
    /**
     * Set Editor block
     * @param el
     */
    date: (timestamp) => {
        return new Date(timestamp);
    },

    /**
     * Show success message
     * @param message
     */
    success: (message) => {
        $.jGrowl(message, {theme: 'success'});
    },
    /**
     * Show error message
     * @param message
     */
    error: (message) => {
        $.jGrowl(message, {theme: 'error'});
    },
    /**
     * Show warning message
     * @param message
     */
    warning: (message) => {
        $.jGrowl(message, {theme: 'warning'});
    }
}
export default Utility;