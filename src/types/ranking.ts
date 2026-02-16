export interface RankingUser {
  nickname: string;
  rank: number;
  reviewCount: number;
}

export interface RankingResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: RankingUser[];
}

export interface MyRankingResponse {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: RankingUser;
}
