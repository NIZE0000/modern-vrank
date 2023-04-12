import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";

const PAGE_LIMIT = 25;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyComponent() {
  const [hasMore, setHasMore] = useState(true);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/channel?offset=${pageIndex * PAGE_LIMIT}&limit=${PAGE_LIMIT}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const items = data ? data.flat() : [];
  console.log(data?.at(0));

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
      endMessage={<div>End of List</div>}
    >
      {items.map((item): [] => {
          console.log(item);
        return[];
      })}
    </InfiniteScroll>
  );
}

export default MyComponent;
