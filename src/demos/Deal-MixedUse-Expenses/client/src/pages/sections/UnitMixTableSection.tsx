import { ChevronUpIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UnitMixTableSection = (): JSX.Element => {
  return (
    <section className="flex items-center gap-4 pl-4 pr-8 py-4 w-full bg-[#3b3f4c]">
      <div className="w-[21px] [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-base text-center tracking-[0] leading-[normal]">
        2
      </div>

      <div className="flex flex-col items-start gap-0.5 flex-1">
        <h2 className="[font-family:'Roboto',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
          Income
        </h2>

        <p className="[font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
          Departmental revenue for this hospitality investment
        </p>
      </div>

      <div className="inline-flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-[#4f5b69] hover:bg-[#5a6775] rounded"
        >
          <SettingsIcon className="w-4 h-4 text-white" />
        </Button>
      </div>

      <ChevronUpIcon className="w-4 h-4 text-white" />
    </section>
  );
};
