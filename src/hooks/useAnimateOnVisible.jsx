import { useState, useEffect, useRef, useCallback } from 'react';

const useAnimateOnVisible = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.2,
  } = options;

  const observerCallback = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Reset isVisible when the element leaves the viewport
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerCallback, root, rootMargin, threshold]);

  return { ref, isVisible };
};

export default useAnimateOnVisible;