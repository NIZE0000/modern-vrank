import cn from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps): JSX.Element {
  return (
    <button
    className={cn(
      "custom-button main-tab",
      // loading && "relative !text-transparent disabled:cursor-wait",
      // className
    )}
    // type="button"
    // disabled={isDisabled}
    // ref={ref}
    // {...rest}
    >
      {/* {loading && (
          <Loading
            iconClassName="h-5 w-5"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )} */}
      {children}
    </button>
  );
}
