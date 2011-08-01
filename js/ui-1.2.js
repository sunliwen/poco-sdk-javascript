function cut(text, num) {
  document.write(text.length);
  if (text.length > num) {
    text = text.substring(0, num - 3) + "...";
  }
  return text;
}

function itemTemplate(value) {
    line  = '<div class="tui_item">';
    line += '   <a href="' + value['item_link'] + '"><img src="' + value['image_link'] + '" alt="' + value['item_name'] + '" class="tui_image" /></a><br />';
    line += '   <p><a href="' + value['item_link'] + '" title="' + value['item_name'] + '">' + cut(value['item_name'], 14) + '</a></p>';

    line += '<div class="tui_price"><b>' + value['price'] + '</b>';
    if(typeof(value['market_price']) != 'undefined'){
        line += ' | <del>' + value['market_price'] + '</del>';
    }
    line += '</div>';
    line += '</div>';
    return line;
}

function avItemTemplate(value) {
    line  = '<div class="tui_item">';
    line += '   <a href="' + value['item_link'] + '"><img src="' + value['image_link'] + '" alt="' + value['item_name'] + '" class="tui_image" /></a><br />';
    line += '   <p><a href="' + value['item_link'] + '" title="' + value['item_name'] + '">' + cut(value['item_name'], 14) + '</a></p>';

    line += '<div class="tui_price"><b>' + value['price'] + '</b>';
    if(typeof(value['market_price']) != 'undefined'){
        line += ' | <del>' + value['market_price'] + '</del>';
    }
    line += '</div>';
    line += '</div>';
    return line;
}

function vubItemTemplate(value) {
    var line = '';
    line += '<li>';
    line += '  <div class="tui_item_detail">';
    line += '    <a href="' + value["item_link"] + '">';
    line += '    <img class="tui_image" src="' + value["image_link"] + '" alt="' + value["item_name"] + '" height="50" border="0">';
    line += '    <div class="tui_title">' + value["item_name"] + '</div></a>';
    line += '    <div class="tui_price"><b>' + value["price"] + '</b>';

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
            else if (response_full_name == "getByEachPurchasedItem") {
                callbackByEachPurchasedItem(response);
            }

        }
    }
}


function callbackByViewedUltimatelyBought(json) {
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += vubItemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#viewedUltimatelyBoughtWrapper").toggle();
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
        jQuery("#byShoppingCartWrapper").toggle();
        jQuery("#byShoppingCartItems").html(output);
    }
}

function callbackByEachPurchasedItem(json) {
    var result = json['result'];
    var output = '';
    jQuery.each(result, function(index, result_row) {
        output += itemTemplate(result_row.by_item);
        jQuery.each(result_row.topn, function(index, topn_item) {
            output += itemTemplate(topn_item);
        });
        output += '<br/>';
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#byEachPurchasedItemWrapper").toggle();
        jQuery("#byEachPurchasedItems").html(output);
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
        jQuery("#byPurchasingHistoryWrapper").toggle();
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
        jQuery("#alsoBoughtWrapper").toggle();
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
        jQuery("#boughtTogetherWrapper").toggle();
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
        jQuery("#alsoViewedWrapper").toggle();
        jQuery("#alsoViewedItems").html(output);
    }
}
function callbackByHistory(json){
    var topn = json['topn'];
    var output = '';
    jQuery.each(topn, function(index, value) { 
        output += itemTemplate(value);
    });
    if(output.length >0){
        output += '<div class="clearbox"></div>';
        jQuery("#byBrowsingHistoryWrapper").toggle();
        jQuery("#byBrowsingHistoryItems").html(output);
    }
}
