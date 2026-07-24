'use client';

import React, { useState, useEffect } from 'react';
import { User, MapPin, Camera, Settings, BookOpen, MessageCircle, Heart, History, LogOut } from 'lucide-react';
import { DUMMY_POSTS } from '@/lib/dummy';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const { isLoggedIn, logout, profileNickname, profileRegion, saveProfile, setRedirectUrl, isInitialized } = useAuth();
  const router = useRouter();
  const [profileState, setProfileState] = useState<'welcome' | 'create' | 'view'>('welcome');
  
  // Local Profile Form States
  const [nicknameInput, setNicknameInput] = useState('');
  const [regionInput, setRegionInput] = useState('부산진구');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop');
  const [activeFilter, setActiveFilter] = useState('전체');

  // Sync profile display state with actual global auth and profile details
  useEffect(() => {
    if (!isInitialized) return;

    if (isLoggedIn) {
      if (profileNickname) {
        setProfileState('view');
      } else {
        setProfileState('create');
      }
    } else {
      setProfileState('welcome');
      setRedirectUrl('/mypage');
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      router.replace('/auth');
    }
  }, [isLoggedIn, profileNickname, isInitialized, router, setRedirectUrl]);

  const handleCreateProfile = () => {
    if (!nicknameInput.trim()) {
      alert('닉네임을 입력해 주세요!');
      return;
    }
    if (nicknameInput.length > 8) {
      alert('닉네임은 8글자 이내여야 합니다.');
      return;
    }
    // Persist details to global AuthContext (which saves in localStorage)
    saveProfile(nicknameInput, regionInput);
    setProfileState('view');
  };

  const handleResetProfile = () => {
    logout();
    setNicknameInput('');
    setProfileState('welcome');
    router.push('/');
  };

  // Prevent flash of welcome screen during initialization
  if (!isInitialized) {
    return (
      <div className="flex-1 flex items-center justify-center bg-brand-bg text-brand-primary">
        <div className="text-xs font-bold opacity-60">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden bg-brand-bg text-brand-primary">
      {/* 1. Welcome! 프로필 생성 유도 화면 (초기 사용자) */}
      {profileState === 'welcome' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2" style={{ fontFamily: 'sans-serif' }}>
            Welcome!
          </h2>
          <h3 className="text-3xl font-extrabold tracking-tight text-brand-primary mb-8" style={{ fontFamily: 'sans-serif' }}>
            Wt&apos;in
          </h3>
          <button 
            onClick={() => {
              setRedirectUrl('/mypage');
              alert('로그인 후 이용할 수 있는 영역입니다. 로그인 페이지로 안내합니다.');
              router.push('/auth');
            }}
            className="px-8 py-3.5 bg-brand-primary text-brand-bg font-extrabold text-sm rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            프로필 만들기
          </button>
        </div>
      )}

      {/* 2. 프로필 정보 입력 화면 */}
      {profileState === 'create' && (
        <div className="flex-1 flex flex-col p-6 justify-between overflow-y-auto animate-fade-in-up">
          <div>
            <h3 className="text-xl font-extrabold mb-6 text-center">프로필 정보 입력</h3>
            
            {/* REQ-02. 사진첩에서 고르기 placeholder */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-primary/10 shadow-sm bg-brand-primary/5">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                <button 
                  onClick={() => alert('MVP 데모: 이미지 선택 기능이 실행됩니다.')}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-primary text-brand-bg flex items-center justify-center border-2 border-brand-bg hover:scale-105 active:scale-95 transition-transform"
                >
                  <Camera className="w-4.5 h-4.5" />
                </button>
              </div>
              <span className="text-[10px] font-bold opacity-60">프로필 사진 고르기</span>
            </div>

            {/* REQ-03. 닉네임 입력 (8글자 한도) */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold mb-1.5 opacity-80">닉네임 (8글자 이내)</label>
                <input 
                  type="text" 
                  value={nicknameInput} 
                  onChange={(e) => setNicknameInput(e.target.value.slice(0, 8))}
                  placeholder="예: 빈티지러버" 
                  className="w-full h-11 px-4 rounded-xl border border-brand-primary/15 bg-white/50 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>

              {/* REQ-04. 도시만 선택 */}
              <div>
                <label className="block text-xs font-extrabold mb-1.5 opacity-80">지역 선택 (부산 도시선택)</label>
                <select 
                  value={regionInput} 
                  onChange={(e) => setRegionInput(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-brand-primary/15 bg-white/50 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all"
                >
                  {['부산진구', '수영구', '해운대구', '중구', '금정구', '동래구'].map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={handleCreateProfile}
            className="w-full h-13 rounded-2xl bg-brand-primary text-brand-bg font-extrabold text-sm flex items-center justify-center mt-8 active:scale-[0.99] transition-all cursor-pointer shadow-md"
          >
            만들기
          </button>
        </div>
      )}

      {/* 3. 프로필 완성 및 마이페이지 화면 */}
      {profileState === 'view' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden animate-fade-in-up">
          {/* Header */}
          <header className="flex h-14 items-center justify-between border-b border-brand-primary/10 px-4 bg-brand-bg/90 backdrop-blur-md flex-shrink-0">
            <h2 className="text-xl font-extrabold tracking-tight text-brand-primary">마이프로필</h2>
            <button 
              onClick={handleResetProfile}
              className="p-2 rounded-full hover:bg-brand-primary/5 active:scale-95 transition-all text-red-500 flex items-center gap-1 text-xs font-bold"
            >
              <LogOut className="h-4.5 w-4.5" />
              로그아웃
            </button>
          </header>

          {/* User Profile Overview */}
          <div className="p-5 flex items-center gap-4 border-b border-brand-primary/5 flex-shrink-0">
            <img src={profileImage} alt="User Profile" className="w-16 h-16 rounded-full object-cover border border-brand-primary/10" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base">{profileNickname}</span>
                <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-[9px] font-bold text-brand-primary">Lv.3 빈티지 콜렉터</span>
              </div>
              <p className="text-xs text-brand-primary/65 font-medium mt-1 flex items-center gap-0.5">
                <MapPin className="w-3.5 h-3.5" /> {profileRegion}
              </p>
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="grid grid-cols-3 py-3 border-b border-brand-primary/5 bg-brand-primary/[0.02] text-center flex-shrink-0">
            <div>
              <span className="block text-xs text-brand-primary/55 font-bold">내가 쓴 글</span>
              <span className="text-sm font-extrabold text-brand-primary mt-0.5 block">12</span>
            </div>
            <div className="border-x border-brand-primary/10">
              <span className="block text-xs text-brand-primary/55 font-bold">댓글 수</span>
              <span className="text-sm font-extrabold text-brand-primary mt-0.5 block">28</span>
            </div>
            <div>
              <span className="block text-xs text-brand-primary/55 font-bold">저장한 가게</span>
              <span className="text-sm font-extrabold text-brand-primary mt-0.5 block">15</span>
            </div>
          </div>

          {/* REQ-05. 내가 쓴 글 보기 리스트 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-brand-primary/5 flex-shrink-0">
              <h4 className="font-extrabold text-xs text-brand-primary/75 tracking-wider uppercase mb-2">내가 쓴 글</h4>
              
              {/* Category selector chips (synchronized layout style with community page) */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {['전체', '옷 정보', '코디', '질문', '자유'].map((filter) => {
                  const isSelected = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-brand-primary text-brand-bg'
                          : 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable list of user posts */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-none">
              {DUMMY_POSTS.slice(0, 2).map((post) => (
                <div key={post.id} className="p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/5 flex gap-3 cursor-pointer hover:bg-brand-primary/[0.08] transition-all">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-brand-primary/10 flex-shrink-0">
                    <img src={post.thumbnailUrl} alt="post thumb" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <h5 className="font-bold text-xs truncate">{post.title}</h5>
                    <p className="text-[10px] text-brand-primary/70 line-clamp-1">{post.snippet}</p>
                    <div className="flex items-center gap-2 mt-1 text-[9px] text-brand-primary/50 font-bold">
                      <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5" /> {post.likes}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle className="w-2.5 h-2.5" /> {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
