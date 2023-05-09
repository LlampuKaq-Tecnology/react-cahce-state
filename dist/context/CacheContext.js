"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheProvider = exports.CacheContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useLocalStorage_1 = require("../hooks/useLocalStorage");
exports.CacheContext = (0, react_1.createContext)({});
const CacheProvider = ({ children }) => {
    const [cache, setcache] = (0, useLocalStorage_1.useLocalStorage)("cache", []);
    return ((0, jsx_runtime_1.jsx)(exports.CacheContext.Provider, Object.assign({ value: { cache, setcache } }, { children: children })));
};
exports.CacheProvider = CacheProvider;
