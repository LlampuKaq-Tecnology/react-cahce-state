export default function useCache<T>(key: string, defaultValue?: T | undefined): [data: T, fn: (data: any) => void];
