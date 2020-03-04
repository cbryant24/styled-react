import { useLayoutEffect } from 'react';

export default () => {
  console.log('AM I GETTING TO OUTER');
  useLayoutEffect(() => {
    // Get original body overflow
    console.log('IM THE USE LAYOUT STUFF');
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    console.log('IM THE USE LAYOUT STUFF', originalStyle);

    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
};
