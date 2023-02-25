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
const react_1 = require("react");
const CacheContext_1 = require("../context/CacheContext");
function useCache(key, funct, defaultValue = undefined) {
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
    const [data, setData] = (0, react_1.useState)(defaultValue);
    const getData = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield getCache(key, funct);
        setData(res);
    });
    (0, react_1.useEffect)(() => {
        getData();
    }, [key]);
    return [data, trigger];
}
exports.default = useCache;
