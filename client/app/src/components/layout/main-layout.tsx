import { fetchJSON } from "@/lib/fetch";
import Sidebar from "../sidebar";
import { LayoutProps } from "./common-layout";
import { SWRConfig } from "swr";

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex w-full h-full justify-center gap-0 lg:gap-4 ">
      <Sidebar />
      <SWRConfig value={{ fetcher: fetchJSON }}>{children}</SWRConfig>
    </div>
  );
}
