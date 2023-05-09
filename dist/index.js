"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClearCache = exports.useCache = exports.CacheProvider = void 0;
const CacheContext_1 = require("./context/CacheContext");
Object.defineProperty(exports, "CacheProvider", { enumerable: true, get: function () { return CacheContext_1.CacheProvider; } });
const useCache_1 = __importDefault(require("./hooks/useCache"));
exports.useCache = useCache_1.default;
const useClearCache_1 = __importDefault(require("./hooks/useClearCache"));
exports.useClearCache = useClearCache_1.default;
