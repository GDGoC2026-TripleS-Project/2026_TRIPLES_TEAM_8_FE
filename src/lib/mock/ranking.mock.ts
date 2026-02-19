import { RankingResponse, MyRankingResponse } from "@/types/ranking";

export const mockRankingResponse: RankingResponse = {
  status: 200,
  success: true,
  code: "RANKING_LIST_OK",
  message: "상위 5위 랭킹 조회 성공",
  data: [
    { rank: 1, nickname: "줄리 기니피그", reviewCount: 50 },
    { rank: 2, nickname: "산책 중인 오리", reviewCount: 48 },
    { rank: 3, nickname: "야생의 너구리", reviewCount: 45 },
    { rank: 4, nickname: "나무 위 다람쥐", reviewCount: 30 },
    { rank: 5, nickname: "길 잃은 병아리", reviewCount: 28 },
  ],
};

export const mockMyRankingResponse: MyRankingResponse = {
  status: 200,
  success: true,
  code: "RANKING_ME_OK",
  message: "내 랭킹 조회 성공",
  data: {
    rank: 12,
    nickname: "사랑에 빠진 토끼",
    reviewCount: 4,
  },
};
