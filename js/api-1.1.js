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
        this.url_prefix = "http://api.tuijianbao.net/1.0";
    }
    else {
        this.url_prefix = url_prefix;
    }

}

Point.prototype.addSharedParams = function(param_name, param_value) {
    this.shared_params["##" + param_name] = param_value;
};

Point.prototype.addRequest = function(full_name, request) {
    this.requests.push([full_name, request]);
};

// Generated using ApiServer.packed_request.generateFULL_NAME_ATTR_NAME2FULL_ABBR_NAME_js
// # WARNING: output of generateFULL_NAME_ATTR_NAME2FULL_ABBR_NAME_js DOES NOT contain the hacky "updateItem:cateories" (cateories lacks "g")
var FULL_NAME_ATTR_NAME2FULL_ABBR_NAME = {
    "rateItem:item_id" : "ri_i",
    "rateItem:score" : "ri_s",
    "rateItem:user_id" : "ri_u",
    "unlike:item_id" : "ulki",
    "unlike:user_id" : "ulku",
    "updateItem:categories" : "upic",
    "updateItem:cateories" : "upic",
    "updateItem:description" : "upid",
    "updateItem:item_id" : "upii",
    "updateItem:image_link" : "upim",
    "updateItem:item_link" : "upil",
    "updateItem:item_name" : "upin",
    "updateItem:price" : "upip",
    "updateItem:market_price" : "upir",
    "getBoughtTogether:amount" : "rcta",
    "getBoughtTogether:include_item_info" : "rctc",
    "getBoughtTogether:item_id" : "rcti",
    "getBoughtTogether:user_id" : "rctu",
    "getUltimatelyBought:amount" : "rcua",
    "getUltimatelyBought:include_item_info" : "rcuc",
    "getUltimatelyBought:item_id" : "rcui",
    "getUltimatelyBought:user_id" : "rcuu",
    "getAlsoViewed:amount" : "rcva",
    "getAlsoViewed:include_item_info" : "rcvc",
    "getAlsoViewed:item_id" : "rcvi",
    "getAlsoViewed:user_id" : "rcvu",
    "removeFavorite:item_id" : "rf_i",
    "removeFavorite:user_id" : "rf_u",
    "updateCategory:category_id" : "upci",
    "updateCategory:category_link" : "upcl",
    "updateCategory:category_name" : "upcn",
    "updateCategory:parent_categories" : "upcp",
    "getByShoppingCart:amount" : "rcca",
    "getByShoppingCart:include_item_info" : "rccc",
    "getByShoppingCart:shopping_cart" : "rccs",
    "getByShoppingCart:user_id" : "rccu",
    "removeOrderItem:item_id" : "rsci",
    "removeOrderItem:user_id" : "rscu",
    "addOrderItem:item_id" : "asci",
    "addOrderItem:user_id" : "ascu",
    "getByEachBrowsedItem:amount_for_each_item" : "reba",
    "getByEachBrowsedItem:include_item_info" : "rebc",
    "getByEachBrowsedItem:rec_row_max_amount" : "rebr",
    "getByEachBrowsedItem:user_id" : "rebu",
    "getByEachBrowsedItem:browsing_history" : "rebh",
    "addFavorite:item_id" : "af_i",
    "addFavorite:user_id" : "af_u",
    "getByBrowsingHistory:amount" : "rcha",
    "getByBrowsingHistory:include_item_info" : "rchc",
    "getByBrowsingHistory:browsing_history" : "rchh",
    "getByBrowsingHistory:user_id" : "rchu",
    "placeOrder:order_id" : "ploi",
    "placeOrder:order_content" : "ploo",
    "placeOrder:user_id" : "plou",
    "getByEachPurchasedItem:amount_for_each_item" : "repa",
    "getByEachPurchasedItem:include_item_info" : "repc",
    "getByEachPurchasedItem:user_id" : "repu",
    "getByEachPurchasedItem:rec_row_max_amount" : "rept",
    "removeItem:item_id" : "rmii",
    "viewItem:item_id" : "vi_i",
    "viewItem:user_id" : "vi_u",
    "getAlsoBought:amount" : "rcba",
    "getAlsoBought:include_item_info" : "rcbc",
    "getAlsoBought:item_id" : "rcbi",
    "getAlsoBought:user_id" : "rcbu",
    "getByPurchasingHistory:amount" : "rcpa",
    "getByPurchasingHistory:include_item_info" : "rcpc",
    "getByPurchasingHistory:user_id" : "rcpu"}


// Generated using ApiServer.packed_request.generateFULL_NAME2MASK_js
var FULL_NAME2MASK = {
    "rateItem" : 8,
    "unlike" : 524288,
    "updateItem" : 128,
    "getBoughtTogether" : 2048,
    "getUltimatelyBought" : 4096,
    "getAlsoViewed" : 512,
    "removeFavorite" : 4,
    "updateCategory" : 65536,
    "getByShoppingCart" : 32768,
    "removeOrderItem" : 32,
    "addOrderItem" : 16,
    "getByEachBrowsedItem" : 131072,
    "addFavorite" : 2,
    "getByBrowsingHistory" : 8192,
    "placeOrder" : 64,
    "getByEachPurchasedItem" : 262144,
    "removeItem" : 256,
    "viewItem" : 1,
    "getAlsoBought" : 1024,
    "getByPurchasingHistory" : 16384}


Point.prototype.getUrlArgs = function(callback) {
    var url_args = {"##api_key": this.api_key, "##callback": callback};
    var request_mask_set = 0;
    for (var idx in this.requests) {
        var full_name = this.requests[idx][0];
        var request = this.requests[idx][1];
        for (var key in request) {
            var k1 = full_name + ":" + key;
            if (k1 in FULL_NAME_ATTR_NAME2FULL_ABBR_NAME) {
                var full_abbr_name = FULL_NAME_ATTR_NAME2FULL_ABBR_NAME[k1];
                url_args["##" + full_abbr_name] = request[key];
            }
            else {
                //return {"succ": false, "err_msg": ""}
            }
        }
        request_mask_set = request_mask_set | FULL_NAME2MASK[full_name];
    }

    for (var key in this.shared_params) {
            if (key.substring(0, 2) == "##") {
                url_args["##_" + key.substring(2)] = this.shared_params[key];
            }
    }
    url_args["##-"] = request_mask_set.toString(16);

    return url_args;
};

Point.prototype.getFullUrl = function(callback) {
    var url_args = this.getUrlArgs(callback);
    var paramstr = "";
    for (var key in url_args) {
        if (key.substring(0, 2) == "##") {
            paramstr += "&" + key.substring(2) + "=" + encodeURIComponent(url_args[key]);
        }
    }
    return this.url_prefix + "/point?" + paramstr;
};

Point.prototype.invoke = function(callback) {
    //if("" == this.getBrowser() || "" == this.getOS()) return;
    var full_url = this.getFullUrl(callback);
    invokeRequest(full_url + "&" + new Date().getTime());
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
tui.PackedRequest = Point;

window.tui = tui;

})(window);

function tjbCallback(data){
    // should be overide
}
