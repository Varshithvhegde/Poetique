import React from "react";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

interface TextStyleToggleGroupProps {
  onTextStyleToggle: (style: string) => void;
  textStyles: Set<string>;
}

export const TextStyleToggleGroup: React.FC<TextStyleToggleGroupProps> = ({
  onTextStyleToggle,
  textStyles,
}) => {
  return (
    <ToggleGroup type="multiple">
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
        // active={textStyles.has("italic")}
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
  );
};
