"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CacheContext_1 = require("../context/CacheContext");
function useClearCache() {
    const { setcache } = (0, react_1.useContext)(CacheContext_1.CacheContext);
    const clearCache = () => {
        setcache([]);
    };
    return { clearCache };
}
exports.default = useClearCache;
