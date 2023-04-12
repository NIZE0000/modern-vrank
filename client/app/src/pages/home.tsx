import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import { ReactElement, ReactNode, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import HomeLayout from "@/components/layout/common-layout";
import useSWRInfinite from "swr/infinite";
import RankingList from "@/components/ui/ranking-list";
import MyComponent from "@/components/ui/test";
import { fetchJSON } from "@/libs/fetch";
export default function Home({}): JSX.Element {
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState({
    offset: 0,
    limit: 25,
    sort: "subscriberCount",
    order: "dsc",
    country: "",
  });
  const [channels, setChannels] = useState([]);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length)
      return null; // reached the end
    return `/api/channel?offset=${
      query.offset + pageIndex * query.limit
    }&limit=${query.limit}&sort=${query.sort}&order=${query.order}&country=${
      query.country
    }`; // SWR key
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetchJSON);

  return (
    <>
      <MainContainer className="border-l border-r">
        <SEO title="Home / MODERN VRANK" />
        <MainHeader
          title="Home"
          className="flex items-center justify-between"
        ></MainHeader>
        <RankingList channels={channels} />
        {/* <MyComponent/> */}
      </MainContainer>
    </>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  // <ProtectedLayout>
  <MainLayout>
      <HomeLayout>{page}</HomeLayout>
  </MainLayout>
  // </ProtectedLayout>
);
