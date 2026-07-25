'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Star, Bookmark, X } from 'lucide-react';
import { DUMMY_SHOPS } from '@/lib/dummy';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapPage() {
  const [selectedShop, setSelectedShop] = useState<typeof DUMMY_SHOPS[0] | null>(DUMMY_SHOPS[0]);
  const [bookmarkedShops, setBookmarkedShops] = useState<string[]>(['shop-1']);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const toggleBookmark = (shopId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = bookmarkedShops.includes(shopId)
      ? bookmarkedShops.filter(id => id !== shopId)
      : [...bookmarkedShops, shopId];
    setBookmarkedShops(updated);
  };

  // Re-draw markers when bookmark status changes to update color visual
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    
    // Clear old markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const kakao = window.kakao;

    DUMMY_SHOPS.forEach((shop) => {
      const isBookmarked = bookmarkedShops.includes(shop.id);
      
      // Marker image configuration (Orange pin for bookmark, Brand Blue pin for default)
      const markerImageUrl = isBookmarked
        ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png' // orange/star marker
        : 'https://t1.daumcdn.net/mapjsapi/images/2x/marker.png'; // default blue marker
      
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, imageSize);

      const markerPosition = new kakao.maps.LatLng(shop.lat || 35.1558, shop.lng || 129.0660);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        title: shop.name
      });

      marker.setMap(mapRef.current);
      markersRef.current.push(marker);

      // Bind click handler to marker
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedShop(shop);
      });
    });
  }, [bookmarkedShops, mapLoaded]);

  // Load and initialize Kakao Map
  useEffect(() => {
    const initMap = () => {
      const kakao = window.kakao;
      if (kakao && kakao.maps) {
        kakao.maps.load(() => {
          if (!mapContainerRef.current) return;
          const options = {
            center: new kakao.maps.LatLng(35.1558, 129.0660),
            level: 7
          };
          const mapInstance = new kakao.maps.Map(mapContainerRef.current, options);
          mapRef.current = mapInstance;
          setMapLoaded(true);
        });
      }
    };

    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      // Dynamic fallback checking for SDK load completion
      const interval = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          initMap();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full w-full overflow-hidden bg-brand-bg text-brand-primary relative">
      {/* Search overlay inside map */}
      <div className="absolute top-4 inset-x-4 z-20 flex gap-2">
        <div className="flex-1 h-12 bg-white/90 backdrop-blur-md rounded-2xl border border-brand-primary/10 px-4 flex items-center shadow-md">
          <Search className="h-5 w-5 text-brand-primary/45 mr-2.5" />
          <input 
            type="text" 
            placeholder="동네 또는 구제샵 검색..." 
            className="flex-1 bg-transparent text-sm font-bold border-none outline-none placeholder:text-brand-primary/45"
          />
        </div>
      </div>

      {/* Real Kakao Map Area */}
      <div ref={mapContainerRef} className="absolute inset-0 z-10 w-full h-full bg-[#DEE5D4]" />

      {/* Bottom Sheet Card Panel */}
      {selectedShop && (
        <div className="absolute bottom-20 inset-x-4 z-30 bg-white/95 backdrop-blur-md border border-brand-primary/10 rounded-3xl p-5 shadow-2xl animate-fade-in-up flex flex-col gap-4">
          
          {/* Header Row: shop name, close button, bookmark button */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-brand-primary">{selectedShop.name}</h3>
              <p className="text-xs text-brand-primary/60 mt-0.5 font-bold flex items-center gap-0.5">
                <MapPin className="w-3.5 h-3.5 inline" /> {selectedShop.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Bookmark toggle */}
              <button 
                onClick={(e) => toggleBookmark(selectedShop.id, e)}
                className={`p-2 rounded-full border transition-all ${
                  bookmarkedShops.includes(selectedShop.id) 
                    ? 'border-orange-500 bg-orange-50 text-orange-500' 
                    : 'border-brand-primary/15 hover:bg-brand-primary/5'
                }`}
                aria-label="북마크"
              >
                <Bookmark className="w-4.5 h-4.5 fill-current" />
              </button>
              {/* Close panel */}
              <button 
                onClick={() => setSelectedShop(null)}
                className="p-2 rounded-full border border-brand-primary/15 hover:bg-brand-primary/5 transition-all"
                aria-label="닫기"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Shop sign images swiper row */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
            <img src={selectedShop.imageUrl} alt="가게간판 1" className="w-24 h-24 rounded-2xl object-cover border border-brand-primary/5 flex-shrink-0" />
            <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=200&auto=format&fit=crop" alt="가게매장 2" className="w-24 h-24 rounded-2xl object-cover border border-brand-primary/5 flex-shrink-0" />
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=200&auto=format&fit=crop" alt="가게매장 3" className="w-24 h-24 rounded-2xl object-cover border border-brand-primary/5 flex-shrink-0" />
          </div>

          {/* Details Row: Rating, Hours, average price info */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-brand-primary/5 pt-3.5 text-xs font-bold text-brand-primary/80">
            <div>
              <span className="text-brand-primary/45 block text-[10px] uppercase tracking-wider mb-0.5">운영시간</span>
              11:00 - 21:00 (화요일 휴무)
            </div>
            <div>
              <span className="text-brand-primary/45 block text-[10px] uppercase tracking-wider mb-0.5">평균 가격대</span>
              3만원 - 5만원선
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <Star className="h-4.5 w-4.5 fill-amber-400 stroke-amber-400" />
              <span>{selectedShop.rating} (리뷰 32개)</span>
            </div>
            <div className="flex justify-end mt-1.5">
              {/* Write Review mock button */}
              <button 
                onClick={() => alert('리뷰 남기기 페이지로 이동합니다 (준비 중)')}
                className="px-3.5 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary text-[10px] font-extrabold hover:bg-brand-primary/10 active:scale-95 transition-all"
              >
                리뷰 남기기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
