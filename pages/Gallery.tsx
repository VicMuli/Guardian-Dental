import React, { useState, useEffect, useCallback } from 'react';
import matter from 'gray-matter';
import { Images, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import TypewriterText from '../components/TypewriterText';
import clsx from 'clsx';

// ── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
    image: string;
    caption?: string;
    alt?: string;
}

interface GalleryCollection {
    slug: string;
    title: string;
    category: string;
    description?: string;
    order: number;
    images: GalleryImage[];
}

// Flat item used in the grid
interface FlatImage extends GalleryImage {
    collectionTitle: string;
    category: string;
    index: number; // position within its collection
}

// ── Markdown loader ───────────────────────────────────────────────────────────

const mdModules = import.meta.glob('/content/gallery/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
});

const CATEGORY_LABELS: Record<string, string> = {
    'all': 'All',
    'before-after': 'Before & After',
    'clinic-tour': 'Clinic Tour',
    'team-photos': 'Team Photos',
    'events': 'Events',
    'general': 'General',
};

function loadCollections(): GalleryCollection[] {
    return Object.entries(mdModules)
        .map(([filePath, raw]) => {
            const { data } = matter(raw as string);
            const slug = filePath.replace('/content/gallery/', '').replace(/\.md$/, '');

            return {
                slug,
                title: data.title ?? slug,
                category: data.category ?? 'general',
                description: data.description ?? '',
                order: Number(data.order ?? 0),
                images: Array.isArray(data.images) ? (data.images as GalleryImage[]) : [],
            } satisfies GalleryCollection;
        })
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

function flattenImages(collections: GalleryCollection[]): FlatImage[] {
    return collections.flatMap((col) =>
        col.images.map((img, i) => ({
            ...img,
            collectionTitle: col.title,
            category: col.category,
            index: i,
        }))
    );
}

function uniqueCategories(collections: GalleryCollection[]): string[] {
    const cats = [...new Set(collections.map((c) => c.category))];
    return cats.sort((a, b) => (CATEGORY_LABELS[a] ?? a).localeCompare(CATEGORY_LABELS[b] ?? b));
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
    images: FlatImage[];
    startIndex: number;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
    const [idx, setIdx] = useState(startIndex);
    const cur = images[idx];

    const prev = useCallback(
        () => setIdx((i) => (i - 1 + images.length) % images.length),
        [images.length]
    );
    const next = useCallback(
        () => setIdx((i) => (i + 1) % images.length),
        [images.length]
    );

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next, onClose]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white/70 hover:text-white
                   bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
                aria-label="Close lightbox"
            >
                <X size={22} />
            </button>

            {/* Prev */}
            {images.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="absolute left-4 md:left-8 text-white/70 hover:text-white
                     bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={26} />
                </button>
            )}

            {/* Image */}
            <div
                className="max-w-5xl w-full mx-16 flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    key={cur.image}
                    src={cur.image}
                    alt={cur.alt ?? cur.caption ?? cur.collectionTitle}
                    className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl
                     animate-[fadeIn_0.2s_ease-out]"
                />
                {(cur.caption || cur.collectionTitle) && (
                    <div className="text-center">
                        {cur.caption && (
                            <p className="text-white font-medium text-lg">{cur.caption}</p>
                        )}
                        <p className="text-white/50 text-sm mt-1">
                            {cur.collectionTitle} &nbsp;·&nbsp; {idx + 1} / {images.length}
                        </p>
                    </div>
                )}
            </div>

            {/* Next */}
            {images.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="absolute right-4 md:right-8 text-white/70 hover:text-white
                     bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                    aria-label="Next image"
                >
                    <ChevronRight size={26} />
                </button>
            )}
        </div>
    );
};

// ── Image Card ────────────────────────────────────────────────────────────────

const ImageCard: React.FC<{
    img: FlatImage;
    flatIndex: number;
    onOpen: (i: number) => void;
}> = ({ img, flatIndex, onOpen }) => {
    const cardRef = useScrollAnimation<HTMLDivElement>();

    return (
        <div
            ref={cardRef}
            onClick={() => onOpen(flatIndex)}
            className="group relative overflow-hidden rounded-2xl bg-slate-100 cursor-pointer
                 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                 scroll-hidden aspect-[4/3]"
        >
            {/* Image */}
            <img
                src={img.image}
                alt={img.alt ?? img.caption ?? img.collectionTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform
                   duration-500 img-reveal"
                loading="lazy"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col
                      justify-end p-4">
                {img.caption && (
                    <p className="text-white font-medium text-sm leading-snug">{img.caption}</p>
                )}
                <p className="text-white/60 text-xs mt-1">{img.collectionTitle}</p>
            </div>

            {/* Zoom icon */}
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={15} className="text-white" />
            </div>
        </div>
    );
};

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
    <div className="text-center py-24">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Images size={40} className="text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">No photos yet</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
            Gallery collections you publish through the CMS will appear here automatically.
        </p>
    </div>
);

// ── Main Gallery Page ─────────────────────────────────────────────────────────

const Gallery: React.FC = () => {
    const [collections] = useState<GalleryCollection[]>(() => loadCollections());
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const allFlat = flattenImages(collections);
    const categories = uniqueCategories(collections);
    const showFilters = categories.length > 1;

    const filtered: FlatImage[] = activeCategory === 'all'
        ? allFlat
        : allFlat.filter((img) => img.category === activeCategory);

    // Re-map lightbox index to the filtered list
    const openLightbox = (flatIdx: number) => setLightboxIndex(flatIdx);

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <TypewriterText
                        text="Our Gallery"
                        as="h1"
                        speed={55}
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                    />
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A look inside Guardian Dental — our clinic, our team, and the smiles we help create.
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">

                    {/* Category Filter Pills */}
                    {showFilters && allFlat.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {['all', ...categories].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={clsx(
                                        'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                                        activeCategory === cat
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                            : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-600'
                                    )}
                                >
                                    {CATEGORY_LABELS[cat] ?? cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Grid or Empty */}
                    {allFlat.length === 0 ? (
                        <EmptyState />
                    ) : filtered.length === 0 ? (
                        <p className="text-center text-slate-400 py-20">
                            No images in this category yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filtered.map((img, i) => (
                                <ImageCard
                                    key={`${img.collectionTitle}-${img.index}`}
                                    img={img}
                                    flatIndex={i}
                                    onOpen={openLightbox}
                                />
                            ))}
                        </div>
                    )}

                    {/* Image count */}
                    {filtered.length > 0 && (
                        <p className="text-center text-slate-400 text-sm mt-10">
                            Showing {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
                            {activeCategory !== 'all' && ` in ${CATEGORY_LABELS[activeCategory] ?? activeCategory}`}
                        </p>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={filtered}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
};

export default Gallery;
