LavaPack.loadBundle([[351,{},function(){with(this.scopeTerminator)with(this.globalThis)return function(){"use strict";return function(e,n,t){let o=chrome.runtime.connect({name:"trezor-connect"});o.onMessage.addListener((e=>{window.postMessage(e,window.location.origin)})),o.onDisconnect.addListener((e=>{o=null})),window.addEventListener("message",(e=>{o&&e.source===window&&e.data&&o.postMessage({data:e.data})}))}}},{package:"$root$",file:"app/vendor/trezor/content-script.js"}]],[351],{});