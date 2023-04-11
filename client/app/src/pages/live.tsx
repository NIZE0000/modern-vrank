import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import PageInDevelopment from "@/components/info/in-development";
import { MainLayout } from "@/components/layout/main-layout";
import { ReactElement, ReactNode } from "react";

export default function Live() {
  return (
    <>
      <MainContainer className="border-l border-r">
        <SEO title="Live / MODERN VRANK" />
        <MainHeader
          title="Live"
          className="flex items-center justify-between"
        ></MainHeader>
        <div className="pl-4 pr-4"></div>
        <PageInDevelopment />
      </MainContainer>
    </>
  );
}

Live.getLayout = (page: ReactElement): ReactNode => (
  // <ProtectedLayout>
  <MainLayout>{page}</MainLayout>
  // </ProtectedLayout>
);
