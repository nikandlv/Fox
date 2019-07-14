import undefsafe from "undefsafe";
let onPublishListeners = [];
let onUnpublishListeners = [];
let onUpdateListeners = [];
var fox = {};
let log_level = 'ALL';
let LOG_EVENT = 'EVENT';
let LOG_ACTION = 'ACTION';
function log(str,type) {
	if(type !== log_level && log_level !== 'ALL') {
		return;
	}
    console.log("🦊 "+str)
}
var manager = {
	setLogLevel: (level) => {
		log_level = level;
    },
    publish: (keys, fun, callback = ()=>{}) => {
        let dummy = fox;
        const keylist = keys.split(".");
        const key = keylist.pop();
        const pointer = keylist.reduce((accumulator, currentValue) => {
            if (accumulator[currentValue] === undefined)
                accumulator[currentValue] = {};
            return accumulator[currentValue];
        }, dummy);
        const is_first = typeof pointer[key] === 'undefined';
        pointer[key] = fun;
        fox = dummy;
        if(!is_first) {
            log("Updated:"+keys,LOG_ACTION);
            if (typeof onUpdateListeners[keys] !== "undefined") {
                onUpdateListeners[keys].map((changeCallback) => {
                    return changeCallback(fun)
                });
            }
        } else {
            log("Published:"+keys,LOG_ACTION);
            if (typeof onPublishListeners[keys] !== "undefined") {
                onPublishListeners[keys].map((callback) => {
                    return callback(fun)
                });
                onPublishListeners[keys] = []
            }
        }
        callback()
    },
    unpublish: (keys,callback = ()=>{}) => {
        const dummy = fox;
        const keyList = keys.split(".");
        const key = keyList.pop();
        const pointer = keyList.reduce((accumulator, currentValue) => {
            if (accumulator[currentValue] === undefined)
                accumulator[currentValue] = {};
            return accumulator[currentValue];
        }, dummy);
        delete pointer[key];
        fox = dummy;
        log("Unpublished:"+keys,LOG_ACTION);
        if (typeof onUnpublishListeners[keys] !== "undefined") {
            onUnpublishListeners[keys].map((callback) => {
                return callback(fun)
            });
            onUnpublishListeners[keys] = []
        }
        callback()
    },
    get: (item,default_value)=> {
        let res = undefsafe(fox,item);
        if(typeof  res === 'undefined') {
            return default_value
        }
        return res;
    },
    onPublish: (item, callback) => {
        const target = item.split(".").reduce((p, c) => (p && p[c]) || null, fox);
        if (target !== null) {
            callback(target);
        } else {
            if (typeof onPublishListeners[item] === "undefined") {
                onPublishListeners[item] = [];
            }
            onPublishListeners[item].push(callback)
        }
    },
    onUnpublish: (item, callback) => {
        if (typeof onUnpublishListeners[item] === "undefined") {
            onUnpublishListeners[item] = [];
        }
        onUnpublishListeners[item].push(callback)
    },
    onUpdate: (item, callback) => {
        if (typeof onUpdateListeners[item] === "undefined") {
            onUpdateListeners[item] = [];
        }
        onUpdateListeners[item].push(callback)
    }
};
export {fox,manager};