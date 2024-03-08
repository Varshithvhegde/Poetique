import React, { useState } from "react";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignLeftIcon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TextStyleToggleGroupProps {
  onTextStyleToggle: (style: string) => void;
  textStyles: Set<string>;
}

export const TextStyleToggleGroup: React.FC<TextStyleToggleGroupProps> = ({
  onTextStyleToggle,
  textStyles,
}) => {
  const [fontColor, setFontColor] = useState("#000000");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setFontColor(color);
    onTextStyleToggle(`text-color-${color}`);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Color Picker for Text Color */}
      <label className="flex items-center cursor-pointer">
        Font Color:
        <input
          type="color"
          value={fontColor}
          onChange={handleColorChange}
          className="p-1 border border-gray-300 rounded ml-2"
        />
      </label>

      {/* ToggleGroup for Bold, Italic, Underline */}
      <ToggleGroup type="multiple" variant="outline" className="ml-4">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => onTextStyleToggle("bold")}
        >
          <FontBoldIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => onTextStyleToggle("italic")}
        >
          <FontItalicIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          onClick={() => onTextStyleToggle("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      {/* ToggleGroup for Text Alignment */}
      <ToggleGroup type="single" className="ml-4">
        <ToggleGroupItem
          value="align-center"
          aria-label="Align center"
          onClick={() => onTextStyleToggle("align-center")}
        >
          <TextAlignCenterIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="align-left"
          aria-label="Align left"
          onClick={() => onTextStyleToggle("align-left")}
        >
          <TextAlignLeftIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="align-right"
          aria-label="Align right"
          onClick={() => onTextStyleToggle("align-right")}
        >
          <TextAlignRightIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
