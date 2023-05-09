export default function useCache<T>(key: string, defaultValue: T): (T | ((value: T) => Promise<void>))[];
