"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CacheContext_1 = require("../context/CacheContext");
function useCache(key, funct) {
    const { getCache, triggerCache } = (0, react_1.useContext)(CacheContext_1.CacheContext);
    const trigger = (fn) => {
        if (fn != undefined) {
            triggerCache(key, fn);
            return;
        }
        if (fn == undefined) {
            triggerCache(key, funct);
            return;
        }
    };
    return [getCache(key, funct), trigger];
}
exports.default = useCache;
