/* eslint-disable @next/next/no-img-element */
'use client';

import { memo, useEffect, useState } from 'react';
import './styles.css';

/**
 *
 * @todo:
 * - The button should always be at the right bottom of the page
 * - The button should be hidden and should only appear when we scroll for a certain height eg: ~200px
 * - On clicking it, we should be smoothly taken to the top of the page
 *
 *
 */
function ScrollToTopButton() {
  const isHidden = useScrollTopButton();

  // We should be smoothly taken to the top of the page with this.
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="btn-container">
      <button
        className="btn right-bottom-btn"
        onClick={handleScrollTop}
        // Opacity is used to hide the btn to preserve the inial layout.
        style={{ opacity: isHidden ? '0%' : '100%' }}
      >
        Go to Top
      </button>
    </div>
  );
}

export default memo(ScrollToTopButton);

// The Logic of the hooks that handle the button state was moved
// From the rest of the ScrollToTopButton to keep the code clean.
function useScrollTopButton() {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // The button only appear when we scroll for a height of: ~200px
      setIsHidden(window.scrollY < 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isHidden;
}
