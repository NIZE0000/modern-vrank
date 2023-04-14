import cn from "clsx";
// import { Button } from '@components/ui/button';
// import { HeroIcon } from '@components/ui/hero-icon';
// import { ToolTip } from '@components/ui/tooltip';
// import { MobileSidebar } from '@components/sidebar/mobile-sidebar';
import type { ReactNode } from "react";
// import type { IconName } from '@components/ui/hero-icon';

type HomeHeaderProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  disableSticky?: boolean;
  useActionButton?: boolean;
  useMobileSidebar?: boolean;
  action?: () => void;
};

export function MainHeader({
  title,
  children,
  className,
  disableSticky,
  useActionButton,
  useMobileSidebar,
  action,
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        "hover-animation even z-10 bg-main-background/60 px-4 py-2 backdrop-blur-md ",
        !disableSticky && "sticky top-0",
        className ?? "flex items-center gap-6"
      )}
    >
      {/* {useActionButton && (
        
      )} */}

      {title && (
        <div className="flex gap-8">
          <h2 className="text-xl font-bold" key={title}>
            {title}
          </h2>
        </div>
      )}
      {children}
    </header>
  );
}
