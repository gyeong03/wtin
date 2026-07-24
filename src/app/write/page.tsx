'use client';

import React from 'react';

export default function WritePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-brand-bg text-brand-primary">
      <div className="text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-2">글쓰기 페이지</h2>
        <p className="text-sm opacity-60">빈티지 득템 공유 및 자유로운 이야기를 적어보세요</p>
      </div>
    </div>
  );
}
