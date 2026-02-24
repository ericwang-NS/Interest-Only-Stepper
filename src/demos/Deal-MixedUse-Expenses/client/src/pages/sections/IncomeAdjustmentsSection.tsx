import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const fbRevenueItems = [
  { name: "Restaurant revenue", annualGrowth: "3.00%", percentOfRooms: "18.2%", perRoom: "$9,804", amountYear: "$2,254,920" },
  { name: "Banquet & catering", annualGrowth: "2.00%", percentOfRooms: "12.1%", perRoom: "$6,522", amountYear: "$1,500,000" },
  { name: "Bar & lounge", annualGrowth: "3.00%", percentOfRooms: "6.5%", perRoom: "$3,478", amountYear: "$800,000" },
  { name: "Room service", annualGrowth: "1.00%", percentOfRooms: "2.8%", perRoom: "$1,522", amountYear: "$350,000" },
];

export const IncomeAdjustmentsSection = (): JSX.Element => {
  return (
    <section className="flex w-full items-start gap-2 pl-4 pr-0 py-0">
      <div className="flex-1 flex items-start">
        <div className="overflow-hidden flex items-start w-full">
          <div className="flex flex-col w-[180px] items-start shrink-0">
            <div className="flex h-[49px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">
                Food & beverage
              </div>
              <Button variant="ghost" size="icon" className="h-auto w-fit p-0 hover:bg-transparent">
                <PlusIcon className="w-3 h-3 text-[#a2adb9]" />
              </Button>
            </div>
            {fbRevenueItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center px-4 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs tracking-[0] leading-[normal]">{item.name}</div>
              </div>
            ))}
            <div className="flex h-[46px] items-center px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">Total F&B revenue</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">Annual growth</div>
            </div>
            {fbRevenueItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{item.annualGrowth}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">2.50%</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[90px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">% of rooms rev.</div>
            </div>
            {fbRevenueItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{item.percentOfRooms}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">39.6%</div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex flex-col min-w-[70px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
            {fbRevenueItems.map((_, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"><div className="flex-1"></div></div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]"><div className="flex-1"></div></div>
          </div>

          <div className="flex flex-col min-w-[80px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">$/room/year</div>
            </div>
            {fbRevenueItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">{item.perRoom}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$21,326</div>
            </div>
          </div>

          <div className="flex flex-col min-w-[100px] items-start flex-1">
            <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">Amount/year</div>
            </div>
            {fbRevenueItems.map((item, index) => (
              <div key={index} className="flex min-h-[46px] items-center justify-end pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">{item.amountYear}</div>
              </div>
            ))}
            <div className="h-[46px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
              <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">$4,904,920</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
