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

        if (jqXHR.responseJSON) toastr.error(objToList(jqXHR.responseJSON), "Error ocurred", errorOptions);
        else toastr.error("Please try again later", "Error ocurred", errorOptions);
    });

    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
            toastr.clear();
        }
    });

}(vm, jQuery, toastr));

// TODO : Should be a way to do this with templates and KO
function objToList(obj){
    console.log(obj); // TODO : REMOVE
    var output = '';
    for (var key in obj){
        output += '<b>' + key + '</b><ul>';
        for(var elm in obj[key]){
            output += '<li>'+obj[key][elm]+'</li>';
        }
        output += '</ul>';
    }
    return output;
}