export const NOISection = (): JSX.Element => {
  return (
    <div className="flex items-start pl-4 pr-0 py-0 w-full">
      <div className="flex-1 flex items-start">
        <div className="flex items-start w-full">
          <div className="flex-col w-[260px] h-[46px] flex items-start shrink-0">
            <div className="items-center gap-[11px] px-4 py-2 flex-1 border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                Net operating income
              </div>
            </div>
          </div>

          {/* Empty spacer columns */}
          <div className="flex flex-col min-w-[80px] h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]" />
          </div>
          <div className="flex flex-col min-w-[100px] h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]" />
          </div>
          <div className="flex flex-col min-w-[80px] h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]" />
          </div>

          <div className="flex flex-col min-w-[100px] h-[46px] items-start flex-1">
            <div className="flex-col items-end justify-center pl-4 pr-4 py-2 flex-1 border-r-2 border-r-[#4f5b69] border-b border-b-[#4f5b69] flex self-stretch w-full bg-[#525d6b]">
              <div className="w-fit font-bold text-[#fefefe] whitespace-nowrap text-xs tracking-[0] leading-[normal]">
                $4,310,361
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
