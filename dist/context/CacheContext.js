"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheProvider = exports.CacheContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useLocalStorage_1 = require("../hooks/useLocalStorage");
exports.CacheContext = (0, react_1.createContext)({});
const CacheProvider = ({ children }) => {
    const [cache, setcache] = (0, useLocalStorage_1.useLocalStorage)("cache", []);
    const triggerCache = (id, fn) => __awaiter(void 0, void 0, void 0, function* () {
        if (typeof fn == "function") {
            const data = yield fn();
            const res = cache.filter((x) => x.id != id);
            res.push({ data, id });
            setcache([...res]);
            return;
        }
        if (typeof fn != "function") {
            const res = cache.filter((x) => x.id != id);
            res.push({ data: fn, id });
            setcache([...res]);
            return;
        }
    });
    const clearCache = () => {
        setcache([]);
    };
    const getCache = (id, fn) => __awaiter(void 0, void 0, void 0, function* () {
        const res = cache === null || cache === void 0 ? void 0 : cache.find((x) => x.id == id);
        if (res == undefined) {
            const rs = yield fn();
            cache.push({ data: rs, id });
            setcache([...cache]);
            return rs;
        }
        else {
            return res.data;
        }
    });
    return ((0, jsx_runtime_1.jsx)(exports.CacheContext.Provider, Object.assign({ value: { getCache, triggerCache, clearCache } }, { children: children })));
};
exports.CacheProvider = CacheProvider;
