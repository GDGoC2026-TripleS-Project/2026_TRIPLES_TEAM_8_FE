import Image from "next/image";

interface Props {
  rank: number;
}

export default function RankMedal({ rank }: Props) {
  if (rank === 1)
    return (
      <Image src="/ranking/icon-first.svg" alt="1등" width={40} height={40} />
    );

  if (rank === 2)
    return (
      <Image src="/ranking/icon-second.svg" alt="2등" width={40} height={40} />
    );

  if (rank === 3)
    return (
      <Image src="/ranking/icon-third.svg" alt="3등" width={40} height={40} />
    );

  if (rank === 4)
    return (
      <Image src="/ranking/icon-fourth.svg" alt="4등" width={40} height={40} />
    );

  if (rank === 5)
    return (
      <Image src="/ranking/icon-fifth.svg" alt="5등" width={40} height={40} />
    );
  return <span className="text-h1_m w-[40px] text-center">{rank}</span>;
}
