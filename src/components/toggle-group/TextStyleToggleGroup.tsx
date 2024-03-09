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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TextStyleToggleGroupProps {
  onTextStyleToggle: (style: string) => void;
  textStyles: Set<string>;
}

export const TextStyleToggleGroup: React.FC<TextStyleToggleGroupProps> = ({
  onTextStyleToggle,
  textStyles,
}) => {
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(16);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setFontColor(color);
    onTextStyleToggle(`text-color-${color}`);
  };

  const handleFontSizeChange = (value: string) => {
    const size = parseInt(value, 10);
    setFontSize(size);
    onTextStyleToggle(`font-size-${size}`);
  };

  const fontSizeOptions = [
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "24", value: "24" },
    // Add more options as needed
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
    {/* First Line: Font Color and Font Size */}
    <div className="flex items-center space-x-6"> {/* Increased space-x */}
    <Label className="flex items-center cursor-pointer">
        
        Font Color:
        </Label>
        <Input
          type="color"
          value={fontColor}
          onChange={handleColorChange}
          className="p-1 border border-gray-300 rounded ml-2 w-[80px]"
        />
      <Label className="flex items-center cursor-pointer">
        Font Size:
        </Label>
        <div className="w-[100px]">
        <Select
          value={fontSize.toString()}
          onValueChange={(newValue) => handleFontSizeChange(newValue)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontSizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
    </div>

      {/* Second Line: Bold, Italic, and Text Alignment */}
      <div className="flex items-center space-x-4">
        <ToggleGroup type="multiple" variant="outline">
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

        <ToggleGroup type="single">
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
    </div>
  );
};
