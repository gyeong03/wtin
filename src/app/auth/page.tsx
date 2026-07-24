'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  const handleBack = () => {
    // Force history back navigation to return to the exact page the user was looking at
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleMockLogin = () => {
    alert('MVP 데모용 로그인 알림: 로그인이 완료되었습니다!');
    // Redirect to home after login for MVP experience
    router.push('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-bg text-brand-primary p-6 justify-between h-full w-full">
      {/* Back Button */}
      <div className="flex h-10 items-center">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full hover:bg-brand-primary/5 active:scale-95 transition-all"
        >
          <ArrowLeft className="h-6 w-6 stroke-[2.2px]" />
        </button>
      </div>

      {/* Brand Logo & Title */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="animate-fade-in-up flex flex-col items-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-brand-primary" style={{ fontFamily: 'sans-serif' }}>
            Wt&apos;in
          </h1>
          <p className="mt-3 text-sm font-semibold tracking-[0.25em] text-brand-primary/65">
            부산 빈티지 연결하다
          </p>
        </div>
      </div>

      {/* Social and Email Sign-in Buttons */}
      <div className="space-y-3 w-full pb-8">
        <button 
          onClick={handleMockLogin}
          className="w-full h-13 rounded-2xl bg-[#FEE500] text-[#191919] font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
        >
          {/* Kakao Icon placeholder */}
          <span className="w-5 h-5 bg-[#191919] rounded-full flex items-center justify-center text-[10px] text-[#FEE500] font-black">K</span>
          카카오로 시작하기
        </button>

        <button 
          onClick={handleMockLogin}
          className="w-full h-13 rounded-2xl bg-[#000000] text-[#FFFFFF] font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] text-black font-black">A</span>
          Apple로 시작하기
        </button>

        <button 
          onClick={handleMockLogin}
          className="w-full h-13 rounded-2xl bg-[#FFFFFF] text-[#191919] border border-brand-primary/10 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">G</span>
          Google로 시작하기
        </button>

        <button 
          onClick={handleMockLogin}
          className="w-full h-13 rounded-2xl bg-brand-primary text-brand-bg font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
        >
          이메일로 가입 / 로그인
        </button>
      </div>
    </div>
  );
}
