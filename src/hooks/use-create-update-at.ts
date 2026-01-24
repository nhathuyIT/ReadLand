export function useTimestamp() {
  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  return {
    getCurrentTimestamp,
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  };
}
