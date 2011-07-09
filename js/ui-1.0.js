function itemTemplate(item_id, item_name, item_link, image_link, price, market_price) {
    line  = '<div class="tui_item">';
    line += '   <a href="' + item_link + '"><img src="' + image_link + '" alt="' + item_name + '" class="tui_image" /></a><br />';
    line += '   <p><a href="' + item_link + '" title="' + item_name + '">' + item_name + '</a></p>';

    if(typeof(market_price) != 'undefined'){
        line += '   <del>￥' + market_price + '</del><br />';
    }

    line += '<b>￥' + price + '</b>';
    line += '</div>';
    return line
}

function vubItemTemplate(value) {
    var line = '';
    line += '<li>';
    line += '  <div class="tui_item_detail"><a href="' + value["item_link"] + '">';
    line += '    <img class="tui_image" src="' + value["image_link"] + '" alt="' + value["item_name"] + '" height="50" border="0" style="margin:0 10px 0 0;float:left;">';
    line += '    <span class="tui_title" style="color:#3F3F3F">' + value["item_name"] + '</span></a>';
    line += '    <br>';
    line += '    <b style="color: #F66;">' + value["price"] + '</b>';

    if(typeof(value["market_price"]) != 'undefined'){
        line += '| <del>' + value["market_price"] + '</del>';
    }

    line += '  </div>';
    line += '</li>';
    line += '<div class="tui-clear" style="height:10px;clear:left;font-size:0;line-height:0"></div>';
    return line;
}
