import { SidebarTrigger } from "./ui/sidebar";

type TWelcome = {
  userName: string;
};

export default function Welcome({ userName }: TWelcome) {
  return (
    <div className="flex items-center gap-2 overflow-hidden mobile:w-full justify-between tablet:justify-center">
      <SidebarTrigger className="mobile:self-start" />
      <div className="shrink-0 bg-sub w-[1px] mr-1 h-4 mobile:hidden" />
      <h2 className="text-xl truncate tracking-tight w-full">
        Bem-vindo, <span className="font-bold">{userName}!</span> &#128075;
      </h2>
    </div>
  );
}
