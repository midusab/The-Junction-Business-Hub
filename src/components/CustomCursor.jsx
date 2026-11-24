import {useEffect, useState} from 'react';
import {motion, useMotionValue, useSpring, useReducedMotion} from 'motion/react';

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Smooth springs for outer aura ring
  const smoothX = useSpring(rawMouseX, {stiffness: 400, damping: 28, mass: 0.5});
  const smoothY = useSpring(rawMouseY, {stiffness: 400, damping: 28, mass: 0.5});

  // Snappier spring for central dot
  const dotX = useSpring(rawMouseX, {stiffness: 1000, damping: 40});
  const dotY = useSpring(rawMouseY, {stiffness: 1000, damping: 40});

  useEffect(() => {
    // Disable on coarse pointer devices (touchscreens/mobiles)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Hover detection over interactive targets
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('[role="tab"]') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Scroll animation detection
    let scrollTimer = null;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, {passive: true});
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver, {passive: true});
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [isVisible, rawMouseX, rawMouseY]);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block"
    >
      {/* Outer Follower Aura Ring - expands on hover & pulses on scroll */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? (isScrolling ? 0.9 : 0.75) : 0,
          scale: isClicked
            ? 0.75
            : isHovered
              ? 1.9
              : isScrolling
                ? 1.45
                : 1,
          borderColor: isHovered
            ? '#1e90ff'
            : isScrolling
              ? '#3ea8ff'
              : 'rgba(30, 144, 255, 0.45)',
          backgroundColor: isHovered
            ? 'rgba(30, 144, 255, 0.12)'
            : isScrolling
              ? 'rgba(30, 144, 255, 0.08)'
              : 'rgba(30, 144, 255, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 24,
          mass: 0.4,
        }}
        className="absolute w-9 h-9 rounded-full border-2 will-change-transform shadow-[0_0_12px_rgba(30,144,255,0.25)]"
      />

      {/* Central Precision Follower Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicked
            ? 0.6
            : isHovered
              ? 0.5
              : isScrolling
                ? 1.3
                : 1,
          backgroundColor: isScrolling ? '#3ea8ff' : '#1e90ff',
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
        }}
        className="absolute w-2.5 h-2.5 rounded-full will-change-transform shadow-[0_0_8px_#1e90ff]"
      />
    </div>
  );
}
