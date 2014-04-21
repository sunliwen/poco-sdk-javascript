(function(window){

function invokeRequest(url){
    var script = document.createElement('script');
    script.src = url;
    script.charset = "utf-8";
    script.async = true;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
}

/*
 * Poco
 */
// url_prefix is OPTIONAL, only for development purpose.
function Poco(api_key, url_prefix, debug) {
    this.shared_params = {};
    this.requests = [];
    this.debug = debug;
    this.api_key = api_key;
    if (url_prefix === undefined || url_prefix === null) {
        this.url_prefix = "http://search.tuijianbao.net/api/v1.6";
    }
    else {
        this.url_prefix = url_prefix;
    }

}


Poco.prototype.getUrlArgs = function(request, callback) {
    var url_args = {"##api_key": this.api_key, "##callback": callback, "##format": "jsonp"};
    for (var idx in this.requests) {
        for (var key in request) {
            url_args["##" + key] = request[key];
        }
    }

    for (var key in this.shared_params) {
            if (key.substring(0, 2) == "##") {
                url_args[key] = this.shared_params[key];
            }
    }
    return url_args;
};

Poco.prototype.getFullUrl = function(request_type, request, callback) {
    var url_args = this.getUrlArgs(request, callback);
    console.log(url_args);
    var paramstr = "";
    for (var key in url_args) {
        if (key.substring(0, 2) == "##") {
            paramstr += "&" + key.substring(2) + "=" + encodeURIComponent(url_args[key]);
        }
    }
    if (this.debug==true) {
      paramstr += "&debug=true";
    }
    if (request_type == "events") {
        return this.url_prefix + "/public/events/?" + paramstr;
    }
    else if (request_type == "recommender") {
        return this.url_prefix + "/public/recommender/?" + paramstr;
    }
};

Poco.prototype.addSharedParams = function(param_name, param_value) {
    this.shared_params["##" + param_name] = param_value;
};

Poco.prototype.addEvent = function(request) {
    this.requests.push(["events", request]);
};

Poco.prototype.addRecommender = function(request) {
    this.requests.push(["recommender", request]);
};

Poco.prototype.invoke = function(callback) {
    for (var idx in this.requests) {
        var request_type = this.requests[idx][0];
        var request = this.requests[idx][1];
        var full_url = this.getFullUrl(request_type, request, callback);
        invokeRequest(full_url + "&" + new Date().getTime());
    };
};

window._poco = Poco;

})(window);

function pCallback(data){
    // should be overide
}
