var iterateNode = function(jsObject,countObj){
    var docfrag = document.createDocumentFragment();
    var ul = document.createElement("ul");
    var typeNode = "";
    var allowedJSnodes = [
        "[object CSSStyleDeclaration]",
        "[object NamedNodeMap]",
        "[object Attr]",
        "[object NodeList]",
        "[object DocumentType]",
        "[object Location]"
    ];
    var sanitizedObjects = [
        "outerText",
        "innerText",
        "innerHTML",
        "outerHTML"
    ];
    var count = 0;
    var countObj = countObj ? countObj : "";
    for(var k in jsObject){
        (function(k){
            typeNode = Object.prototype.toString.call(jsObject[k]);
            var li = document.createElement("li");
            li.id="iterateNode-object-" + countObj + count;
            li.className="iterateNode-object";
            //<b class='iterateNode-sanitize-key'>key:</b>
            //<b class='iterateNode-sanitize-key-typeof'>typeof:</b>
            li.innerHTML = "<i class='iterateNode-sanitize-key-value'>"+ k +
                 "</i><span class='iterateNode-sanitize-separator'> -- </span>" +
                 "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeNode + "</i>";

            if( typeNode === "[object Object]" || typeNode === "[object Array]" || allowedJSnodes.indexOf(typeNode) > -1
                || typeNode.substr(0,"[object HTML".length) == "[object HTML"
                || typeNode.substr(0,"[object DOM".length) == "[object DOM"
              )
            {
                var caretA = createCaret(li,jsObject[k],countObj + count);
                li.appendChild(caretA);
            }
            if ( typeNode === "[object Function]" || ( typeNode === "[object String]" && sanitizedObjects.indexOf(k) < 0 ) ||
                typeNode === "[object Number]" ||
                typeNode === "[object Boolean]"
                ){
                li.innerHTML += jsObject[k] ? " -- " + jsObject[k] : " null";
            }
            if ( sanitizedObjects.indexOf(k) > -1 )
            {
                var sanitizedHTML = sanitize( jsObject[k] );
                li.innerHTML += "<pre class='iterateNode-sanitizedHTML'>" + sanitizedHTML + "</pre>";
            }
            ul.appendChild(li);
            count++;
        })(k);
    }

    docfrag.appendChild(ul);
    return docfrag;
};