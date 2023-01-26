import { useContext } from "react";
import { CacheContext, ICacheContext } from "../context/CacheContext";
function useClearCache() {
  const { clearCache } = useContext(CacheContext) as ICacheContext;
  return { clearCache };
}
export default useClearCache;
