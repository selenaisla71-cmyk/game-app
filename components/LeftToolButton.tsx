import { LucideIcon } from "lucide-react";

interface LeftToolButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon: LucideIcon;
}

export function LeftToolButton({ label, active, onClick, icon: Icon }: LeftToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-md border px-3 py-2 text-left text-sm font-medium transition ${
        active
          ? "border-cyan-500 bg-cyan-500/20 text-cyan-200"
          : "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
      }`}
    >
      <span className="inline-flex items-center gap-2">
        <Icon size={16} />
        {label}
      </span>
    </button>
  );
}
