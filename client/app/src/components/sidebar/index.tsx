import Link from "next/link";
import SidebarMenuItem from "./sidebar-menu-item";
import { useEffect, useState } from "react";
import solid from "@heroicons/react/24/solid";
import outline from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Button from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Sidebar(): JSX.Element {
  const router = useRouter();
  const path = router.asPath;
  const [active, setActive] = useState(path.substring(1));
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <Button className="" onClick={() => setTheme("light")}>
          <outline.SunIcon className="h-7 w-7" />
        </Button>
      );
    } else {
      return (
        <Button className="" onClick={() => setTheme("dark")}>
          <outline.MoonIcon className="h-7 w-7" />
        </Button>
      );
    }
  };

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
            Icon={active == "live" ? solid.SignalIcon : outline.SignalIcon}
            active={active == "live" ? true : false}
          />
        </Link>

        <div className="absolute top-[90vh] right-0 px-2 ">
          {renderThemeChanger()}
        </div>
      </div>
    </>
  );
}
