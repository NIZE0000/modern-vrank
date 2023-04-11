import { SEO } from "@/components/common/seo";
import { MainContainer } from "@/components/home/main-container";
import { MainHeader } from "@/components/home/main-header";
import PageInDevelopment from "@/components/info/in-development";
import { MainLayout } from "@/components/layout/main-layout";
import { ReactElement, ReactNode } from "react";

export default function Videos() {
  return (
    <>
      <MainContainer className="border-l border-r">
        <SEO title="Videos / MODERN VRANK" />
        <MainHeader
          title="Videos"
          className="flex items-center justify-between"
        ></MainHeader>
        <div className="pl-4 pr-4"></div>
        <PageInDevelopment />
      </MainContainer>
    </>
  );
}

Videos.getLayout = (page: ReactElement): ReactNode => (
  // <ProtectedLayout>
  <MainLayout>{page}</MainLayout>
  // </ProtectedLayout>
);
