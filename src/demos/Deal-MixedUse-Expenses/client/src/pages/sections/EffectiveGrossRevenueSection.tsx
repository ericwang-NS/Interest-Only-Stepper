import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const adjustmentRows = [
  { label: "Vacancy", percentOfIncome: "5.00%", perRoomYear: "($4,016)", amountPerYear: "($922,592)" },
  { label: "Credit loss", percentOfIncome: "1.00%", perRoomYear: "($803)", amountPerYear: "($184,518)" },
];

export const EffectiveGrossRevenueSection = (): JSX.Element => {
  return (
    <section className="flex items-start gap-2 pl-4 pr-0 pt-0 pb-6 w-full">
      <div className="flex-1 flex items-start">
        <div className="flex items-start w-full">
          <div className="flex flex-col w-[180px] items-start shrink-0">
            <div className="flex h-[49px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">Income adjustments</div>
              <PlusIcon className="w-3 h-3 text-[#a2adb9]" />
            </div>
            {adjustmentRows.map((row, index) => (
              <div key={index} className="flex min-h-[46px] items-center gap-1 pl-2 pr-4 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex items-center gap-2 px-2 py-1 flex-1">
                  <span className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#fefefe] text-xs tracking-[0] leading-[normal]">{row.label}</span>
                </div>
                <div className="inline-flex flex-col items-start gap-1">
                  <Select defaultValue="total-potential-revenue">
                    <SelectTrigger className="flex items-center gap-2 pl-3 pr-2 py-1 h-auto bg-[#4f5b69] border-0 rounded text-xs [font-family:'Roboto',Helvetica]">
                      <span className="text-[#a2adb9] text-xs whitespace-nowrap">Calculated on:</span>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total-potential-revenue">Total potential revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            <div className="flex h-[46px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="whitespace-nowrap [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">Effective gross revenue</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">% of income</div>
            </div>
            {adjustmentRows.map((row, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{row.percentOfIncome}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
          </div>

          {/* Spacers */}
          <div className="flex flex-col min-w-[90px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
            {adjustmentRows.map((_, index) => (<div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"><div className="flex-1"></div></div>))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
          </div>

          <div className="flex flex-col min-w-[70px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-center pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
            {adjustmentRows.map((_, index) => (<div key={index} className="flex min-h-[46px] items-center justify-center px-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"><div className="flex-1"></div></div>))}
            <div className="h-[46px] flex items-center justify-center px-2 py-2 self-stretch w-full bg-[#525d6b] border-b border-b-[#4f5b69]"><div className="flex-1"></div></div>
          </div>

          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$/room/year</div>
            </div>
            {adjustmentRows.map((row, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{row.perRoomYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$75,507</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">Amount/year</div>
            </div>
            {adjustmentRows.map((row, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{row.amountPerYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$17,344,728</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
