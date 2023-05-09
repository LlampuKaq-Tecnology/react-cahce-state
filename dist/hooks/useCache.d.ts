export default function useCache<T>(key: string, defaultValue: T): [data: T, fn: (data: any) => void];
