/**
 * useStackedSections
 * Pins every `.page-section` inside the container so the next section slides
 * over it (stacked-cards scroll). Sections taller than the viewport are pinned
 * by their bottom edge so their full content can still be read.
 *
 * @param ref - container element that holds the `.page-section` children
 */

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useStackedSections(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sections = gsap.utils.toArray<HTMLElement>('.page-section', root);

    const ctx = gsap.context(() => {
      sections.forEach((section, i) => {
        section.classList.add('fe-stacked-section');
        section.style.zIndex = String(i + 1);

        if (i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          });
        }
      });
    }, root);

    // Re-measure once images/fonts settle or the layout changes size.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(root);
    window.addEventListener('load', refresh);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      if (timer) clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('load', refresh);
      ctx.revert();
      sections.forEach((section) => {
        section.classList.remove('fe-stacked-section');
        section.style.zIndex = '';
      });
    };
  }, [ref]);
}
