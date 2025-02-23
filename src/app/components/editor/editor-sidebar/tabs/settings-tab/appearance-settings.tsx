import { useEditor } from "@/app/providers/editor-provider";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColorPicker } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  handleOnChange: (e: any) => void;
  handleSelectChange: (value: string, property: string) => void;
};

function AppearanceSettings({ handleOnChange }: Props) {
  const { state } = useEditor();

  return (
    <AccordionItem value="Appearance" className="px-6 py-0 border-y-[1px]">
      <AccordionTrigger className="!no-underline">Appearance</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 px-1">
        <div className="w-full">
          <p className="text-muted-foreground mb-2">Fill Color</p>
          <div className="flex space-x-2">
            <ColorPicker
              onChange={(color: string) => {
                const e = { target: { id: "backgroundColor", value: color } };
                handleOnChange(e);
              }}
              id="backgroundColor"
              value={
                state.editor.selectedElement.styles.backgroundColor || "#ffff"
              }
            />
            <Input
              id="backgroundCOlor"
              type="text"
              maxLength={7}
              value={
                state.editor.selectedElement.styles.backgroundColor || "#ffff"
              }
              onChange={handleOnChange}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default AppearanceSettings;
