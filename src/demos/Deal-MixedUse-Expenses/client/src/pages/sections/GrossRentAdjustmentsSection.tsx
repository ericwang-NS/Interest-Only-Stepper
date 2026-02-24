import { PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const roomMixData = [
  {
    name: "Standard King",
    rooms: "80",
    adr: "$189.00",
    occupancy: "72%",
    revpar: "$136.08",
    revenueYear: "$3,973,536",
    hasDeletable: true,
  },
  {
    name: "Standard Double",
    rooms: "100",
    adr: "$179.00",
    occupancy: "75%",
    revpar: "$134.25",
    revenueYear: "$4,900,125",
    hasDeletable: false,
  },
  {
    name: "Suite",
    rooms: "30",
    adr: "$329.00",
    occupancy: "62%",
    revpar: "$203.98",
    revenueYear: "$2,233,581",
    hasDeletable: false,
  },
  {
    name: "Junior Suite",
    rooms: "20",
    adr: "$259.00",
    occupancy: "68%",
    revpar: "$176.12",
    revenueYear: "$1,285,676",
    hasDeletable: false,
  },
];

const grossRoomsSummary = {
  label: "Gross rooms revenue",
  rooms: "230",
  adr: "$203.50",
  occupancy: "71%",
  revpar: "$144.49",
  revenueYear: "$12,392,918",
};

export const GrossRentAdjustmentsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start w-full">
      <div className="flex items-start gap-2 pl-4 pr-0 py-0 w-full">
        <div className="pt-4 pb-0 px-0 flex-1 flex items-start">
          <div className="flex-1 overflow-hidden flex items-start">
            {/* Room Type column */}
            <div className="flex flex-col w-[180px] items-start shrink-0">
              <div className="flex h-[49px] items-center gap-[11px] px-4 py-2 self-stretch w-full bg-[#525d6b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal]">
                  Room mix
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-auto w-fit p-0 hover:bg-transparent"
                >
                  <PlusIcon className="w-3 h-3 text-[#a2adb9]" />
                </Button>
              </div>

              {roomMixData.map((room, index) => (
                <div
                  key={`room-${index}`}
                  className="flex min-h-[46px] items-center gap-1 pl-2 pr-4 py-2 self-stretch w-full bg-[#464e5b] border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69]"
                >
                  <div className="flex items-center gap-2 px-2 py-1 flex-1">
                    <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs tracking-[0] leading-[normal]">
                      {room.name}
                    </div>
                  </div>
                  {room.hasDeletable && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-auto w-fit p-0 hover:bg-transparent"
                    >
                      <Trash2Icon className="w-3 h-3 text-[#a2adb9]" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Rooms column */}
            <div className="flex flex-col min-w-[70px] items-start flex-1">
              <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">
                  Rooms
                </div>
              </div>

              {roomMixData.map((room, index) => (
                <div
                  key={`rooms-${index}`}
                  className="flex min-h-[46px] items-center justify-end gap-4 pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"
                >
                  <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">
                    {room.rooms}
                  </div>
                </div>
              ))}
            </div>

            {/* ADR column */}
            <div className="flex flex-col min-w-[80px] items-start flex-1">
              <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
                <div className="[font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">
                  ADR ($/night)
                </div>
              </div>

              {roomMixData.map((room, index) => (
                <div
                  key={`adr-${index}`}
                  className="flex min-h-[46px] items-center justify-end gap-4 pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"
                >
                  <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">
                    {room.adr}
                  </div>
                </div>
              ))}
            </div>

            {/* Occupancy % column */}
            <div className="flex flex-col min-w-[80px] items-start flex-1">
              <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
                <div className="[font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">
                  Occupancy %
                </div>
              </div>

              {roomMixData.map((room, index) => (
                <div
                  key={`occ-${index}`}
                  className="flex min-h-[46px] items-center justify-end gap-4 pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"
                >
                  <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#0fb3ff] text-xs text-right tracking-[0] leading-[normal]">
                    {room.occupancy}
                  </div>
                </div>
              ))}
            </div>

            {/* RevPAR column */}
            <div className="flex flex-col min-w-[80px] items-start flex-1">
              <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">
                  RevPAR
                </div>
              </div>

              {roomMixData.map((room, index) => (
                <div
                  key={`revpar-${index}`}
                  className="flex min-h-[46px] items-center justify-end gap-4 pl-4 pr-2 py-2 self-stretch w-full bg-[#464e5b] border-b border-b-[#4f5b69]"
                >
                  <div className="flex-1 [font-family:'Roboto',Helvetica] font-normal text-[#a2adb9] text-xs text-right tracking-[0] leading-[normal]">
                    {room.revpar}
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue/year column */}
            <div className="flex flex-col min-w-[100px] items-start flex-1">
              <div className="h-[49px] flex items-center justify-end pl-4 pr-4 py-2 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] self-stretch w-full bg-[#525d6b]">
                <div className="flex-1 [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs text-right tracking-[0] leading-[normal]">
                  Revenue/year
                </div>
              </div>

              {roomMixData.map((room, index) => (
                <div
                  key={`rev-${index}`}
                  className="bg-[#464e5b] border-r-2 border-r-[#4f5b69] flex min-h-[46px] items-center justify-end gap-4 pl-4 pr-2 py-2 self-stretch w-full border-b border-b-[#4f5b69]"
                >
                  <div className="flex-1 font-normal text-[#0fb3ff] text-right [font-family:'Roboto',Helvetica] text-xs tracking-[0] leading-[normal]">
                    {room.revenueYear}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gross rooms revenue summary row */}
      <div className="flex h-[46px] items-start pl-4 pr-0 py-0 w-full overflow-hidden">
        <div className="flex items-center z-[1] flex-1">
          <div className="flex-col w-[180px] h-[46px] flex items-start shrink-0">
            <div className="items-center gap-[11px] px-4 py-2 flex-1 border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit [font-family:'Roboto',Helvetica] font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                {grossRoomsSummary.label}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] whitespace-nowrap [font-family:'Roboto',Helvetica] text-xs tracking-[0] leading-[normal]">
                {grossRoomsSummary.rooms}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] whitespace-nowrap [font-family:'Roboto',Helvetica] text-xs tracking-[0] leading-[normal]">
                {grossRoomsSummary.adr}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] whitespace-nowrap [font-family:'Roboto',Helvetica] text-xs tracking-[0] leading-[normal]">
                {grossRoomsSummary.occupancy}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] whitespace-nowrap [font-family:'Roboto',Helvetica] text-xs tracking-[0] leading-[normal]">
                {grossRoomsSummary.revpar}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] whitespace-nowrap [font-family:'Roboto',Helvetica] text-xs tracking-[0] leading-[normal]">
                {grossRoomsSummary.revenueYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
