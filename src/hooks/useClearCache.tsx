import { useContext } from "react";
import { CacheContext, ICacheContext } from "../context/CacheContext";
function useClearCache() {
  const { setcache } = useContext(CacheContext) as any;
  const clearCache = () => {
    setcache([]);
  };
  return { clearCache };
}
export default useClearCache;
