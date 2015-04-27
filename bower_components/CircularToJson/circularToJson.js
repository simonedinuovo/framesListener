/**
 * Created by Simone on 26/04/15.
 */
var iterateNode = function(jsObject){
    var docfrag = document.createDocumentFragment();
    var ul = document.createElement("ul");
    var typeNode = "";
    var allowedJSnodes = [
        //"[object CSSStyleDeclaration]",
        "[object NamedNodeMap]",
        "[object HTMLCollection]",
        "[object HTMLBodyElement]"
        //"[object HTMLHeadElement]"
    ];
    for(var k in jsObject){
        (function(k){
            typeNode = Object.prototype.toString.call(jsObject[k]);
            var li = document.createElement("li");
            li.innerHTML = "<b>key:</b><i>"+ k + "</i> -- " +
                "<b>typeof:</b><i>"+ typeNode + "</i>";

            if( typeNode === "[object Object]" || typeNode === "[object Array]" || allowedJSnodes.indexOf(typeNode) > -1
                || typeNode.substr(0,"[object HTML".length) == "[object HTML"
                )
            {
                var caretA = document.createElement("a");
                caretA.href="#";
                caretA.className="caretA";
                var caret = document.createElement("span");
                caret.className = "caret";
                caretA.addEventListener("click",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var ulChild = li.querySelectorAll("ul")[0];
                    if ( !ulChild )
                        li.appendChild( iterateNode(jsObject[k]) );

                    var path = /open/g;
                    if ( path.test( caret.className ) )
                    {
                        caret.className = caret.className.replace(path, "");
                        ulChild.className+=" hide";
                    }
                    else{
                        caret.className+=" open";
                        if ( ulChild ) ulChild.className = ulChild.className.replace(/hide/g, "");
                    }

                },false);
                caretA.appendChild(caret);
                li.appendChild(caretA);
            }
            if ( typeNode === "[object Function]" || ( typeNode === "[object String]" && k != "outerText" && k != "innerText" ) ||
                typeNode === "[object Number]" ||
                typeNode === "[object Boolean]"
                ){
                li.innerHTML += jsObject[k] ? " -- " + jsObject[k] : "";
            }
            if ( ( typeNode === "[object String]" && k == "outerText" && k == "innerText" ) )
                li.innerHTML += "<code>omissis...</code>";
            ul.appendChild(li);
        })(k);
    };
    docfrag.appendChild(ul);
    return docfrag;
};