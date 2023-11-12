'use client';
import { useState, useEffect } from 'react';

function useWindow(): Window | undefined {
  const [windowObject, setWindowObject] = useState<Window | undefined>(
    undefined
  );

  useEffect(() => {
    setWindowObject(window);
  }, []);

  return windowObject;
}

export default useWindow;
