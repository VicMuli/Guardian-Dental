import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 50,
    className = '',
    as: Tag = 'h1',
}) => {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLElement>(null);

    // Start typing only when the element scrolls into view
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Type one character at a time
    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) return;

        const timer = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);

        return () => clearTimeout(timer);
    }, [started, displayed, text, speed]);

    return (
        <Tag ref={ref as any} className={className}>
            {displayed}
            {displayed.length < text.length && (
                <span className="typewriter-cursor">&nbsp;</span>
            )}
        </Tag>
    );
};

export default TypewriterText;
