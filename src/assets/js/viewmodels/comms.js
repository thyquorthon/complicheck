var vm = vm || {};
(function (vm, $) {
    "use strict";
    /*global $, jQuery, ko*/
    vm.comms = (function () {
        var ajaxGet = function (method, data, query, useBaseUrl, async) {

            var url = concatUrl(method);

            if (query) {
                url = url + "?" + query;
            }
            var isAsync = true;
            if (typeof async !== "undefined") isAsync = async;

            return $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                data: data,
                async: isAsync,
                useBaseUrl: useBaseUrl,
                xhrFields: { withCredentials: true}
            });
        },
        ajaxPost = function (method, data) {
            var url = concatUrl(method);

            return $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: data,
                xhrFields: {
                   withCredentials: true
                }
            });
        },
        ajaxPut = function (method, data) {
            var url = concatUrl(method);

            return $.ajax({
                url: url,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: data,
                xhrFields: {
                   withCredentials: true
                }
            });
        },
        concatUrl = function (method) {
            return "/api/" + method;
        };

        return {
            get: ajaxGet,
            post: ajaxPost,
            put: ajaxPut
        }
    }());
}(vm, jQuery));