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
    this.options = {
        "track_links_timeout": 500
        };
    if (url_prefix === undefined || url_prefix === null) {
        this.url_prefix = "http://search.tuijianbao.net/api/v1.6";
    }
    else {
        this.url_prefix = url_prefix;
    }

}


Poco.prototype.setCallback = function(callback) {
    this.callback = callback;
};

Poco.prototype.setOption = function(option_key, option_value) {
    this.options[option_key] = option_value;
};

Poco.prototype.getUrlArgs = function(request, callback) {
    var url_args = {"##api_key": this.api_key, "##callback": callback, "##format": "jsonp"};
    //for (var idx in this.requests) {
        for (var key in request) {
            url_args["##" + key] = request[key];
        }
    //}

    for (var key in this.shared_params) {
            if (key.substring(0, 2) == "##") {
                url_args[key] = this.shared_params[key];
            }
    }
    return url_args;
};

Poco.prototype.getFullUrl = function(request_type, request, callback) {
    console.log("R:", request);
    var url_args = this.getUrlArgs(request, callback);
    console.log("UA:", url_args);
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
    if (typeof(param_name) == "object") {
        var param_dict = param_name;
        for (var param_name in param_dict) {
            this.shared_params["##" + param_name] = param_dict[param_name];
        }
    }
    else {
        this.shared_params["##" + param_name] = param_value;
    }
};

Poco.prototype.addEvent = function(request) {
    //this.requests.push(["events", request]);
    this._invoke("events", request);
};

Poco.prototype.track = function(event_type, content) {
    if (content == undefined) {
        var content = {};
    }
    content["event_type"] = event_type;
    this.addEvent(content);
};

Poco.prototype.track_links = function(xpath) {
    var super_this = this;
    $(xpath).click(function(evt) {
        var url = this.href;
        console.log("URL clicked" + url);

        event.preventDefault();
        super_this.track("$ClickLink", {"link_type": "$SearchResult",
                                  "link_url": url});

        window.setTimeout(function() {
            window.location = url;
        }, super_this.options.track_links_timeout);
    });
};

Poco.prototype.addRecommender = function(request) {
    //this.requests.push(["recommender", request]);
    this._invoke("recommender", request);
};

Poco.prototype.recommend = function(recommender_type, content) {
    if (content == undefined) {
        var content = {};
    };
    content["type"] = recommender_type;
    this.addRecommender(content);
};

Poco.prototype._invoke = function(request_type, request) {
    var full_url = this.getFullUrl(request_type, request, this.callback);
    console.log(request_type, request, full_url);
    invokeRequest(full_url + "&" + new Date().getTime());
}

window._poco = Poco;

})(window);

function pCallback(data){
    // should be overide
}
