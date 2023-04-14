import Link from "next/link";
import SidebarMenuItem from "./sidebar-menu-item";
import { useState } from "react";
import solid from "@heroicons/react/24/solid";
import outline from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function Sidebar(): JSX.Element {
  const router = useRouter();
  const path = router.asPath;
  const [active, setActive] = useState(path.substring(1));

  const checkActive = (page: string): void => {
    setActive(page);
  };

  return (
    <>
      {/* Memu */}
      <div className="flex-col sticky top-5 p-2 h-full ml-10 mt-5 space-y-1 hidden md:inline">
        <Link
          href="/home"
          onClick={() => {
            checkActive("home");
          }}
        >
          <SidebarMenuItem
            text="Home"
            Icon={active == "home" ? solid.HomeIcon : outline.HomeIcon}
            active={active == "home" ? true : false}
          />
        </Link>
        <Link
          href="/videos"
          onClick={() => {
            checkActive("videos");
          }}
        >
          <SidebarMenuItem
            text="Videos"
            Icon={
              active == "videos"
                ? solid.VideoCameraIcon
                : outline.VideoCameraIcon
            }
            active={active == "videos" ? true : false}
          />
        </Link>
        <Link
          href="/live"
          onClick={() => {
            checkActive("live");
          }}
        >
          <SidebarMenuItem
            text="Live"
            Icon={active == "live" ?  solid.SignalIcon : outline.SignalIcon}
            active={active == "live" ? true : false}
          />
        </Link>
      </div>
    </>
  );
}
