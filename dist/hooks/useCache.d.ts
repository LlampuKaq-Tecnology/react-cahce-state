declare function useCache<T>(key: string, funct: () => Promise<T>, defaultValue?: any): [data: T, trigger: (fn?: any) => void];
export default useCache;
