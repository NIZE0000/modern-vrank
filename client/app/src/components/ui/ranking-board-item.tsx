import Image from "next/image";

type RankingBoardProps = {
  title: string;
  thumbnail: string;
  subscriberCount?: number;
  viewCount?: number;
  videoCount?: number;
  country?: string;
  rank: number
};

export default function RankingBoardItem({
  subscriberCount,
  thumbnail,
  title,
  videoCount,
  viewCount,
  country,
  rank
}: RankingBoardProps): JSX.Element {
  return (
    <>
       <div className="flex items-center pt-2">
        <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-400 rounded-full font-medium">
          {rank}
        </div>
        <div className="relative w-[64px] h-[64px] rounded-full overflow-hidden ml-4">
          <Image src={thumbnail} alt={title} width={100} height={100} />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-gray-500">
            {subscriberCount && `${subscriberCount.toLocaleString()} subscribers`}
            {viewCount && ` • ${viewCount.toLocaleString()} views`}
            {videoCount && ` • ${videoCount.toLocaleString()} videos`}
            {country && ` • ${country}`}
          </p>
        </div>
      </div>
    </>
  );
}
