import { ElementTypes } from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  type: ElementTypes;
  title: string;
  Icon: LucideIcon;
};

function ElementPlaceholder({ type, title, Icon }: Props) {
  const handleDragStart = (e: React.DragEvent, type: ElementTypes) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      className="flex items-center gap-2 mb-2 bg-sidebar-accent p-2 rounded-md cursor-pointer"
      draggable
      onDragStart={(e) => {
        handleDragStart(e, type);
      }}
    >
      <div className="flex items-center justify-center rounded-sm cursor-pointer h-6 w-6 bg-muted">
        <Icon size={15} className="text-muted-foreground" />
      </div>
      <span className="text-muted-foreground">{title}</span>
    </div>
  );
}

export default ElementPlaceholder;
