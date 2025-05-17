
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

const SummaryCard = ({ title, value, icon, gradientFrom, gradientTo }: SummaryCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg animate-fade-in hover:shadow-xl transition-shadow duration-300 group">
      <div className={`absolute inset-0 bg-gradient-to-r from-[${gradientFrom}] to-[${gradientTo}] opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-lg flex items-center text-white">
          <span className="mr-2 h-6 w-6 animate-[pulse_3s_infinite]">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{value}</p>
        <div className="h-1 w-1/2 bg-white/50 rounded mt-2 group-hover:w-3/4 transition-all duration-300"></div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
