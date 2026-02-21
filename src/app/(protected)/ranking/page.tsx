"use client";

import { useEffect, useState } from "react";

import { fetchTopRanking, fetchMyRanking } from "@/lib/api/ranking.api";

import { RankingUser } from "@/types/ranking";
import RankMedal from "@/components/ranking/RankMedal";
import TopNavBar from "@/components/layout/TopNavBar";

export default function RankingPage() {
  const [topUsers, setTopUsers] = useState<RankingUser[]>([]);
  const [myRank, setMyRank] = useState<RankingUser | null>(null);

  // 로그인 여부
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const isLoggedIn = !!token;

  useEffect(() => {
    async function load() {
      try {
        // TOP 5 (회원, 비회원)
        const top = await fetchTopRanking();
        setTopUsers(top);
      } catch (e) {
        console.error("Top Ranking API Error", e);
      }

      // 내 랭킹 (회원)
      if (isLoggedIn) {
        try {
          const me = await fetchMyRanking();
          setMyRank(me);
        } catch (e) {
          console.error("My Ranking API Error", e);
        }
      }
    }

    load();
  }, [isLoggedIn]);

  return (
    <div>
      <TopNavBar />
      <div className="px-6 pt-10 pb-20">
        {/* 타이틀 */}
        <div className="mt-2">
          <p className="text-h2_m text-primary-dark">
            추천이 모여 취향이 된 순간들
          </p>
          <h1 className="text-h0_m mt-4">TOP 5</h1>
        </div>

        {/* TOP 5 */}
        <div className="mt-10 space-y-8">
          {topUsers.map((user) => (
            <div key={user.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <RankMedal rank={user.rank} />
                <span className="text-h2_m text-primary-dark">
                  {user.nickname}
                </span>
              </div>
              <span className="text-h2_m text-gray-text2">
                {user.reviewCount}개
              </span>
            </div>
          ))}
        </div>

        {/* 점선 */}
        <div className="flex flex-col items-center mt-6 text-primary-dark">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>

        {/* 내 랭킹 */}
        <div className="mt-6 bg-gray-bg rounded-xl px-3 py-5 flex justify-between items-center">
          {isLoggedIn && myRank ? (
            <>
              <div className="flex gap-4 items-center">
                <span className="text-h2_sb w-6 text-center">
                  {myRank.rank}
                </span>
                <span className="text-h2_m text-primary-dark">
                  {myRank.nickname}
                </span>
              </div>
              <span className="text-h2_m text-gray-text2">
                {myRank.reviewCount}개
              </span>
            </>
          ) : (
            <>
              <span className="px-5 text-h2_m">-</span>
              <span className="px-6 text-h2_m text-gray-text2">
                로그인 후 자기 랭킹을 확인해보세요
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
