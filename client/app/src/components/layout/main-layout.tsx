import { SWRConfig } from "swr";
import Sidebar from "../sidebar";
import { LayoutProps } from "./common-layout";

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex w-full justify-center gap-0 lg:gap-4">
      <Sidebar />
      {/* <SWRConfig value={{ fetcher: fetchJSON }}>{children}</SWRConfig> */}
      {children}
    </div>
  );
}
