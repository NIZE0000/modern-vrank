import { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "clsx";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { AppProps } from "next/app";

type MenuLinkProps =
  | any
  | {
      href: string;
    };

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-500 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

type OptionMenuProps = {
  query: {
    offset: number;
    limit: number;
    sort: string;
    order: string;
    country: string;
  };
  setQuery: React.Dispatch<
    React.SetStateAction<{
      offset: number;
      limit: number;
      sort: string;
      order: string;
      country: string;
    }>
  >;
};

const OptionMenu = ({ query, setQuery }: OptionMenuProps) => {

  return (
    <Select.Root
      defaultValue={query.sort}
      onValueChange={(value) => {
        setQuery((q) => {
          q = {
            offset: q.offset,
            limit: q.limit,
            sort: value,
            order: q.order,
            country: q.country,
          };
          return q;
        });
      }}
    >
      <Select.Trigger
        className="inline-flex bg-white dark:bg-opacity-5 items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px]   focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder] outline-none"
        aria-label="Sort"
      >
        <Select.Value />
        <Select.Icon className="">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="z-10">
        <Select.Content
          position="popper"
          align="end"
          sticky={"partial"}
          sideOffset={5}
          className="overflow-hidden bg-white dark:bg-black rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px leading-[25px text-mauve11 text-xs ">
                SORTING
              </Select.Label>
              <SelectItem value="subscriberCount">Most Subscriber</SelectItem>
              <SelectItem value="viewCount">Most Viewer</SelectItem>
              <SelectItem value="videoCount">Most Video</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default OptionMenu;
