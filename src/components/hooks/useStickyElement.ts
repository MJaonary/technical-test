/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect } from 'react';

interface UseStickyElementOptions {
  el: MutableRefObject<HTMLElement> | null;
  top?: number;
}

export default function useStickyElement({ el, top }: UseStickyElementOptions) {
  useEffect(() => {
    let animationFrame = 0;
    const handleScroll = () => {
      animationFrame = window.requestAnimationFrame(() => {
        /* Note : This behavior is only valid on desktop (max-width: 768px) */
        if (el !== null) {
          // translate3d() is the most performant since it uses hardware acceleration...
          el.current.style.transform = `translate3d(0, ${window.innerWidth <= 768 ? 0 : window.scrollY}px,0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
}
