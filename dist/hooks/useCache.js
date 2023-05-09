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
    const encryptedKey = crypto_js_1.default.AES.encrypt(key, "secret-key").toString();
    const triggerCache = (value) => __awaiter(this, void 0, void 0, function* () {
        const res = cache.filter((x) => x.id !== encryptedKey);
        const encryptedValue = crypto_js_1.default.AES.encrypt(JSON.stringify(value), "secret-key").toString();
        res.push({ data: encryptedValue, id: encryptedKey });
        setcache([...res]);
    });
    const getCache = () => __awaiter(this, void 0, void 0, function* () {
        const res = cache === null || cache === void 0 ? void 0 : cache.find((x) => x.id === encryptedKey);
        if (res === undefined) {
            setData(defaultValue);
        }
        else {
            const decryptedData = crypto_js_1.default.AES.decrypt(res.data, "secret-key").toString(crypto_js_1.default.enc.Utf8);
            setData(JSON.parse(decryptedData));
        }
    });
    getCache();
    return [data, triggerCache];
}
exports.default = useCache;
