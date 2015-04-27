var iterateNode = function(jsObject,hidden){
    var html = '<ul>';
    var typeNode = "";
    var allowedJSnodes = [
        //"[object CSSStyleDeclaration]",
        "[object NamedNodeMap]",
        "[object HTMLCollection]",
        "[object HTMLBodyElement]"
        //"[object HTMLHeadElement]"
    ];
    for(var k in jsObject){
        typeNode = Object.prototype.toString.call(jsObject[k]);
        html+= "<li>" +
            "<b>key:</b><i>"+ k + "</i> -- " +
            "<b>typeof:</b><i>"+ typeNode + "</i>";

        if( typeNode === "[object Object]" || typeNode === "[object Array]" || allowedJSnodes.indexOf(typeNode) > -1
            || typeNode.substr(0,"[object HTML".length) == "[object HTML"
          )
        {
            html += iterateNode(jsObject[k]);
        }
        if ( typeNode === "[object Function]" || typeNode === "[object String]" || typeNode === "[object Number]" ||
            typeNode === "[object Boolean]"
            ){
            html += jsObject[k];
        }

        html+="</li>";
    };
    html+="</ul>";
    return html;
};