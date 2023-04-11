import Image from "next/image";

type RankingBoardProps = {
  title: string;
  thumbnail: string;
  subscriberCount?: number;
  viewCount?: number;
  videoCount?: number;
  country?: string;
};

export default function RankingBoardItem({
  subscriberCount,
  thumbnail,
  title,
  videoCount,
  viewCount,
  country,
}: RankingBoardProps): JSX.Element {
  return (
    <>
      <div className="flex items-center pt-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={thumbnail} alt={title} width={100} height={100} />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-gray-500">
            {subscriberCount && `${subscriberCount} subscribers`}
            {viewCount && ` • ${viewCount} views`}
            {videoCount && ` • ${videoCount} videos`}
            {country && ` • ${country}`}
          </p>
        </div>
      </div>
    </>
  );
}
