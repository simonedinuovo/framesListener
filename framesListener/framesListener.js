"use strict"

/**
 * Created by simone.dinuovo on 30/09/14.
 */

var framesListener = (function(){
    var debug = false;
    if ( !debug ) console.log = function(str){
        return false;
    };
    console.log("framesListener start on ", location.href);
    var origin = "";
    var sources = [];
    if ( window.location.protocol == "file:")
        origin = "*";
    else
        origin = location.protocol + '//' + location.host; //window.location.host.replace(':' + window.location.port,'');

    function handleMessages(e){
        if ( !e.data.body )
            return;

        if ( !e.data.header )
            return;

        if (e.data.header != "handshake")
            return;

        //console.log("handshake received by ",  location.href , "\n from: \n", e.source.location.href);
        console.log("\n data --->", e.data);
        if (e.origin !== origin && window.location.protocol != "file:" )
            return;



        //console.log("handshake accepted by ",  location.href , "\n from: \n", event.source.location.href);
        sources.push({
            window : e.source,
            header : e.data.body
        })
    }

    window.addEventListener("message",handleMessages,false);

    return {
        origin: origin,
        sources:sources,
        listen : function(el , phrase, callback){

            function receiveMessage(event)
            {
                //console.log("message received by ", location.href, "\n from: \n", event.source.location.href);

                // Do we trust the sender of this message?  (might be
                // different from what we originally opened, for example).
                //console.log('event.origin -->', event.origin);
                if (event.origin !== origin && window.location.protocol != "file:"  )
                    return;

                if ( event.data.header != phrase ){
                    console.log(window.location.href," received a message from listener with header " , event.data.header);
                    console.log("different from phrase " , phrase);
                    console.log("%cNOT ACCEPTED.","font-weight:bold;font-size:14px;")
                    return;
                }

                //if (el && event.source.location.href !== el.contentWindow.location.href){
                if (el && event.source !== el.contentWindow){
                    console.log("%cmessage not accepted! \n","font-weight:bold");
                    //console.log("<event.source></event.source>", event.source," refenced with <href></href> ", event.source.location.href);
                    console.log("%cnot equal to","font-weight:bold;font-size:14px;");
                    //console.log("<el.contentWindow></el.contentWindow>", el.contentWindow," refenced with <href></href> ",  el.contentWindow.location.href);
                    return;
                }
                //console.log("message accepted by ", location.href, "\n from: \n", event.source.location.href);
                // event.source is popup
                // event.data is "hi there yourself!  the secret response is: rheeeeet!"

                console.log("callback launched! by " + location.href);
                callback( event, event.data.body );
            };
            if ( el )
            {
                el.contentWindow.postMessage({
                    header : "handshake",
                    body : phrase
                },origin);
                console.log("message of handshake send from ", location.href);
            }
            window.addEventListener("message", receiveMessage, false);
        },
        send: function(msgData){
            var source = this.sources.filter(function(v,i,a){
                 return v.header == msgData.header
            });
            if ( typeof source !== "undefined" )
            {
                console.log("message send succesfully from ", location.href);
                source.forEach(function(v,i,a){
                    v.window.postMessage(msgData, origin);
                });
            }
            else{
                console.log("message tried to be sent from ", location.href);
                console.log("with header", msgData.header);
                console.log("in sources", this.sources);
            }
        },
        destroy : function(){
           window.removeEventListener('message', receiveMessage ,false);
        }
    }

})();