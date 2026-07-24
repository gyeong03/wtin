'use client';

import React, { useState } from 'react';
import { Search, Bell, Heart, MessageCircle } from 'lucide-react';
import { DUMMY_POSTS } from '@/lib/dummy';

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('전체');

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden bg-brand-bg text-brand-primary">
      {/* Upper Header Bar */}
      <header className="flex h-14 items-center justify-between border-b border-brand-primary/10 px-4 bg-brand-bg/90 backdrop-blur-md sticky top-0 z-40">
        <h2 className="text-2xl font-extrabold tracking-tight text-brand-primary cursor-pointer select-none">
          커뮤니티
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

      {/* Category Filter Chips (Horizontal Swiper) */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none flex-shrink-0">
        {['전체', '스토어', '제품', '코디', '자유'].map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-brand-primary text-brand-bg shadow-sm'
                  : 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Scrollable Feed List */}
      <main className="flex-1 overflow-y-auto pb-4 scrollbar-none px-4 space-y-4">
        {DUMMY_POSTS.map((post) => (
          <article 
            key={post.id} 
            className="p-4 bg-brand-primary/5 hover:bg-brand-primary/[0.08] active:scale-[0.99] rounded-2xl border border-brand-primary/5 flex gap-4 transition-all cursor-pointer"
          >
            {/* Left Column: Post Contents */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                {/* User Info Bar */}
                <div className="flex items-center gap-2 mb-1.5">
                  <img 
                    src={post.userProfileUrl} 
                    alt={post.userNickname} 
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[11px] font-extrabold text-brand-primary/80">{post.userNickname}</span>
                  <span className="text-[9px] text-brand-primary/45 font-semibold">{post.timeAgo}</span>
                </div>
                
                {/* Title & Body */}
                <h4 className="font-extrabold text-sm text-brand-primary line-clamp-1 leading-snug">{post.title}</h4>
                <p className="text-xs text-brand-primary/70 mt-1 line-clamp-2 leading-relaxed font-medium">{post.snippet}</p>
              </div>

              {/* Social Interaction Counter */}
              <div className="flex items-center gap-3.5 mt-3 text-brand-primary/60">
                <span className="flex items-center gap-1 text-[10px] font-bold">
                  <Heart className="h-3 w-3 stroke-[2px]" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold">
                  <MessageCircle className="h-3 w-3 stroke-[2px]" />
                  {post.comments}
                </span>
              </div>
            </div>

            {/* Right Column: 1:1 Thumbnail image */}
            <div className="w-20 h-20 bg-brand-primary/10 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={post.thumbnailUrl} 
                alt={post.title} 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
