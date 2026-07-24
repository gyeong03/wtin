export interface VintageShop {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  userNickname: string;
  userProfileUrl: string;
  title: string;
  snippet: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export const DUMMY_SHOPS: VintageShop[] = [
  {
    id: 'shop-1',
    name: '오래된 물건들',
    location: '부산진구 전포동',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=300&auto=format&fit=crop',
    rating: 4.8,
    tags: ['빈티지 의류', '남녀 공용', '벨트/악세사리']
  },
  {
    id: 'shop-2',
    name: '나그네빈티지',
    location: '수영구 광안동',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=300&auto=format&fit=crop',
    rating: 4.6,
    tags: ['아메카지', '워크웨어', '밀리터리']
  },
  {
    id: 'shop-3',
    name: '빈티지 보물선',
    location: '부산진구 부전동',
    imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=300&auto=format&fit=crop',
    rating: 4.7,
    tags: ['브랜드 구제', '명품 빈티지']
  },
  {
    id: 'shop-4',
    name: '부산덱스터',
    location: '중구 남포동',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=300&auto=format&fit=crop',
    rating: 4.9,
    tags: ['폴로', '타미', '대형 매장']
  }
];

export const DUMMY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    userNickname: '빈티지러버',
    userProfileUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    title: '여름 데님 코디 추천해 주세요!',
    snippet: '부산에서 데님으로 코디하기 좋은 빈티지 가게나 아이템 추천 부탁드려요! 서면 전포동 위주면 더 좋습니다.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=300&auto=format&fit=crop',
    likes: 24,
    comments: 15,
    timeAgo: '2시간 전'
  },
  {
    id: 'post-2',
    userNickname: '광안리파도',
    userProfileUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    title: '부산 빈티지 마켓 정보 공유해요',
    snippet: '이번 주말 광안리에서 빈티지 팝업 마켓이 열린다고 합니다. 여러 셀러들이 참여하는 것 같아요.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=300&auto=format&fit=crop',
    likes: 38,
    comments: 24,
    timeAgo: '4시간 전'
  },
  {
    id: 'post-3',
    userNickname: '전포동토박이',
    userProfileUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    title: '이 가게 아시는 분? 후기 궁금해요!',
    snippet: '전포동 골목 안쪽에 새로 생긴 작은 빈티지 가게가 있던데 혹시 다녀오신 분 계신가요? 간판이 특이하네요.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=300&auto=format&fit=crop',
    likes: 12,
    comments: 9,
    timeAgo: '1일 전'
  }
];
