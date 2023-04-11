import SidebarMenuItem from "./sidebar-menu-item";
import {
  HomeIcon,
  VideoCameraIcon,
  SignalIcon,
} from "@heroicons/react/24/solid";

const MenuItem = ["Home", "Videos", "Live"];

export default function Sidebar(): JSX.Element {
  return (
    <>
      {/* Memu */}
      <div className="flex-col p-2 h-full ml-10 mt-5 space-y-1">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Videos" Icon={VideoCameraIcon} />
        <SidebarMenuItem text="Live" Icon={SignalIcon} />
      </div>
    </>
  );
}
