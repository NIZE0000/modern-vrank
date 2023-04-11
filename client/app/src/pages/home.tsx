import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import { ReactElement, ReactNode, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import HomeLayout from "@/components/layout/common-layout";
import RankingBoard from "@/components/ui/ranking-board-item";
import useSWR, { SWRConfig } from "swr";
import { fetchJSON } from "@/libs/fetch";

export async function getServerSideProps() {
  const res = await fetch(
    "http://167.71.204.89:8080/api/v1/channel?limit=10&sort=subscriberCount&order=dsc"
  );
  const data = await res.json();
  return {
    props: {
      channels: data.results,
    },
  };
}
// channel type
type channel = {
  channelId: number;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  country: string;
  statistics: {
    viewCount: number;
    subscriberCount: number;
    hiddenSubscriberCount: boolean;
    videoCount: number;
  };
};

type HomeProps = {
  channels: channel[];
};
export default function Home({ channels }: HomeProps): JSX.Element {
  // const { data } = useSWR("http://167.71.204.89:8080/api/v1/channel?limit=10&sort=subscriberCount&order=dsc");
  // console.log(data)

  const [query, setQuery] = useState("")

  return (
    <>
      <MainContainer className="border-l border-r">
        <SEO title="Home / MODERN VRANK" />
        <MainHeader
          title="Home"
          className="flex items-center justify-between"
        ></MainHeader>
       {channels && <div className="pl-4 pr-4">
          {channels.map((data) => (
            <RankingBoard
              key={data.channelId}
              title={data.title}
              thumbnail={data.thumbnails.default.url}
              viewCount={data.statistics.videoCount}
              subscriberCount={data.statistics.subscriberCount}
              videoCount={data.statistics.videoCount}
            />
          ))}
        </div>}
      </MainContainer>
    </>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  // <ProtectedLayout>
  <MainLayout>
    <SWRConfig value={{ fetcher: fetchJSON }}>
      <HomeLayout>{page}</HomeLayout>
    </SWRConfig>
  </MainLayout>
  // </ProtectedLayout>
);
