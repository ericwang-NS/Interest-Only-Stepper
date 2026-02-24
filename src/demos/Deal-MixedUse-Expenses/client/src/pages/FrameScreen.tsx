import { ExpensesHeaderSection } from "./sections/ExpensesHeaderSection";
import { OperatingExpensesSection } from "./sections/OperatingExpensesSection";
import { NOISection } from "./sections/NOISection";
import { CapitalExpendituresSection } from "./sections/CapitalExpendituresSection";

export const FrameScreen = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start gap-4 relative p-6">
      <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto] bg-[#333742] rounded-[4px] overflow-hidden">
        <ExpensesHeaderSection />
        <OperatingExpensesSection />
        <NOISection />
        <CapitalExpendituresSection />
      </div>
    </div>
  );
};
