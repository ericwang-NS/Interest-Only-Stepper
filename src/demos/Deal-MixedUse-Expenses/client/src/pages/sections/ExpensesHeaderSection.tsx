import { ChevronUpIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExpensesHeaderSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start w-full">
      {/* Header bar */}
      <div className="flex items-center gap-4 pl-4 pr-8 py-4 w-full bg-[#3b3f4c]">
        <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#0fb3ff]/20 text-[#0fb3ff] text-[11px] font-medium shrink-0">
          3
        </div>
        <div className="flex flex-col items-start gap-0.5 flex-1">
          <h2 className="font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Expenses
          </h2>
          <p className="font-normal text-[#a2adb9] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
            Overview of this investment's total expenses
          </p>
        </div>
        <Button
          variant="outline"
          className="h-8 px-4 bg-transparent border-[#4f5b69] text-[#a2adb9] hover:bg-[#414b56] hover:text-white hover:border-[#606b79] text-xs rounded transition-colors"
        >
          Start with expenses from a previous pro forma
        </Button>
        <ChevronUpIcon className="w-4 h-4 text-[#a2adb9] cursor-pointer hover:text-white transition-colors" />
      </div>

      {/* Prop tax settings */}
      <div className="flex flex-col gap-2.5 pl-4 pr-8 py-4 w-full">
        {[
          { label: "Prop tax: year 1\nanticipated % of full", value: "50.0%" },
          { label: "Prop tax: year 2\nanticipated % of full", value: "75.0%" },
          { label: "Prop tax: year 3\nanticipated % of full", value: "100.0%" },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-[160px] font-normal text-[#a2adb9] text-xs tracking-[0] leading-[16px] whitespace-pre-line">
              {item.label}
            </div>
            <div className="flex items-center bg-[#464e5b] rounded border border-[#4f5b69] overflow-hidden">
              <button className="w-7 h-7 flex items-center justify-center text-[#a2adb9] hover:text-white hover:bg-[#525d6b] transition-colors border-r border-[#4f5b69]">
                <MinusIcon className="w-3 h-3" />
              </button>
              <div className="px-3 py-1 min-w-[70px] text-center font-normal text-white text-xs">
                {item.value}
              </div>
              <button className="w-7 h-7 flex items-center justify-center text-[#a2adb9] hover:text-white hover:bg-[#525d6b] transition-colors border-l border-[#4f5b69]">
                <PlusIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Overview tab - matches NSNavTabs active style */}
      <div className="flex items-start pl-4 w-full border-b border-[#4f5b69]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(15,179,255,0.25)] rounded-t border-b-2 border-[#0fb3ff] cursor-pointer">
          <span className="font-medium text-white text-xs">Overview</span>
        </div>
      </div>
    </section>
  );
};
