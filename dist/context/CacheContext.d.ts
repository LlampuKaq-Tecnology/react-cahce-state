/// <reference types="react" />
export declare const CacheContext: import("react").Context<{}>;
export interface ICacheContext {
    getCache: (id: any, fn: () => any) => any;
    triggerCache: (id: any, data: any) => void;
    clearCache: () => void;
}
export declare const CacheProvider: ({ children }: {
    children: any;
}) => JSX.Element;
