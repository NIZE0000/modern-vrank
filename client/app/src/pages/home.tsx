import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import { UpdateUsername } from "@/components/home/update-username";
import { Loading } from "@/components/ui/loading";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const res = await fetch("http://167.71.204.89:8080/api/v1/channel");
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

export default function Home({
  channels,
}: {
  channels: channel[];
}): JSX.Element {
  return (
    <>
      <MainContainer>
        <SEO title="Home / Twitter" />
        <MainHeader
          useMobileSidebar
          title="Home"
          className="flex items-center justify-between"
        >
          <UpdateUsername />
        </MainHeader>
        {/* {!isMobile && <Input />}
        <section className="mt-0.5 xs:mt-0">
          {loading ? (
            <Loading className="mt-5" />
          ) : !data ? (
            <Error message="Something went wrong" />
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {data.map((tweet) => (
                  <Tweet {...tweet} key={tweet.id} />
                ))}
              </AnimatePresence>
              <LoadMore />
            </>
          )}
        </section> */}
      </MainContainer>
    </>
  );
}

// Home.getLayout = (page: ReactElement): ReactNode => (
//   <ProtectedLayout>
//     <MainLayout>
//       <HomeLayout>{page}</HomeLayout>
//     </MainLayout>
//   </ProtectedLayout>
// );
