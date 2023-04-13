import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import { ReactElement, ReactNode, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import HomeLayout from "@/components/layout/common-layout";
import RankingList from "@/components/ui/ranking-list";
export default function Home({}): JSX.Element {

  return (
    <>
      <MainContainer className="border-l border-r">
        <SEO title="Home / MODERN VRANK" />
        <MainHeader
          title="Home"
          className="flex items-center justify-between"
        ></MainHeader>
        <RankingList />
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
