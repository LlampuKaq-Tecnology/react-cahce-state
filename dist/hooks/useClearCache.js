"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CacheContext_1 = require("../context/CacheContext");
function useClearCache() {
    const { clearCache } = (0, react_1.useContext)(CacheContext_1.CacheContext);
    return { clearCache };
}
exports.default = useClearCache;
