import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import { ReactElement, ReactNode } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import HomeLayout from "@/components/layout/common-layout";
import RankingBoard from "@/components/ui/ranking-board-item";

export async function getServerSideProps() {
  const res = await fetch("http://167.71.204.89:8080/api/v1/channel?sort=subscriberCount&order=dsc");
  const data = await res.json();
  return {
    props: {
      channels: data.results,
    },
  };
}

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
  return (
    <>
      <MainContainer>
        <SEO title="Home / Twitter" />
        <MainHeader
          title="Home"
          className="flex items-center justify-between"
        ></MainHeader>

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
