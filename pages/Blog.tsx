import React, { useState, useEffect, useMemo } from 'react';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Calendar, Clock, User, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../components/useScrollAnimation';
import TypewriterText from '../components/TypewriterText';

// ── Types ────────────────────────────────────────────────────────────────────

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    author: string;
    tags: string[];
    thumbnail?: string;
}

interface Post extends PostMeta {
    content: string;
}

// ── Markdown loader ───────────────────────────────────────────────────────────

// Eagerly import every .md file from /content/blog at build time
const mdModules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true });

function loadPosts(): Post[] {
    return Object.entries(mdModules)
        .map(([filePath, raw]) => {
            const { data, content } = matter(raw as string);
            const slug = filePath
                .replace('/content/blog/', '')
                .replace(/\.md$/, '');

            return {
                slug,
                title: data.title ?? slug,
                date: data.date ? String(data.date) : '',
                description: data.description ?? '',
                author: data.author ?? 'Guardian Dental Team',
                tags: Array.isArray(data.tags) ? data.tags : [],
                thumbnail: data.thumbnail ?? undefined,
                content,
            } satisfies Post;
        })
        .sort((a, b) => {
            // newest first
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

function readingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

// ── Post Card ─────────────────────────────────────────────────────────────────

const PostCard: React.FC<{ post: PostMeta; onClick: () => void }> = ({ post, onClick }) => {
    const cardRef = useScrollAnimation<HTMLDivElement>();

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer scroll-hidden"
        >
            {/* Thumbnail */}
            {post.thumbnail ? (
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 img-reveal"
                    />
                </div>
            ) : (
                <div className="h-52 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                    <BookOpen size={56} className="text-primary-300" />
                </div>
            )}

            {/* Content */}
            <div className="p-6">
                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium bg-primary-50 text-primary-600 px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                    {post.title}
                </h2>

                {post.description && (
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.description}
                    </p>
                )}

                {/* Meta row */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                        <User size={13} />
                        {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(post.date)}
                    </span>
                </div>
            </div>
        </div>
    );
};

// ── Post Detail ───────────────────────────────────────────────────────────────

const PostDetail: React.FC<{ post: Post; onBack: () => void }> = ({ post, onBack }) => {
    const html = useMemo(() => marked(post.content) as string, [post.content]);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 text-xs font-medium bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full"
                                >
                                    <Tag size={11} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                        <span className="flex items-center gap-2">
                            <User size={15} />
                            {post.author}
                        </span>
                        {post.date && (
                            <span className="flex items-center gap-2">
                                <Calendar size={15} />
                                {formatDate(post.date)}
                            </span>
                        )}
                        <span className="flex items-center gap-2">
                            <Clock size={15} />
                            {readingTime(post.content)} min read
                        </span>
                    </div>
                </div>
            </div>

            {/* Thumbnail */}
            {post.thumbnail && (
                <div className="container mx-auto px-4 max-w-3xl -mt-8">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full rounded-2xl shadow-xl object-cover max-h-96"
                    />
                </div>
            )}

            {/* Body */}
            <article className="container mx-auto px-4 max-w-3xl py-12">
                <div
                    className="prose prose-lg prose-slate max-w-none
                     prose-headings:font-bold prose-headings:text-slate-900
                     prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-slate-800
                     prose-img:rounded-2xl prose-img:shadow-lg
                     prose-blockquote:border-l-primary-600 prose-blockquote:bg-primary-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </article>

            {/* Back button (bottom) */}
            <div className="container mx-auto px-4 max-w-3xl pb-16">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to all posts
                </button>
            </div>
        </div>
    );
};

// ── Empty State ───────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
    <div className="text-center py-24">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">No posts yet</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
            Blog posts you publish through the CMS will appear here automatically.
        </p>
    </div>
);

// ── Main Blog Page ────────────────────────────────────────────────────────────

const Blog: React.FC = () => {
    const [posts] = useState<Post[]>(() => loadPosts());
    const [activePost, setActivePost] = useState<Post | null>(null);
    const headerRef = useScrollAnimation<HTMLDivElement>();

    // Scroll to top when opening / closing a post
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activePost]);

    if (activePost) {
        return <PostDetail post={activePost} onBack={() => setActivePost(null)} />;
    }

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <TypewriterText
                        text="Our Blog"
                        as="h1"
                        speed={55}
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                    />
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Dental tips, patient stories, and the latest news from the Guardian Dental team.
                    </p>
                </div>
            </div>

            {/* Post Grid */}
            <section className="py-20">
                <div ref={headerRef} className="container mx-auto px-4">
                    {posts.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.slug}
                                    post={post}
                                    onClick={() => setActivePost(post)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
