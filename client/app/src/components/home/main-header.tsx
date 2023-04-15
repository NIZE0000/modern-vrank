import cn from "clsx";

import type { ReactNode } from "react";

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
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        " z-10  py-2  backdrop-blur-xl ",
        !disableSticky && "sticky top-0",
        className ?? "flex items-center gap-6"
      )}
    >

      {title && (
        <div className="flex px-4 gap-8 col-span-4">
          <h2 className="text-xl font-bold" key={title}>
            {title}
          </h2>
        </div>
      )}
      {children}
    </header>
  );
}
