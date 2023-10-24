function useClearCache() {
  const clearCache = () => {
    window.localStorage.clear();
  };
  return { clearCache };
}
export default useClearCache;
