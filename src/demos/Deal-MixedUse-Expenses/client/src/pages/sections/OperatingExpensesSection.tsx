import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExpenseRow {
  name: string;
  millRate?: string;
  annualGrowth: string;
  pctEffGross: string;
  perUnitYear: string;
  amountYear: string;
  monthAmount: string;
  defaultRecoverable: boolean;
}

const operatingExpenses: ExpenseRow[] = [
  { name: "Contract services", annualGrowth: "3.0%", pctEffGross: "3.37%", perUnitYear: "$800", amountYear: "$315,000", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "General and administrative", annualGrowth: "3.0%", pctEffGross: "4.00%", perUnitYear: "$1,300", amountYear: "$395,100", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Insurance", annualGrowth: "3.0%", pctEffGross: "6.06%", perUnitYear: "$900", amountYear: "$240,000", monthAmount: "$31,368", defaultRecoverable: true },
  { name: "Make ready cost", annualGrowth: "3.0%", pctEffGross: "0.00%", perUnitYear: "$833", amountYear: "$130,000", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Management fee", annualGrowth: "3.0%", pctEffGross: "0.00%", perUnitYear: "$973", amountYear: "$280,000", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Marketing", annualGrowth: "3.0%", pctEffGross: "0.00%", perUnitYear: "$611", amountYear: "$105,000", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Payroll", annualGrowth: "3.0%", pctEffGross: "3.00%", perUnitYear: "$633", amountYear: "$189,952", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Repairs and maintenance", annualGrowth: "3.0%", pctEffGross: "3.00%", perUnitYear: "$633", amountYear: "$189,952", monthAmount: "$31,368", defaultRecoverable: false },
  { name: "Utilities", annualGrowth: "3.0%", pctEffGross: "1.66%", perUnitYear: "$350", amountYear: "$105,000", monthAmount: "$31,368", defaultRecoverable: true },
  { name: "Property taxes", millRate: "2.0%", annualGrowth: "3.0%", pctEffGross: "13.62%", perUnitYear: "$2,875", amountYear: "$862,377", monthAmount: "$31,368", defaultRecoverable: true },
];

export const OperatingExpensesSection = (): JSX.Element => {
  const [recoverableState, setRecoverableState] = useState<boolean[]>(
    operatingExpenses.map((e) => e.defaultRecoverable)
  );

  const toggleRecoverable = (index: number) => {
    setRecoverableState((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section className="flex items-start gap-2 pl-4 pr-0 py-0 w-full">
      <div className="flex-1 flex items-start">
        <div className="flex items-start w-full">
          {/* Expense name column */}
          <div className="flex flex-col w-[260px] items-start shrink-0">
            <div className="flex h-[49px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">Operating expenses</div>
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-[#606b79] rounded transition-colors">
                <PlusIcon className="w-3 h-3 text-[#a2adb9]" />
              </Button>
            </div>
            {operatingExpenses.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center gap-1 pl-2 pr-4 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex items-center gap-2 px-2 py-1 flex-1">
                  <span className="font-normal text-[#0fb3ff] text-xs tracking-[0] leading-[normal]">{row.name}</span>

                  {/* Recoverable toggle */}
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

                {/* Mill rate tag for property taxes */}
                {row.millRate && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#3b414d] rounded border border-[#4f5b69]">
                    <span className="text-[#a2adb9] text-[10px] whitespace-nowrap">Mill rate:</span>
                    <span className="text-[#0fb3ff] text-[10px] font-medium">{row.millRate}</span>
                  </div>
                )}
              </div>
            ))}
            <div className="flex h-[46px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal] whitespace-nowrap">Total operating expenses</div>
            </div>
          </div>

          {/* Annual growth column */}
          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">Annual growth</div>
            </div>
            {operatingExpenses.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{row.annualGrowth}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">3.00%</div>
            </div>
          </div>

          {/* % of effective gross revenue column */}
          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">% of eff. gross revenue</div>
            </div>
            {operatingExpenses.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{row.pctEffGross}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">42.36%</div>
            </div>
          </div>

          {/* $/Unit/year column */}
          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">$/Unit/year</div>
            </div>
            {operatingExpenses.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{row.perUnitYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$8,941</div>
            </div>
          </div>

          {/* Amount/year column */}
          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">Amount/year</div>
            </div>
            {operatingExpenses.map((row, index) => (
              <div key={index} className="ns-data-row flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{row.amountYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$2,682,428</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
