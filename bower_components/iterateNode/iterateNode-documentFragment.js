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
            //typeNode = Object.prototype.toString.call(jsObject[k]);
            typeNode = Object.prototype.toString.call(jsObject[k]);
            var li = document.createElement("li");
            li.id="iterateNode-object-" + countObj + count;
            li.className="iterateNode-object";
            //<b class='iterateNode-sanitize-key'>key:</b>
            //<b class='iterateNode-sanitize-key-typeof'>typeof:</b>
            li.innerHTML = "<b class='iterateNode-sanitize-key'>key:</b><i class='iterateNode-sanitize-key-value'>"+ k +
                 "</i><span class='iterateNode-sanitize-separator1'> -- </span>" +
                 "<b class='iterateNode-sanitize-key-typeof'>typeof:</b>" +
                 "<i class='iterateNode-sanitize-key-typeof-value'>"+ typeNode + "</i>";

            if( typeof jsObject[k] === "object" && jsObject[k] )
            {
                var caretA = createCaret(li,jsObject[k],countObj + count);
                li.appendChild(caretA);
            }
            else if ( sanitizedObjects.indexOf(k) < 0 ){
                li.innerHTML += jsObject[k] ? "<span class='iterateNode-sanitize-separator2'> -- </span>" + jsObject[k] : " null";
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