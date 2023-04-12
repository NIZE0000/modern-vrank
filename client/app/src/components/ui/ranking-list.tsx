import RankingBoardItem from "@/components/ui/ranking-board-item";
import { SetStateAction, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchJSON } from "@/libs/fetch";
import { channel } from "@/libs/models/channel";



type data = { results: channel[] };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RankingList({ channels }:): JSX.Element {
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState({
    offset: 0,
    limit: 25,
    sort: "subscriberCount",
    order: "dsc",
    country: "",
  });
  const [channel, setChannel] = useState([]);

  const getKey = (pageIndex: number, previousPageData: {}) => {
    // if (previousPageData && !previousPageData.length)
    //   return null; // reached the end
    return `/api/channel?offset=${
      query.offset + pageIndex * query.limit
    }&limit=${query.limit}&sort=${query.sort}&order=${query.order}&country=${
      query.country
    }`; // SWR key
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (!data) return <div className="flex justify-center">Loading...</div>;

  console.log("Data length: " + data.length);

  let list: channel[] = [];
  let totalChanenl = 0;
  for (let i = 0; i < data.length; i++) {
    totalChanenl += data[i].results.length;
    list = [...data[i].results];
  }
  // console.log("totalChanenl: " + totalChanenl);

  let channels: channel[] | SetStateAction<any> = [];
  channels = [...channels, ...list.map((e) => e)];
  console.log("channels: " + channels);


  const handleLoadMore = async () => {
    setSize((size) => size + 1);
    // setQuery({
    //   offset: query.offset + query.limit,
    //   limit: query.limit,
    //   sort: query.sort,
    //   order: query.order,
    //   country: query.country,
    // });
    channels = [...channels, ...list.map((e) => e)];
    setChannel(channels);

    // console.log("channel length:" + channel.length);
    // console.log("channels:" + channels);
    // console.log("channels size:" + channels.length);
    // let list = data;

    // channels = channels.concat(...list.results) ;
    // console.log(channels.concat(...list.results) );

    // channels =

    // const channels: channel[] = data.results;
    // if (channels.length === 0) {
    //   setHasMore(false);
    // } else {
    //   mutate((prevData: channel[]) => [...prevData, ...channels], false);
    // }

    // const newData = await fetch(
    //   `/api/channel?offset=${query.offset + query.limit}&limit=${
    //     query.limit
    //   }&sort=${query.sort}&order=${query.order}&country=${query.country}`
    // ).then((res) => res.json());
  };
console.log(channel.length)
  return (
    <>
      {/* <InfiniteScroll
        dataLength={channel.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<div className="flex justify-center p-2">Loading more...</div>}
        // key={size}
      >
        {data && (
          <div className="pl-4 pr-4">
            {channel.map((data: channel) => (
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
      </InfiniteScroll> */}
    </>
  );
}
