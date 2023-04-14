import RankingBoardItem from "@/components/ui/ranking-board-item";
import { SetStateAction, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import { channel } from "@/lib/models/channel";
import Index from "@/pages";

// gobal variable
let channels: channel[] | SetStateAction<any> | null = [];

// gobal function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  useEffect(() => {
    const validation = {
      offset: offset == query.offset ? true : false,
      limit: limit == query.limit ? true : false,
      sort: sort == query.sort ? true : false,
      order: order == query.order ? true : false,
      country: country == query.country ? true : false,
    };

    if (
      !(
        validation.country &&
        validation.offset &&
        validation.limit &&
        validation.order &&
        validation.sort
      )
    ) {
      setQuery({
        offset: offset as number,
        limit: limit as number,
        sort: sort as string,
        order: order as string,
        country: country as string,
      });
      mutate([]);
    }
  }, [query, country, limit, offset, order, sort, mutate]);

  if (!data) return <div className="flex justify-center">Loading...</div>;

  let check = false;
  let channels: channel[] = data
    .map((e) => {
      if (e.results == null) {
        check = true;
        return [];
      } else {
        return [...e?.results];
      }
    })
    .flat();

  const handleLoadMore = async () => {
    setSize(size + 1);

    // handle null data to stop query
    if (check) {
      setHasMore((hasMore) => false);
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={channels.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          !check && (
            <div className="flex justify-center p-2">Loading more...</div>
          )
        }
      >
        {channels && (
          <div className="pl-4 pr-4">
            {channels.map((data: channel, Index: number) => (
              <RankingBoardItem
                key={Index + 1}
                rank={Index + 1}
                title={data.title}
                thumbnail={data.thumbnails.default.url}
                viewCount={data.statistics.viewCount}
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
