'use client';

import React, { useState } from 'react';
import { Search, Bell, Heart, MessageCircle, PenSquare, Eye, ArrowUpDown } from 'lucide-react';
import { DUMMY_POSTS } from '@/lib/dummy';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [sortType, setSortType] = useState<'recommend' | 'popular'>('recommend'); // 추천순 <-> 인기순 토글
  const router = useRouter();
  const { isLoggedIn, setRedirectUrl } = useAuth();

  // Handle post clicks, redirect if unauthenticated (Simulated soft-wall: REQ-07)
  const handlePostClick = (postId: string) => {
    if (!isLoggedIn) {
      setRedirectUrl(`/community`);
      alert('로그인이 필요한 상세 게시글 페이지입니다. 로그인 페이지로 안내합니다.');
      router.push('/auth');
    } else {
      alert('MVP 데모: 상세 게시글 읽기 기능이 활성화되었습니다.');
    }
  };

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      setRedirectUrl(`/write`);
      alert('글쓰기는 로그인이 필요합니다. 로그인 페이지로 안내합니다.');
      router.push('/auth');
    } else {
      router.push('/write');
    }
  };

  // Toggle dynamic sort order
  const toggleSortType = () => {
    setSortByToggle();
  };

  const setSortByToggle = () => {
    setSortType(prev => prev === 'recommend' ? 'popular' : 'recommend');
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden bg-brand-bg text-brand-primary relative">
      {/* Upper Header Bar */}
      <header className="flex h-14 items-center justify-between border-b border-brand-primary/10 px-4 bg-brand-bg/90 backdrop-blur-md sticky top-0 z-40">
        <h2 className="text-2xl font-extrabold tracking-tight text-brand-primary cursor-pointer select-none" style={{ fontFamily: 'sans-serif' }}>
          Wt&apos;in
        </h2>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-brand-primary/5 active:scale-95 transition-all">
            <Search className="h-5 w-5 stroke-[2.2px]" />
          </button>
          <button className="p-2 rounded-full hover:bg-brand-primary/5 active:scale-95 transition-all relative">
            <Bell className="h-5 w-5 stroke-[2.2px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1B2D54] rounded-full border-2 border-brand-bg" />
          </button>
        </div>
      </header>

      {/* REQ-01 당근 스타일 단일 추천순/인기순 토글 버튼 및 REQ-02 카테고리 필터 영역 */}
      <div className="border-b border-brand-primary/5 bg-brand-bg flex-shrink-0 flex items-center justify-between px-4 py-2 gap-2">
        {/* Toggle Sort Button (Always active color, toggles recommend <-> popular) */}
        <button 
          onClick={toggleSortType}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary text-brand-bg text-xs font-black shadow-sm active:scale-95 transition-transform whitespace-nowrap cursor-pointer"
        >
          <ArrowUpDown className="h-3 w-3 stroke-[2.8px]" />
          {sortType === 'recommend' ? '추천순' : '인기순'}
        </button>

        {/* Category Filter Chips (Horizontal Swiper) */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {['전체', '스토어', '제품', '코디', '자유'].map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                  isSelected
                    ? 'bg-brand-primary/15 text-brand-primary'
                    : 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Feed List */}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-none px-4 pt-4 space-y-4">
        {DUMMY_POSTS.map((post) => (
          <article 
            key={post.id} 
            onClick={() => handlePostClick(post.id)}
            className="p-4 bg-brand-primary/5 hover:bg-brand-primary/[0.08] active:scale-[0.99] rounded-2xl border border-brand-primary/5 flex gap-4 transition-all cursor-pointer"
          >
            {/* REQ-03 1:1 사진 (우측 하단 모서리에 사진 갯수 1/4 표시) */}
            <div className="relative w-24 h-24 bg-brand-primary/10 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={post.thumbnailUrl} 
                alt={post.title} 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white font-extrabold text-[8px] tracking-widest shadow-sm">
                1/4
              </div>
            </div>

            {/* Left/Middle Column: Post Contents */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                {/* User Info Bar (작성자 프로필 & 닉네임) */}
                <div className="flex items-center gap-2 mb-1.5">
                  <img 
                    src={post.userProfileUrl} 
                    alt={post.userNickname} 
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className="text-[10px] font-extrabold text-brand-primary/80">{post.userNickname}</span>
                  <span className="text-[8px] text-brand-primary/45 font-semibold">{post.timeAgo}</span>
                </div>
                
                {/* REQ-04 제목 1줄, 글 2줄 이내 제한 */}
                <h4 className="font-extrabold text-sm text-brand-primary truncate leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs text-brand-primary/70 mt-1 line-clamp-2 leading-relaxed font-medium">
                  {post.snippet}
                </p>
              </div>

              {/* REQ-05 조회수 & 댓글수 수치 표기 */}
              <div className="flex items-center gap-3.5 mt-2.5 text-brand-primary/60">
                <span className="flex items-center gap-1 text-[9px] font-bold">
                  <Eye className="h-3 w-3 stroke-[2px]" />
                  {sortType === 'recommend' ? post.likes * 6 : post.likes * 12}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-bold">
                  <MessageCircle className="h-3 w-3 stroke-[2px]" />
                  {post.comments}
                </span>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* REQ-09 글쓰기 플로팅 버튼 (로그인 제어 연동) */}
      <button 
        onClick={handleWriteClick}
        className="absolute bottom-20 right-6 w-12 h-12 rounded-full bg-brand-primary text-brand-bg shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
        aria-label="글 작성하기"
      >
        <PenSquare className="h-5 w-5" />
      </button>
    </div>
  );
}
