'use client';

import React, { useState } from 'react';
import { Search, MapPin, Star, Bookmark, X, RefreshCw } from 'lucide-react';
import { DUMMY_SHOPS } from '@/lib/dummy';

export default function MapPage() {
  const [selectedShop, setSelectedShop] = useState<typeof DUMMY_SHOPS[0] | null>(DUMMY_SHOPS[0]);
  const [bookmarkedShops, setBookmarkedShops] = useState<string[]>(['shop-1']); // Bookmarked state

  const toggleBookmark = (shopId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedShops.includes(shopId)) {
      setBookmarkedShops(bookmarkedShops.filter(id => id !== shopId));
    } else {
      setBookmarkedShops([...bookmarkedShops, shopId]);
    }
  };

  const handleMarkerClick = (shop: typeof DUMMY_SHOPS[0]) => {
    setSelectedShop(shop);
  };

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

      {/* Map Area (Kakao Map Placeholder with pins) */}
      <div className="absolute inset-0 z-10 bg-[#DEE5D4] overflow-hidden">
        {/* Abstract vector grid for design feeling */}
        <div 
          className="w-full h-full bg-cover bg-center opacity-85 filter contrast-125"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')` }}
        />
        
        {/* Soft overlay filter for road feels */}
        <div className="absolute inset-0 bg-brand-primary/10 pointer-events-none" />

        {/* Map markers (REQ-02: Bookmark highlights pin color to orange) */}
        {DUMMY_SHOPS.map((shop, i) => {
          const isBookmarked = bookmarkedShops.includes(shop.id);
          const pinColor = isBookmarked ? 'bg-orange-500 text-white' : 'bg-brand-primary text-brand-bg';
          
          // Coordinate distribution on preview map
          const positions = [
            { top: '35%', left: '30%' },
            { top: '55%', left: '65%' },
            { top: '42%', left: '75%' },
            { top: '24%', left: '55%' }
          ];
          const pos = positions[i % positions.length];

          return (
            <button
              key={shop.id}
              onClick={() => handleMarkerClick(shop)}
              className={`absolute ${pos.top} ${pos.left} -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg z-20 hover:scale-110 active:scale-95 transition-all cursor-pointer ${pinColor}`}
            >
              <MapPin className="w-5 h-5 fill-current stroke-current" />
            </button>
          );
        })}
      </div>

      {/* Bottom Sheet Card Panel (REQ-01 / REQ-02 / REQ-04) */}
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
              {/* REQ-02: Bookmark toggle */}
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
              {/* REQ-04: Close panel (back to map view) */}
              <button 
                onClick={() => setSelectedShop(null)}
                className="p-2 rounded-full border border-brand-primary/15 hover:bg-brand-primary/5 transition-all"
                aria-label="닫기"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* REQ-01: Shop sign images swiper row */}
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
              {/* REQ-03: Write Review mock button */}
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
