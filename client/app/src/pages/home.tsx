import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import HomeLayout from "@/components/layout/common-layout";
import RankingList from "@/components/ui/ranking-list";
import React from "react";
import OptionMenu from "@/components/ui/option-menu";

export default function Home({}): JSX.Element {
  const [query, setQuery] = useState({
    offset: 0,
    limit: 25,
    sort: "subscriberCount",
    order: "dsc",
    country: "",
  });

  useEffect(() => {}, [query]);

  return (
    <>
      <MainContainer className="border-l border-r">
        <SEO title="Home / MODERN VRANK" />
        <MainHeader
          title="Home"
          className="grid grid-rows-2 grid-cols-8 items-center justify-between gap-y-2 "
        >
          <div className="flex px-4 justify-end col-span-4">
            <OptionMenu query={query} setQuery={setQuery} />
          </div>

          <div className="flex justify-center col-span-1">Rank</div>
          <div className="flex justify-center col-span-3">Channel</div>
          <div className="flex col-span-1"></div>
          <div className="flex justify-center col-span-3">
            Total {query.sort.replace(/Count/g, "")}
          </div>
        </MainHeader>
        <RankingList
          limit={query.limit}
          offset={query.offset}
          order={query.order}
          sort={query.sort}
          country={query.country}
        />
      </MainContainer>
    </>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <MainLayout>
    <HomeLayout>{page}</HomeLayout>
  </MainLayout>
);
