import { useEffect, useState } from 'react';

const useTimer = (callback: () => void, interval: number) => {
  useEffect(() => {
    const timer = setInterval(callback, interval);
    return () => clearInterval(timer);
  }, [callback, interval]);
};

export default useTimer;
