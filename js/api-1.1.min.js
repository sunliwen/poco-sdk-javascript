// Request
// Behavior
// Targeting

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
 * PackedRequest
 */
// url_prefix is OPTIONAL, only for development purpose.
function PackedRequest(api_key, url_prefix) {
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

PackedRequest.prototype.addSharedParams = function(param_name, param_value) {
    this.shared_params["##" + param_name] = param_value;
};

PackedRequest.prototype.addRequest = function(full_name, request) {
    this.requests.push([full_name, request]);
};

// Generated using ApiServer.packed_request.generateFULL_NAME_ATTR_NAME2FULL_ABBR_NAME_js
var FULL_NAME_ATTR_NAME2FULL_ABBR_NAME = {
    "rateItem:item_id" : "ri_i",
    "rateItem:score" : "ri_s",
    "rateItem:user_id" : "ri_u",
    "updateItem:categories" : "upic",
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
    "getByShoppingCart:amount" : "rcca",
    "getByShoppingCart:include_item_info" : "rccc",
    "getByShoppingCart:shopping_cart" : "rccs",
    "getByShoppingCart:user_id" : "rccu",
    "removeOrderItem:item_id" : "rsci",
    "removeOrderItem:user_id" : "rscu",
    "addOrderItem:item_id" : "asci",
    "addOrderItem:user_id" : "ascu",
    "addFavorite:item_id" : "af_i",
    "addFavorite:user_id" : "af_u",
    "getByBrowsingHistory:amount" : "rcha",
    "getByBrowsingHistory:include_item_info" : "rchc",
    "getByBrowsingHistory:browsing_history" : "rchh",
    "getByBrowsingHistory:user_id" : "rchu",
    "placeOrder:user_id" : "plou",
    "placeOrder:order_content" : "ploo",
    "removeItem:item_id" : "rmii",
    "viewItem:item_id" : "vi_i",
    "viewItem:user_id" : "vi_u",
    "getAlsoBought:amount" : "rcba",
    "getAlsoBought:include_item_info" : "rcbc",
    "getAlsoBought:item_id" : "rcbi",
    "getAlsoBought:user_id" : "rcbu",
    "getByPurchasingHistory:amount" : "rcpa",
    "getByPurchasingHistory:include_item_info" : "rcpc",
    "getByPurchasingHistory:user_id" : "rcpu"
};


// Generated using ApiServer.packed_request.generateFULL_NAME2MASK_js
var FULL_NAME2MASK = {
    "rateItem" : 8,
    "updateItem" : 128,
    "getBoughtTogether" : 2048,
    "getUltimatelyBought" : 4096,
    "getAlsoViewed" : 512,
    "removeFavorite" : 4,
    "getByShoppingCart" : 32768,
    "removeOrderItem" : 32,
    "addOrderItem" : 16,
    "addFavorite" : 2,
    "getByBrowsingHistory" : 8192,
    "placeOrder" : 64,
    "removeItem" : 256,
    "viewItem" : 1,
    "getAlsoBought" : 1024,
    "getByPurchasingHistory" : 16384
};


var ALL_ATTR_NAMES = {
    'user_id': 1,
    'description': 1,
    'item_name': 1,
    'price': 1,
    'order_content': 1,
    'amount': 1,
    'image_link': 1,
    'include_item_info': 1,
    'market_price': 1,
    'score': 1,
    'item_id': 1,
    'item_link': 1,
    'browsing_history': 1,
    'shopping_cart': 1,
    'categories': 1
};


PackedRequest.prototype.getUrlArgs = function(callback) {
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

PackedRequest.prototype.getFullUrl = function(callback) {
    var url_args = this.getUrlArgs(callback);
    var paramstr = "";
    for (var key in url_args) {
        if (key.substring(0, 2) == "##") {
            paramstr += "&" + key.substring(2) + "=" + encodeURIComponent(url_args[key]);
        }
    }
    return this.url_prefix + "/packedRequest?" + paramstr;
};

PackedRequest.prototype.invoke = function(callback) {
    var full_url = this.getFullUrl(callback);
    invokeRequest(full_url + "&" + new Date().getTime());
};



var tui = new Object();

tui.PackedRequest = PackedRequest;

window.tui = tui;

})(window);
