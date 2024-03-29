(function(window) {

    function invokeRequest(url) {
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
            this.url_prefix = "http://poco.tuijianbao.net/api/v1.6";
        } else {
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
        var url_args = {
            "##api_key": this.api_key,
            "##callback": callback,
            "##format": "jsonp"
        };

        for (var key in this.shared_params) {
            if (key.substring(0, 2) == "##") {
                url_args[key] = this.shared_params[key];
            }
        }

        // request params should override shared_params data
        for (var key in request) {
            url_args["##" + key] = request[key];
        }

        return url_args;
    };

    Poco.prototype.getFullUrl = function(request_type, request, callback) {
        var url_args = this.getUrlArgs(request, callback);
        var paramstr = "";
        for (var key in url_args) {
            if (key.substring(0, 2) == "##") {
                paramstr += "&" + key.substring(2) + "=" + encodeURIComponent(url_args[key]);
            }
        }
        if (this.debug == true) {
            paramstr += "&debug=true";
        }
        if (request_type == "events") {
            return this.url_prefix + "/public/events/?" + paramstr;
        } else if (request_type == "recommender") {
            return this.url_prefix + "/public/recommender/?" + paramstr;
        }
    };

    Poco.prototype.addSharedParams = function(param_name, param_value) {
        if (typeof(param_name) == "object") {
            var param_dict = param_name;
            for (var param_name in param_dict) {
                this.shared_params["##" + param_name] = param_dict[param_name];
            }
        } else {
            this.shared_params["##" + param_name] = param_value;
        }
    };


    Poco.prototype.track = function(event_type, content) {
        if (content == undefined) {
            var content = {};
        }
        content["event_type"] = event_type;
        this._invokeRequest("events", content);
    };

    /*
    css_selector: the css selector of links to track
    link_type: the type of link. Example: the reserved type "SearchResult"
    shared_params: the params shared by all click event among these links
    If there are data-* attributes on the link, they would also be collected.
*/
    Poco.prototype.track_links = function(css_selector, link_type, shared_params) {
        var super_this = this;
        $(css_selector).click(function(evt) {
            var url = this.href;
            event.preventDefault();

            var params = {
                "link_type": link_type,
                "url": url
            };
            for (var param_name in shared_params) {
                params[param_name] = shared_params[param_name];
            };

            var link_data = $(this).data();
            for (var data_key in link_data) {
                params[data_key] = link_data[data_key];
            };

            super_this.track("ClickLink", params);

            window.setTimeout(function() {
                window.location = url;
            }, super_this.options.track_links_timeout);
        });
    };

    Poco.prototype.recommend = function(recommender_type, content) {
        if (content == undefined) {
            var content = {};
        };
        content["type"] = recommender_type;
        this._invokeRequest("recommender", content);
    };


    Poco.prototype.addEvent = function(request) {
        this.requests.push(["events", request]);
    };


    Poco.prototype.addRecommender = function(request) {
        this.requests.push(["recommender", request]);
    };


    Poco.prototype._invokeRequest = function(request_type, request, callback) {
        var the_callback = null;
        if (callback == undefined) {
            the_callback = this.callback;
        } else {
            the_callback = callback;
        };
        var full_url = this.getFullUrl(request_type, request, the_callback);
        invokeRequest(full_url + "&" + new Date().getTime());
    }


    Poco.prototype.invoke = function(callback) {
        for (var idx in this.requests) {
            var request_type = this.requests[idx][0];
            var request = this.requests[idx][1];
            this._invokeRequest(request_type, request, callback);
        };
    };


    window._poco = Poco;

})(window);

function pCallback(data) {
    // should be overide
}