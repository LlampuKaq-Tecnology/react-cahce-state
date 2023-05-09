/// <reference types="react" />
export declare const CacheContext: import("react").Context<{}>;
export interface ICacheContext {
    getCache: (id: string, fn?: () => any) => any;
    triggerCache: (id: any, data: any) => void;
    clearCache: () => void;
    cache?: any;
}
export declare const CacheProvider: ({ children }: {
    children: any;
}) => JSX.Element;
