"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchMe, updateNickname } from "@/lib/api/user.api";
import { logout, deleteAccount } from "@/lib/api/auth.api";
import { READER_PROFILE_MAP } from "@/lib/utils/readerProfileMap";

import Image from "next/image";
import ConfirmModal from "@/components/common/ConfirmModal";
import BackHeader from "@/components/common/BackHeader";

export default function EditMyPage() {
  const router = useRouter();

  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    nickname: string;
    readerType: string;
    readerTitle: string;
    reviewCount: number;
  }>(null);

  const [nickname, setNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [modalType, setModalType] = useState<"logout" | "withdraw" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const me = await fetchMe();
      setUser(me.data);
      setNickname(me.data.nickname);
    }

    load();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      localStorage.removeItem("accessToken");
      router.replace("/");
    } finally {
      setLoading(false);
      setModalType(null);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      await deleteAccount();
      localStorage.removeItem("accessToken");
      router.replace("/");
    } finally {
      setLoading(false);
      setModalType(null);
    }
  };

  return (
    <>
      <BackHeader title="내 정보 수정" />
      <div className="bg-white pt-[40px] pb-20">
        <div className="mt-10 px-6">
          {/* 프로필 영역 */}
          <div className="flex flex-col items-center py-8 border-b border-stroke">
            <Image
              src={READER_PROFILE_MAP[user.readerType]}
              alt="profile"
              width={120}
              height={120}
            />

            <div className="flex items-center gap-2 mt-4">
              {isEditing ? (
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="text-h2_sb text-center outline-none border-b border-primary-dark"
                />
              ) : (
                <span className="text-h2_sb text-primary-dark">{nickname}</span>
              )}

              <button onClick={() => setIsEditing(!isEditing)}>
                <Image
                  src="/common/icon-pencil.svg"
                  alt="edit"
                  width={18}
                  height={18}
                />
              </button>
            </div>

            {isEditing && (
              <button
                className="mt-4 bg-primary-dark text-white px-6 py-2 rounded-xl text-body_m"
                onClick={async () => {
                  await updateNickname(nickname);
                  setIsEditing(false);
                }}
              >
                저장
              </button>
            )}
          </div>

          {/* 정보 영역 */}
          <div>
            <div className="px-6 py-5 flex justify-between">
              <span className="text-primary-dark text-h2_m">이름</span>
              <span className="text-gray-text2 text-h2_m">{nickname}</span>
            </div>

            <div className="px-6 py-5 flex justify-between">
              <span className="text-primary-dark text-h2_m">독자유형</span>
              <span className="text-gray-text2 text-h2_m">
                {user.readerTitle}
              </span>
            </div>

            <div className="px-6 py-5 flex justify-between">
              <span className="text-primary-dark text-h2_m">
                연동 소셜 계정
              </span>
              <Image
                src="/common/icon-google.svg"
                alt="google"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* 서비스 안내 */}
          <div className="mt-6">
            <div className="px-6 py-5 border-t text-primary-dark text-h2_m">
              서비스 안내
            </div>
            <div className="px-6 py-3 text-gray-text2 body_m">공지사항</div>
            <div className="px-6 py-3 text-gray-text2 body_m">
              약관 및 정책 / 이용 동의
            </div>
            <div className="px-6 py-3 text-gray-text2 body_m">고객센터</div>
            <div className="px-6 py-3 text-gray-text2 body_m">
              버전정보 v1.0.0
            </div>
          </div>

          {/* 하단 */}
          <div className="mt-10 text-center text-gray-text2 text-body_m">
            <button onClick={() => setModalType("logout")}>로그아웃</button>

            <span className="mx-4 text-gray-text2">|</span>

            <button onClick={() => setModalType("withdraw")}>회원탈퇴</button>
          </div>

          <div className="h-10" />
          {modalType === "logout" && (
            <ConfirmModal
              title="로그아웃"
              description="정말 로그아웃 하시겠어요?"
              cancelText="취소"
              confirmText="확인"
              loading={loading}
              onCancel={() => setModalType(null)}
              onConfirm={handleLogout}
            />
          )}

          {modalType === "withdraw" && (
            <ConfirmModal
              title="회원탈퇴"
              description={
                <>
                  정말 탈퇴하시겠어요?
                  <br />
                  탈퇴 시 모든 기록이 삭제됩니다.
                </>
              }
              cancelText="취소"
              confirmText="확인"
              loading={loading}
              onCancel={() => setModalType(null)}
              onConfirm={handleWithdraw}
            />
          )}
        </div>
      </div>
    </>
  );
}
