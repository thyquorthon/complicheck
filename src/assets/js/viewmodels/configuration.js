var vm = vm || {};
(function(um, $, toastr) {

    toastr.options.closeButton = true;
    toastr.options.debug = false;
    toastr.options.positionClass = "toast-top-full-width";
    toastr.options.timeOut = 10000;

    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
        var errorOptions = {
            "timeOut": "0",
            "extendedTimeOut": "0"
        };
        if (jqXHR.responseJSON) toastr.error(jqXHR.responseJSON, "Error ocurred", errorOptions);
        else toastr.error("Please try again later", "Error ocurred", errorOptions);
    });

    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
        }
    });

}(vm, jQuery, toastr));