import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const otherDeptItems = [
  { name: "Spa & fitness", annualGrowth: "2.00%", percentOfRooms: "4.0%", perRoom: "$2,157", amountYear: "$496,000" },
  { name: "Parking", annualGrowth: "1.00%", percentOfRooms: "3.2%", perRoom: "$1,722", amountYear: "$396,000" },
  { name: "Retail / gift shop", annualGrowth: "0.00%", percentOfRooms: "0.6%", perRoom: "$313", amountYear: "$72,000" },
  { name: "Other revenue", annualGrowth: "2.00%", percentOfRooms: "1.5%", perRoom: "$826", amountYear: "$190,000" },
];

export const IncomeSummarySection = (): JSX.Element => {
  return (
    <div className="flex items-start gap-2 pl-4 pr-0 py-0 w-full">
      <div className="flex-1 flex items-start">
        <div className="flex items-start w-full">
          <div className="flex flex-col w-[180px] items-start shrink-0">
            <div className="flex h-[49px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">Other operated depts.</div>
              <Button variant="ghost" size="icon" className="h-auto w-fit p-0 hover:bg-transparent">
                <PlusIcon className="w-3 h-3 text-[#a2adb9]" />
              </Button>
            </div>
            {otherDeptItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center px-4 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs tracking-[0] leading-[normal]">{item.name}</div>
              </div>
            ))}
            <div className="flex h-[46px] items-center px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal] whitespace-nowrap">Total other revenue</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">Annual growth</div>
            </div>
            {otherDeptItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{item.annualGrowth}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">1.50%</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[90px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">% of rooms rev.</div>
            </div>
            {otherDeptItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{item.percentOfRooms}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">9.3%</div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex flex-col min-w-[70px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
            {otherDeptItems.map((_, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"><div className="flex-1"></div></div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
          </div>

          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">$/room/year</div>
            </div>
            {otherDeptItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{item.perRoom}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$5,018</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">Amount/year</div>
            </div>
            {otherDeptItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{item.amountYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$1,154,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
