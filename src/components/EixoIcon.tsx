import { Briefcase, Leaf, Monitor } from "lucide-react";

interface EixoIconProps {
  icone: string;
  cor: string;
  size?: "sm" | "md" | "lg";
}

export default function EixoIcon({ icone, cor, size = "md" }: EixoIconProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-10 h-10",
  };

  const IconComponent =
    icone === "Briefcase"
      ? Briefcase
      : icone === "Leaf"
      ? Leaf
      : icone === "Monitor"
      ? Monitor
      : Briefcase;

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center flex-shrink-0`}
      style={{ backgroundColor: `${cor}22` }}
      aria-hidden="true"
    >
      <IconComponent
        className={iconSizes[size]}
        style={{ color: cor }}
        strokeWidth={1.5}
      />
    </div>
  );
}
