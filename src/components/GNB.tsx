'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home as HomeIcon, MapPin, PlusSquare, MessageSquare, User } from 'lucide-react';

interface GNBProps {
  isLoggedIn?: boolean;
}

export default function GNB({ isLoggedIn = false }: GNBProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: 'home', label: '홈', icon: HomeIcon, path: '/' },
    { id: 'map', label: '지도', icon: MapPin, path: '/map' },
    { id: 'write', label: '글쓰기', icon: PlusSquare, path: '/write', requireAuth: true },
    { id: 'community', label: '커뮤니티', icon: MessageSquare, path: '/community' },
    { id: 'mypage', label: '마이페이지', icon: User, path: '/mypage', requireAuth: true },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.requireAuth && !isLoggedIn) {
      e.preventDefault();
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      router.push('/auth');
    }
  };

  const [splashDismissed, setSplashDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSplashDismissed(!!sessionStorage.getItem('splash_dismissed'));
      
      const handleStorage = () => {
        setSplashDismissed(!!sessionStorage.getItem('splash_dismissed'));
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, []);

  // Hide GNB in auth page for a clean fullscreen login experience
  if (pathname === '/auth') return null;

  // Prevent GNB showing on splash loading screen
  if (!splashDismissed && pathname === '/') {
    return null;
  }

  return (
    <nav className="h-16 border-t border-brand-primary/10 bg-brand-bg/95 backdrop-blur-md flex items-center justify-around px-2 z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.id}
            href={item.path}
            onClick={(e) => handleNavClick(e, item)}
            className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-150 active:scale-95 ${
              isActive ? 'text-brand-primary scale-105' : 'text-brand-primary/45 hover:text-brand-primary/75'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[10px] font-bold mt-1 tracking-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
