import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, Eye, Flag, CheckCircle } from 'lucide-react';
import { adminReviews } from '../data/adminData';
import { DeleteModal, PageHeader, FilterTabs, SectionCard, EmptyState } from '../components/AdminUI';

// TODO: Replace with backend API later

const tabs = [
  { value: 'all',       label: 'All Reviews' },
  { value: 'published', label: 'Published'   },
  { value: 'pending',   label: 'Pending'     },
  { value: 'flagged',   label: 'Flagged'     },
];

const statusStyle = {
  published: { bg: '#F0FDF4', color: '#15803D', border: 'rgba(34,197,94,0.2)',   label: 'Published' },
  pending:   { bg: '#FFFBEB', color: '#B45309', border: 'rgba(245,158,11,0.2)',  label: 'Pending'   },
  flagged:   { bg: '#FFF1F2', color: '#BE123C', border: 'rgba(244,63,94,0.2)',   label: 'Flagged'   },
};

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size}
          fill={i <= rating ? '#F59E0B' : 'none'}
          stroke={i <= rating ? '#F59E0B' : '#D1C4B0'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

// Rating distribution bar
function RatingBar({ label, count, total, color }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold w-4 text-right" style={{ color: '#9B7A52' }}>{label}</span>
      <Star size={10} fill="#F59E0B" stroke="#F59E0B" />
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(232,213,176,0.4)' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="h-full rounded-full" style={{ background: color }} />
      </div>
      <span className="text-xs font-semibold w-5" style={{ color: '#9B7A52' }}>{count}</span>
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews]     = useState(adminReviews);
  const [deleteTarget, setDelete] = useState(null);
  const [filter, setFilter]       = useState('all');
  const [expanded, setExpanded]   = useState(null);

  const tabsWithCount = tabs.map(t => ({
    ...t,
    count: t.value === 'all' ? reviews.length : reviews.filter(r => r.status === t.value).length,
  }));

  const filtered = useMemo(() =>
    filter === 'all' ? reviews : reviews.filter(r => r.status === filter),
    [reviews, filter]
  );

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map(n => ({ n, count: reviews.filter(r => r.rating === n).length }));
  const ratingColors = { 5: '#22C55E', 4: '#84CC16', 3: '#F59E0B', 2: '#F97316', 1: '#EF4444' };

  const handlePublish = id => {
    // TODO: Call PATCH /api/admin/reviews/:id/publish
    setReviews(r => r.map(x => x.id === id ? { ...x, status: 'published' } : x));
  };
  const handleFlag = id => {
    // TODO: Call PATCH /api/admin/reviews/:id/flag
    setReviews(r => r.map(x => x.id === id ? { ...x, status: 'flagged' } : x));
  };
  const handleDelete = () => {
    // TODO: Call DELETE /api/admin/reviews/:id
    setReviews(r => r.filter(x => x.id !== deleteTarget.id));
    setDelete(null);
  };

  return (
    <div>
      <PageHeader title="Reviews & Ratings" sub={`${reviews.length} total reviews across all products`} />

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Avg rating */}
        <SectionCard>
          <div className="p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}>
              <Star size={28} fill="#F59E0B" stroke="#F59E0B" />
            </div>
            <div>
              <p className="font-display font-bold text-4xl text-[#1A0A02] leading-none">{avgRating}</p>
              <StarRating rating={Math.round(parseFloat(avgRating))} size={13} />
              <p className="text-xs font-medium mt-1" style={{ color: '#9B7A52' }}>{reviews.length} reviews</p>
            </div>
          </div>
        </SectionCard>

        {/* Rating distribution */}
        <SectionCard className="sm:col-span-2">
          <div className="p-5 space-y-2">
            {ratingCounts.map(({ n, count }) => (
              <RatingBar key={n} label={n} count={count} total={reviews.length} color={ratingColors[n]} />
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 overflow-x-auto pb-1">
        <FilterTabs tabs={tabsWithCount} active={filter} onChange={setFilter} />
      </div>

      {/* Review cards */}
      {filtered.length === 0 ? (
        <EmptyState icon="⭐" message="No reviews found" sub="Try a different filter" />
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((review, i) => {
              const ss = statusStyle[review.status] || statusStyle.pending;
              const isExpanded = expanded === review.id;
              return (
                <motion.div
                  key={review.id} layout
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 280, damping: 26 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(232,213,176,0.35)',
                    boxShadow: '0 2px 0 rgba(232,213,176,0.4), 0 4px 16px rgba(44,26,14,0.05)',
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <img src={review.avatar} alt={review.user}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                          <div>
                            <p className="font-bold text-[#1A0A02] text-sm">{review.user}</p>
                            <p className="text-xs font-medium" style={{ color: '#9B7A52' }}>
                              on <span className="text-[#C0522B] font-semibold">{review.product}</span>
                              {' · '}by {review.karigar}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs font-medium" style={{ color: '#9B7A52' }}>{review.date}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                              style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                              {ss.label}
                            </span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} size={13} />
                          <span className="text-xs font-bold" style={{ color: review.rating >= 4 ? '#15803D' : review.rating === 3 ? '#B45309' : '#BE123C' }}>
                            {review.rating}/5
                          </span>
                        </div>

                        {/* Comment */}
                        <p className="text-sm leading-relaxed" style={{ color: '#3C1E0A' }}>
                          {isExpanded ? review.comment : review.comment.length > 120 ? review.comment.slice(0, 120) + '…' : review.comment}
                        </p>
                        {review.comment.length > 120 && (
                          <button onClick={() => setExpanded(isExpanded ? null : review.id)}
                            className="text-xs font-semibold mt-1 hover:underline" style={{ color: '#C0522B' }}>
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-3 pt-3"
                          style={{ borderTop: '1px solid rgba(232,213,176,0.3)' }}>
                          <span className="text-xs font-medium" style={{ color: '#9B7A52' }}>
                            👍 {review.helpful} found helpful
                          </span>
                          <div className="flex items-center gap-1">
                            {review.status !== 'published' && (
                              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                onClick={() => handlePublish(review.id)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
                                style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid rgba(34,197,94,0.2)' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#DCFCE7'}
                                onMouseLeave={e => e.currentTarget.style.background = '#F0FDF4'}>
                                <CheckCircle size={11} /> Publish
                              </motion.button>
                            )}
                            {review.status !== 'flagged' && (
                              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                onClick={() => handleFlag(review.id)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
                                style={{ background: '#FFFBEB', color: '#B45309', border: '1px solid rgba(245,158,11,0.2)' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#FEF3C7'}
                                onMouseLeave={e => e.currentTarget.style.background = '#FFFBEB'}>
                                <Flag size={11} /> Flag
                              </motion.button>
                            )}
                            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                              onClick={() => setDelete(review)}
                              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                              style={{ color: '#C0B090' }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.color = '#F43F5E'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C0B090'; }}>
                              <Trash2 size={14} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <DeleteModal open={!!deleteTarget} onClose={() => setDelete(null)} onConfirm={handleDelete} label={`review by ${deleteTarget?.user}`} />
    </div>
  );
}
