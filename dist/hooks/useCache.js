"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const crypto_js_1 = __importDefault(require("crypto-js"));
const CacheContext_1 = require("../context/CacheContext");
function useCache(key, defaultValue) {
    const [data, setData] = (0, react_1.useState)(defaultValue);
    const { cache, setcache } = (0, react_1.useContext)(CacheContext_1.CacheContext);
    const triggerCache = (value) => {
        const encryptedValue = crypto_js_1.default.AES.encrypt(JSON.stringify(value), "secret-key").toString();
        setcache((prevCache) => {
            const res = prevCache === null || prevCache === void 0 ? void 0 : prevCache.filter((x) => x.id !== key);
            res.push({ data: encryptedValue, id: key });
            return [...res];
        });
        setData(value);
    };
    (0, react_1.useEffect)(() => {
        const res = cache === null || cache === void 0 ? void 0 : cache.find((x) => x.id === key);
        if (res === undefined) {
            setData(defaultValue);
            const encryptedValue = crypto_js_1.default.AES.encrypt(JSON.stringify(defaultValue), "secret-key").toString();
            const newCache = [...cache, { data: encryptedValue, id: key }];
            setcache(newCache);
        }
        else {
            const decryptedData = crypto_js_1.default.AES.decrypt(res.data, "secret-key").toString(crypto_js_1.default.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);
            if (parsedData !== data) {
                setData(parsedData);
            }
        }
    }, []);
    return [data, triggerCache];
}
exports.default = useCache;
