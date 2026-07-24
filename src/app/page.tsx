'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Home as HomeIcon, MapPin, PlusSquare, MessageSquare, User, Star, Heart, MessageCircle } from 'lucide-react';
import { DUMMY_SHOPS, DUMMY_POSTS } from '@/lib/dummy';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'write' | 'community' | 'mypage'>('home');
  const [activeFilter, setActiveFilter] = useState('인기순');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden bg-brand-bg text-brand-primary">
      {/* Splash Screen */}
      {showSplash && (
        <div 
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg transition-opacity duration-500 ease-in-out"
        >
          <div className="animate-fade-in-up flex flex-col items-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-brand-primary" style={{ fontFamily: 'sans-serif' }}>
              Wt&apos;in
            </h1>
            <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-brand-primary/65">
              부산 빈티지 연결하다
            </p>
          </div>
        </div>
      )}

      {/* App Layout Structure */}
      <div className="flex flex-col h-full w-full">
        {/* Upper Header Bar */}
        <header className="flex h-14 items-center justify-between border-b border-brand-primary/10 px-4 bg-brand-bg/90 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-primary cursor-pointer select-none" style={{ fontFamily: 'sans-serif' }}>
            Wt&apos;in
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-brand-primary/5 active:scale-95 transition-all" aria-label="Search">
              <Search className="h-5 w-5 stroke-[2.2px]" />
            </button>
            <button className="p-2 rounded-full hover:bg-brand-primary/5 active:scale-95 transition-all relative" aria-label="Notifications">
              <Bell className="h-5 w-5 stroke-[2.2px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1B2D54] rounded-full border-2 border-brand-bg" />
            </button>
          </div>
        </header>

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto pb-4 scrollbar-none">
          {/* 1. Category Filter Chips (Horizontal Swiper) */}
          <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
            {['인기순', '스토어', '제품', '코디', '자유'].map((filter) => {
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

          {/* 2. Map Widget Area */}
          <div className="px-4 mb-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-brand-primary/10 shadow-sm bg-brand-primary/5 group cursor-pointer">
              {/* Map background placeholder styling */}
              <div 
                className="absolute inset-0 bg-cover bg-center filter grayscale-[30%] opacity-90 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')` }}
              />
              {/* Soft overlay mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
              
              {/* Map widget information panel */}
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between z-10">
                <div>
                  <h4 className="text-white font-extrabold text-lg drop-shadow-sm">지도에서 가게 찾기</h4>
                  <p className="text-white/80 text-xs mt-0.5 font-medium drop-shadow-sm">내 근처 샵 정보와 위치 바로 확인</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-brand-bg font-extrabold text-xs rounded-full shadow-md hover:scale-105 active:scale-95 transition-all">
                  <MapPin className="h-3.5 w-3.5" />
                  지도 보기
                </button>
              </div>

              {/* Pins floating on map placeholder for design feeling */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-brand-primary border-2 border-brand-bg rounded-full animate-bounce shadow-md" />
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-brand-primary border-2 border-brand-bg rounded-full animate-pulse shadow-md" />
            </div>
          </div>

          {/* 3. Today's Pick (Horizontal Swiper) */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h3 className="font-extrabold text-lg text-brand-primary">오늘의 추천 가게</h3>
              <button className="text-xs font-bold text-brand-primary/60 hover:text-brand-primary">전체보기</button>
            </div>

            <div className="flex gap-4.5 overflow-x-auto px-4 pb-2 scrollbar-none">
              {DUMMY_SHOPS.map((shop) => (
                <div 
                  key={shop.id} 
                  className="flex-shrink-0 w-36 bg-brand-bg border border-brand-primary/10 rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="relative aspect-square w-full bg-brand-primary/5 overflow-hidden">
                    <img 
                      src={shop.imageUrl} 
                      alt={shop.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-brand-bg/95 backdrop-blur-sm flex items-center gap-0.5 shadow-sm">
                      <Star className="h-2.5 w-2.5 fill-amber-400 stroke-amber-400" />
                      <span className="text-[9px] font-bold text-brand-primary">{shop.rating}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-xs truncate text-brand-primary">{shop.name}</h4>
                    <p className="text-[10px] text-brand-primary/65 truncate mt-0.5 font-medium">{shop.location.split(' ').slice(1).join(' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Community Feed */}
          <div>
            <div className="flex items-center justify-between px-4 mb-3">
              <h3 className="font-extrabold text-lg text-brand-primary">최근 커뮤니티 글</h3>
              <button className="text-xs font-bold text-brand-primary/60 hover:text-brand-primary">전체보기</button>
            </div>

            <div className="px-4 space-y-4">
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
            </div>
          </div>
        </main>

        {/* Bottom GNB Navigation Bar */}
        <nav className="h-16 border-t border-brand-primary/10 bg-brand-bg/95 backdrop-blur-md flex items-center justify-around px-2 z-40">
          {[
            { id: 'home', label: '홈', icon: HomeIcon },
            { id: 'map', label: '지도', icon: MapPin },
            { id: 'write', label: '글쓰기', icon: PlusSquare },
            { id: 'community', label: '커뮤니티', icon: MessageSquare },
            { id: 'mypage', label: '마이페이지', icon: User }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-150 cursor-pointer ${
                  isActive ? 'text-brand-primary scale-105' : 'text-brand-primary/45 hover:text-brand-primary/75'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                <span className="text-[10px] font-bold mt-1 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Global CSS animations inside style tag */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Hide default scrollbars for swipers */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
