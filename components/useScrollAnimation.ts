import { useEffect, useRef } from 'react';

/**
 * Attach this ref to any element that has scroll-hidden / scroll-hidden-left /
 * scroll-hidden-right / scroll-hidden-scale class to animate it into view.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('scroll-visible');
                    observer.unobserve(el); // animate only once
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
