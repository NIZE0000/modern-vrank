import Image from "next/image";

type RankingBoardProps = {
  title: string;
  thumbnail: string;
  subscriberCount?: number;
  viewCount?: number;
  videoCount?: number;
  country?: string;
  rank: number;
};

export default function RankingBoardItem({
  subscriberCount,
  thumbnail,
  title,
  videoCount,
  viewCount,
  rank,
}: RankingBoardProps): JSX.Element {
  return (
    <>
      <div className=" items-center pt-2 grid grid-cols-8 grid-rows-1 ">
        <div className="col-span-1 flex justify-center  items-center  font-medium">
          {rank}
        </div>
        <div className="col-span-1 justify-center w-12 h-12 rounded-full overflow-hidden sm:w-16 sm:h-16">
          <Image src={thumbnail} alt={title} width={100} height={100} />
        </div>
        <div className="col-span-3 ml-2">
          <h2 className="text-lg font-medium">{title.slice(0, 40)}</h2>
        </div>
        <div className="col-span-3 flex justify-center">
          {subscriberCount && `${subscriberCount.toLocaleString()}`}
          {viewCount && `${viewCount.toLocaleString()}`}
          {videoCount && `${videoCount.toLocaleString()}`}
        </div>
      </div>
    </>
  );
}
