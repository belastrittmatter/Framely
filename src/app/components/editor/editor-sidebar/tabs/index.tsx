import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface TabListProps {
  tabs: {
    value: string;
    icon: ReactNode;
  }[];
}

const TabList = ({ tabs }: TabListProps) => {
  return (
    <TabsList className="flex flex-col items-center gap-4 bg-transparent justify-evenly h-fit overflow-hidden w-16">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="w-10 h-10 p-0 data-[state=active]:bg-muted"
        >
          {tab.icon}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabList;
