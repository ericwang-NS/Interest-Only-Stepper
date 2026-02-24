import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CapExRow {
  name: string;
  annualGrowth: string;
  pctEffGross: string;
  perUnitYear: string;
  amountYear: string;
  monthAmount: string;
  defaultRecoverable: boolean;
}

const capExItems: CapExRow[] = [
  { name: "Misc. reserves", annualGrowth: "3.0%", pctEffGross: "0.00%", perUnitYear: "$0", amountYear: "$0", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Other capital expenditures", annualGrowth: "3.0%", pctEffGross: "0.39%", perUnitYear: "$83", amountYear: "$25,000", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Retail leasing cost reserves", annualGrowth: "3.0%", pctEffGross: "0.39%", perUnitYear: "$83", amountYear: "$25,000", monthAmount: "$31,368", defaultRecoverable: false },
];

export const CapitalExpendituresSection = (): JSX.Element => {
  const [recoverableState, setRecoverableState] = useState<boolean[]>(
    capExItems.map((e) => e.defaultRecoverable)
  );

  const toggleRecoverable = (index: number) => {
    setRecoverableState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section className="flex items-start gap-2 pl-4 pr-0 pt-0 pb-6 w-full">
      <div className="flex-1 flex items-start">
        <div className="flex items-start w-full">
          {/* CapEx name column */}
          <div className="flex flex-col w-[260px] items-start shrink-0">
            <div className="flex h-[49px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">Capital expenditures</div>
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-[#606b79] rounded transition-colors">
                <PlusIcon className="w-3 h-3 text-[#a2adb9]" />
              </Button>
            </div>
            {capExItems.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center gap-1 pl-2 pr-4 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex items-center gap-2 px-2 py-1 flex-1">
                  <span className="font-normal text-[#0fb3ff] text-xs tracking-[0] leading-[normal]">{row.name}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => toggleRecoverable(index)}
                        className={`flex items-center justify-center w-[18px] h-[18px] rounded text-[9px] font-bold transition-all shrink-0 ${
                          recoverableState[index]
                            ? "bg-[#0fb3ff] text-[#1a1d23] hover:bg-[#0d9de0]"
                            : "bg-transparent border border-[#5a6775] text-[#5a6775] hover:border-[#a2adb9] hover:text-[#a2adb9]"
                        }`}
                      >
                        R
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-[#1a1d23] border-[#4f5b69] text-xs">
                      <p className="text-white">
                        {recoverableState[index]
                          ? "Recoverable by retail tenants \u2014 click to remove"
                          : "Not recoverable \u2014 click to include in retail recovery pool"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
            <div className="flex h-[46px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal] whitespace-nowrap">Total capital expenditures</div>
            </div>
          </div>

          {/* Annual growth column */}
          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">Annual growth</div>
            </div>
            {capExItems.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{row.annualGrowth}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]"></div>
            </div>
          </div>

          {/* % of effective gross revenue column */}
          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">% of eff. gross revenue</div>
            </div>
            {capExItems.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{row.pctEffGross}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">13.43%</div>
            </div>
          </div>

          {/* $/Unit/year column */}
          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">$/Unit/year</div>
            </div>
            {capExItems.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{row.perUnitYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$83</div>
            </div>
          </div>

          {/* Amount/year column */}
          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">Amount/year</div>
            </div>
            {capExItems.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{row.amountYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$25,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
