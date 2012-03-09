function cut(text, num) {
  if (text.length > num) {
    text = text.substring(0, num - 3) + "...";
  }
  return text;
}

function itemTemplate(value) {
    line  = '<div class="tui_item">';
    line += '   <a href="' + value['item_link'] + '"><img src="' + value['image_link'] + '" alt="' + value['item_name'] + '" class="tui_image" /></a><br />';
    line += '   <p><a href="' + value['item_link'] + '" title="' + value['item_name'] + '">' + value['item_name'] + '</a></p>';
    line += '<div class="tui_price">价格：<b>￥' + value['price'] + '</b>';
    //if(typeof(value['market_price']) != 'undefined'){
    //    line += ' | <del>￥' + value['market_price'] + '</del>';
    //}
    line += '</div>';
    line += '</div>';
    return line;
}


function hItemTemplate(value) {
/*
    line  = '<div class="tui_item">';
    line += '   <a href="' + value['item_link'] + '"><img src="' + value['image_link'] + '" alt="' + value['item_name'] + '" class="tui_image" /></a><br />';
    line += '   <p><a href="' + value['item_link'] + '" title="' + value['item_name'] + '">' + value['item_name'] + '</a></p>';
    line += '<div class="tui_price">价格：<b>￥' + value['price'] + '</b>';
    line += '</div>';
    line += '</div>';
*/

    line = '<li>';
    line += '<a href="'+value['item_link']+'"><img src="' + value['image_link'] + '" width="150" height="150"></a>';
    line += '<h3 style="padding-bottom:4px"><a href="'+value['item_link']+'">' + value['item_name'] + '</a></p>';
    line += '<div class="price-n">';
    line += '<span class="grayFont">  价格：</span><span class="price-font">￥' + value['price'] + '</span>';
    line += '</div>';
    line += '</li>';
    return line;

}

function vavItemTemplate(value) {
    line  = '<div class="tui_item">';
    line += '   <a href="' + value['item_link'] + '"><img src="' + value['image_link'] + '" alt="' + value['item_name'] + '" class="tui_image" /></a><br />';
    line += '   <p><a href="' + value['item_link'] + '" title="' + value['item_name'] + '">' + value['item_name'] + '</a></p>';

    line += '<div class="tui_price">VG价：<b>￥' + value['price'] + '</b>';
    //if(typeof(value['market_price']) != 'undefined'){
    //    line += ' | <del>￥' + value['market_price'] + '</del>';
    //}
    line += '</div>';
    line += '</div>';
    return line;
}

function vubItemTemplate(value) {
    var line = '';
    line += '<li>';
    line += '  <div class="tui_item_detail">';
    line += '    <a href="' + value["item_link"] + '">';
    line += '    <img class="tui_image" src="' + value["image_link"] + '" alt="' + value["item_name"] + '" height="60" border="0">';
    line += '    <div class="tui_title">' + value["item_name"] + '</div></a>';
    line += '    <div class="tui_price"><b>￥' + value["price"] + '</b>';

    if(typeof(value["market_price"]) != 'undefined'){
        line += ' | <del>' + value["market_price"] + '</del>';
    }
    line += '    </div>';
    line += '  </div>';
    line += '</li>';
    line += '<div class="tui-clear" style="height:10px;clear:left;font-size:0;line-height:0;"></div>';
    return line;
}

function tjbCallback(data) {
    if (data.code == 0) {
        for (var response_full_name in data.responses) {
            var response = data.responses[response_full_name];
            
            if (response_full_name == "getAlsoViewed") {
                callbackByAlsoViewed(response);
            }
            else if (response_full_name == "getAlsoBought") {
                callbackByAlsoBought(response);
            }
            else if (response_full_name == "getUltimatelyBought") {
                callbackByViewedUltimatelyBought(response);
            }
            else if (response_full_name == "getByBrowsingHistory") {
                callbackByHistory(response);
            }
            else if (response_full_name == "getBoughtTogether") {
                callbackByBoughtTogether(response);
            }
            else if (response_full_name == "getByShoppingCart") {
                callbackByShoppingCart(response);
            }
            else if (response_full_name == "getByPurchasingHistory") {
                callbackByPurchasingHistory(response);
            }

        }
    }
}


function callbackByViewedUltimatelyBought(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#viewedUltimatelyBoughtWrapper").show();
        jQuery("#viewedUltimatelyBoughtItems").html(output);
    }
}
function callbackByShoppingCart(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });

    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#byShoppingCartWrapper").show();
        jQuery("#byShoppingCartItems").html(output);
    }
}
function callbackByPurchasingHistory(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#byPurchasingHistoryWrapper").show();
        jQuery("#byPurchasingHistoryItems").html(output);
    }
}
function callbackByAlsoBought(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#alsoBoughtWrapper").show();
        jQuery("#alsoBoughtItems").html(output);
    }
}
function callbackByBoughtTogether(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#boughtTogetherWrapper").show();
        jQuery("#boughtTogetherItems").html(output);
    }
}
function callbackByAlsoViewed(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#alsoViewedWrapper").show();
        jQuery("#alsoViewedItems").html(output);
    }
}
function callbackByHistory(json){
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += hItemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#byBrowsingHistoryWrapper").show();
        jQuery("#byBrowsingHistoryItems").html(output);
    }
}
