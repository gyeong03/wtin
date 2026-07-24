'use client';

import React from 'react';

export default function MyPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-brand-primary">
      <div className="text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-2">마이페이지</h2>
        <p className="text-sm opacity-60">내가 작성한 글, 댓글, 북마크 샵들을 한 눈에 확인하세요</p>
      </div>
    </div>
  );
}
