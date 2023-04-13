import RankingBoardItem from "@/components/ui/ranking-board-item";
import { SetStateAction, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import { channel } from "@/libs/models/channel";

type data = { results: channel[] };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// gobal variable
let channels: channel[] | SetStateAction<any> | null = [];

type RankingListProps = {
  offset?: number;
  limit?: number;
  sort?: string;
  order?: string;
  country?: string;
};

export default function RankingList({
  country,
  limit,
  offset,
  order,
  sort,
}: RankingListProps): JSX.Element {
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState({
    offset: offset ? offset : 0,
    limit: limit ? limit : 25,
    sort: sort ? sort : "subscriberCount",
    order: order ? order : "dsc",
    country: country ? country : "",
  });

  const getKey = (pageIndex: number, previousPageData: []) => {
    return `/api/channel?offset=${
      query.offset + pageIndex * query.limit
    }&limit=${query.limit}&sort=${query.sort}&order=${query.order}&country=${
      query.country
    }`; // SWR key
  };

  const { data, size, mutate, setSize } = useSWRInfinite(getKey, fetcher);

  if (!data) return <div className="flex justify-center">Loading...</div>;

  let totalChanenl = 0;
  let temData: channel[] | null = [];
  for (let i = 0; i < data.length; i++) {
    totalChanenl += data[i].results.length;
    temData = [...temData, ...data[i].results];
  }
  channels = temData;


  const handleLoadMore = async () => {
    setSize((size) => size + 1);
    // handle null data to stop query
    if (channels.slice(-1) == null) {
      console.log(channels.slice(-1));
      setHasMore(false);
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={channels.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<div className="flex justify-center p-2">Loading more...</div>}
      >
        {data && (
          <div className="pl-4 pr-4">
            {channels.map((data: channel) => (
              <RankingBoardItem
                key={data.channelId}
                title={data.title}
                thumbnail={data.thumbnails.default.url}
                viewCount={data.statistics.videoCount}
                subscriberCount={data.statistics.subscriberCount}
                videoCount={data.statistics.videoCount}
              />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}
