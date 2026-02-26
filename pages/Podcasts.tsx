import React, { useState, useRef, useEffect } from 'react';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
    Play, Pause, Volume2, VolumeX,
    Calendar, Clock, User, Mic, ChevronDown, ChevronUp,
} from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import TypewriterText from '../components/TypewriterText';

// ── Types ────────────────────────────────────────────────────────────────────

interface Episode {
    slug: string;
    title: string;
    date: string;
    episode?: number;
    thumbnail?: string;
    audio: string;
    duration?: string;
    description: string;
    guest?: string;
    body: string;
}

// ── Markdown loader ───────────────────────────────────────────────────────────

const mdModules = import.meta.glob('/content/podcasts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
});

function loadEpisodes(): Episode[] {
    return Object.entries(mdModules)
        .map(([filePath, raw]) => {
            const { data, content } = matter(raw as string);
            const slug = filePath.replace('/content/podcasts/', '').replace(/\.md$/, '');

            return {
                slug,
                title: data.title ?? slug,
                date: data.date ? String(data.date) : '',
                episode: data.episode ?? undefined,
                thumbnail: data.thumbnail ?? undefined,
                audio: data.audio ?? '',
                duration: data.duration ?? undefined,
                description: data.description ?? '',
                guest: data.guest ?? undefined,
                body: content,
            } satisfies Episode;
        })
        .sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
}

function formatDate(raw: string): string {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Custom Audio Player ───────────────────────────────────────────────────────

const AudioPlayer: React.FC<{ src: string; title: string }> = ({ src, title }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);   // 0–100
    const [currentTime, setCurrentTime] = useState('0:00');
    const [totalTime, setTotalTime] = useState('0:00');
    const animRef = useRef<number>(0);

    const fmt = (s: number) => {
        if (!isFinite(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    const tick = () => {
        const el = audioRef.current;
        if (!el || !el.duration) return;
        const pct = (el.currentTime / el.duration) * 100;
        setProgress(pct);
        setCurrentTime(fmt(el.currentTime));
        animRef.current = requestAnimationFrame(tick);
    };

    const togglePlay = () => {
        const el = audioRef.current;
        if (!el) return;
        if (el.paused) {
            el.play();
            setPlaying(true);
            animRef.current = requestAnimationFrame(tick);
        } else {
            el.pause();
            setPlaying(false);
            cancelAnimationFrame(animRef.current);
        }
    };

    const toggleMute = () => {
        const el = audioRef.current;
        if (!el) return;
        el.muted = !el.muted;
        setMuted(el.muted);
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = audioRef.current;
        const bar = progressRef.current;
        if (!el || !bar || !el.duration) return;
        const rect = bar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        el.currentTime = pct * el.duration;
        setProgress(pct * 100);
    };

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        const onLoaded = () => setTotalTime(fmt(el.duration));
        const onEnded = () => { setPlaying(false); setProgress(0); setCurrentTime('0:00'); };
        el.addEventListener('loadedmetadata', onLoaded);
        el.addEventListener('ended', onEnded);
        return () => {
            el.removeEventListener('loadedmetadata', onLoaded);
            el.removeEventListener('ended', onEnded);
            cancelAnimationFrame(animRef.current);
        };
    }, [src]);

    // No audio source — render a placeholder
    if (!src) {
        return (
            <div className="mt-4 bg-slate-100 rounded-xl px-4 py-3 text-sm text-slate-400 flex items-center gap-2">
                <Mic size={15} />
                Audio file not yet uploaded
            </div>
        );
    }

    return (
        <div className="mt-4 bg-slate-900 rounded-2xl p-4 space-y-3">
            <audio ref={audioRef} src={src} preload="metadata" />

            {/* Progress bar */}
            <div
                ref={progressRef}
                onClick={seek}
                className="relative h-1.5 bg-slate-700 rounded-full cursor-pointer group"
            >
                <div
                    className="h-full bg-primary-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
                {/* Scrubber thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity -ml-1.5"
                    style={{ left: `${progress}%` }}
                />
            </div>

            {/* Controls row */}
            <div className="flex items-center gap-4">
                {/* Play / Pause */}
                <button
                    onClick={togglePlay}
                    aria-label={playing ? 'Pause' : 'Play'}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-600
                     hover:bg-primary-500 active:scale-95 transition-all shrink-0 shadow-lg shadow-primary-600/30"
                >
                    {playing
                        ? <Pause size={18} className="text-white" />
                        : <Play size={18} className="text-white ml-0.5" />}
                </button>

                {/* Times */}
                <span className="text-xs font-mono text-slate-400 tabular-nums">
                    {currentTime} / {totalTime}
                </span>

                {/* Title (truncated) */}
                <span className="flex-1 text-xs text-slate-400 truncate hidden sm:block">{title}</span>

                {/* Mute */}
                <button
                    onClick={toggleMute}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>
        </div>
    );
};

// ── Episode Card ──────────────────────────────────────────────────────────────

const EpisodeCard: React.FC<{ ep: Episode }> = ({ ep }) => {
    const cardRef = useScrollAnimation<HTMLDivElement>();
    const [expanded, setExpanded] = useState(false);
    const showNotes = ep.body.trim();
    const htmlNotes = showNotes ? (marked(showNotes) as string) : '';

    return (
        <div
            ref={cardRef}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden
                 hover:shadow-lg transition-shadow duration-300 scroll-hidden"
        >
            <div className="flex flex-col sm:flex-row gap-0">
                {/* Cover art */}
                <div className="sm:w-44 sm:h-auto shrink-0">
                    {ep.thumbnail ? (
                        <img
                            src={ep.thumbnail}
                            alt={ep.title}
                            className="w-full h-44 sm:h-full object-cover img-reveal"
                        />
                    ) : (
                        <div className="w-full h-44 sm:h-full bg-gradient-to-br from-primary-600 to-primary-800
                            flex items-center justify-center">
                            <Mic size={48} className="text-white/60" />
                        </div>
                    )}
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                    {/* Episode badge + guest */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {ep.episode != null && (
                            <span className="text-xs font-bold bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
                                EP {ep.episode}
                            </span>
                        )}
                        {ep.guest && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <User size={12} />
                                Guest: <strong className="text-slate-700 ml-0.5">{ep.guest}</strong>
                            </span>
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug">{ep.title}</h2>

                    {ep.description && (
                        <p className="text-slate-500 text-sm leading-relaxed mb-1">{ep.description}</p>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3">
                        {ep.date && (
                            <span className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                {formatDate(ep.date)}
                            </span>
                        )}
                        {ep.duration && (
                            <span className="flex items-center gap-1.5">
                                <Clock size={12} />
                                {ep.duration}
                            </span>
                        )}
                    </div>

                    {/* ── HTML5 Audio Player ── */}
                    <AudioPlayer src={ep.audio} title={ep.title} />

                    {/* Show notes toggle */}
                    {showNotes && (
                        <button
                            onClick={() => setExpanded((v) => !v)}
                            className="mt-4 flex items-center gap-1.5 text-sm text-primary-600 font-medium
                         hover:text-primary-700 transition-colors"
                        >
                            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            {expanded ? 'Hide show notes' : 'Show notes'}
                        </button>
                    )}

                    {/* Show notes body */}
                    {expanded && showNotes && (
                        <div
                            className="mt-4 pt-4 border-t border-slate-100
                         prose prose-sm prose-slate max-w-none
                         prose-headings:font-bold prose-headings:text-slate-900
                         prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-slate-800"
                            dangerouslySetInnerHTML={{ __html: htmlNotes }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
    <div className="text-center py-24">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic size={40} className="text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">No episodes yet</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
            Episodes you publish through the CMS will appear here automatically.
        </p>
    </div>
);

// ── Main Podcasts Page ────────────────────────────────────────────────────────

const Podcasts: React.FC = () => {
    const [episodes] = useState<Episode[]>(() => loadEpisodes());

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <TypewriterText
                        text="Our Podcast"
                        as="h1"
                        speed={55}
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                    />
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Expert conversations on oral health, patient care, and the latest in dentistry —
                        straight from the Guardian Dental team.
                    </p>
                </div>
            </div>

            {/* Episodes List */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {episodes.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-8">
                            {episodes.map((ep) => (
                                <EpisodeCard key={ep.slug} ep={ep} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Podcasts;
