import Link from "next/link";
import SidebarMenuItem from "./sidebar-menu-item";
import {
  HomeIcon,
  VideoCameraIcon,
  SignalIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar(): JSX.Element {
  return (
    <>
      {/* Memu */}
      <div className="flex-col sticky top-5 p-2 h-full ml-10 mt-5 space-y-1 hidden md:inline">
        <Link href="/home">
          <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        </Link>
        <Link href="/videos">
          <SidebarMenuItem text="Videos" Icon={VideoCameraIcon} />
        </Link>
        <Link href="/live">
          <SidebarMenuItem text="Live" Icon={SignalIcon} />
        </Link>
      </div>
    </>
  );
}
