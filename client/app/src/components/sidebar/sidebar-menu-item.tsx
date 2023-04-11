import cn from "clsx";

type MenuProps = {
  text: string;
  Icon?: any;
  active?: boolean;
};

export default function SidebarMenuItem({
  Icon,
  text,
  active,
}: MenuProps): JSX.Element {
  return (
    <>
      <div className="hoverEffect flex items-center justify-center xl:justify-start text-lg space-x-3">
        {Icon && <Icon className="h-7 w-7" />}
        <span className={cn(active && "font-bold", "hidden xl:inline")} >{text}</span>
      </div>
    </>
  );
}
