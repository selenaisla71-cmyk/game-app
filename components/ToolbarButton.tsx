import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  disabled?: boolean;
}

export function ToolbarButton({ label, onClick, icon: Icon, disabled }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
