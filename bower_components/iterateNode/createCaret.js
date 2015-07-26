function createCaret(li,jsObject,countObj){
    var caretA = document.createElement("a");
    caretA.href="javascript:void()";
    caretA.className="caretA";
    var caret = document.createElement("span");
    caret.className = "caret";
    caretA.addEventListener("click",function(e){
        e.preventDefault();
        e.stopPropagation();
        var ulChild = li.querySelectorAll("ul")[0];
        if ( !ulChild )
        {
            var newId = countObj+"-";
            li.appendChild( iterateNode(jsObject, newId) );
        }

        var path = /open/g;
        if ( path.test( caret.className ) )
        {
            caret.className = caret.className.replace(path, "");
            ulChild.className+=" simpleHide";
        }
        else{
            caret.className+=" open";
            if ( ulChild ) ulChild.className = ulChild.className.replace(/simpleHide/g, "");
        }

    },false);
    caretA.appendChild(caret);
    return caretA;
}