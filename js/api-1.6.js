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
 * Point
 */
// url_prefix is OPTIONAL, only for development purpose.
function Point(api_key, url_prefix) {
    this.shared_params = {}
    this.requests = []

    this.api_key = api_key;
    if (url_prefix === undefined || url_prefix === null) {
        this.url_prefix = "http://api.leyou.com.cn/1.0";
    }
    else {
        this.url_prefix = url_prefix;
    }

}


Point.prototype.getUrlArgs = function(request, callback) {
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

Point.prototype.getFullUrl = function(request_type, request, callback) {
    var url_args = this.getUrlArgs(request, callback);
    console.log(url_args);
    var paramstr = "";
    for (var key in url_args) {
        if (key.substring(0, 2) == "##") {
            paramstr += "&" + key.substring(2) + "=" + encodeURIComponent(url_args[key]);
        }
    }

    if (request_type == "events") {
        return this.url_prefix + "/public/events/?" + paramstr;
    }
    else if (request_type == "recommender") {
        return this.url_prefix + "/public/recommender/?" + paramstr;
    }
};

Point.prototype.addSharedParams = function(param_name, param_value) {
    this.shared_params["##" + param_name] = param_value;
};

Point.prototype.addEvent = function(request) {
    this.requests.push(["events", request]);
};

Point.prototype.addRecommender = function(request) {
    this.requests.push(["recommender", request]);
};

Point.prototype.invoke = function(callback) {
    for (var idx in this.requests) {
        var request_type = this.requests[idx][0];
        var request = this.requests[idx][1];
        var full_url = this.getFullUrl(request_type, request, callback);
        invokeRequest(full_url + "&" + new Date().getTime());
    };
};

Point.prototype.getBrowser = function() {
    var agent = navigator.userAgent;
    return window.opera ? "Opera" : /chrom/i.test(agent) ? "Chrome" : /msie/i.test(agent) ? "Internet Explorer" : /AppleWebKit/.test(navigator.appVersion) ? "Safari" : /mozilla/i.test(agent) && !/compatible|webkit/i.test(agent) ? "Firefox" : ""
}

Point.prototype.getOS = function() {
    var agent = navigator.userAgent;
    return /Windows/i.test(agent) ? "Windows" : /iPad/.test(agent) ? "iPad" : /iPhone/.test(agent) ? "iPhone" : /Android/.test(agent) ? "Android" : /Mac/i.test(agent) ? "Mac OS X" : /X11/.test(agent) || /Linux/.test(agent) ? "Linux" : ""
}




var tui = new Object();

tui.Point = Point;

window.tui = tui;

})(window);

function tjbCallback(data){
    // should be overide
}
