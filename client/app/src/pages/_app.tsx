import { AppHead } from "@/components/common/app-haed";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppHead />
      <Component {...pageProps} />
    </>
  );
}
