import {
  AkayaKanadakaFont,
  AlegreyaFont,
  AnekKannadaFont,
  CourierPrimeFont,
  HindSiliguriFont,
  InterFont,
  LatoFont,
  LibreFranklinFont,
  LoraFont,
  MerriweatherFont,
  MonofettFont,
  MontserratFont,
  NotoSansFont,
  NotoSansKannadaFont,
  NotoSerifFont,
  NotoSerifKannadaFont,
  NunitoFont,
  OpenSans,
  OswaldFont,
  PTSansFont,
  PlayfairDisplayFont,
  PoppinsFont,
  RalewayFont,
  RobotoFont,
  RobotoSlabFont,
  RubikFont,
  SourceSansProFont,
  TangerineFont,
  TiroDevanagariHindiFont,
  TiroKannadaFont,
  WorkSansFont,
} from "@/app/create/edit/font";
import {
  FontBoldIcon,
  FontItalicIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface TextStyleToggleGroupProps {
  onTextStyleToggle: (style: string) => void;
  textStyles: Set<string>;
  setSelectedFontClass: (fontClass: string) => void;
}

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
  { label: "22", value: "22" },
  { label: "24", value: "24" },
  { label: "26", value: "26" },
  { label: "28", value: "28" },
  { label: "30", value: "30" },
  { label: "32", value: "32" },
  { label: "34", value: "34" },

  // Add more options as needed
];

export const TextStyleToggleGroup: React.FC<TextStyleToggleGroupProps> = ({
  onTextStyleToggle,
  textStyles,
  setSelectedFontClass,
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

  // Add other event handlers...

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* First Line: Font Color and Font Size */}
      <div className="flex items-center space-x-6">
        <Label className="flex items-center cursor-pointer">Font Color:</Label>
        <Input
          type="color"
          value={fontColor}
          onChange={handleColorChange}
          className="p-1 border border-gray-300 rounded ml-2 w-[80px]"
        />
        <Label className="flex items-center cursor-pointer">Font Size:</Label>
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
            value="align-left"
            aria-label="Align left"
            onClick={() => onTextStyleToggle("align-left")}
          >
            <TextAlignLeftIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="align-center"
            aria-label="Align center"
            onClick={() => onTextStyleToggle("align-center")}
          >
            <TextAlignCenterIcon className="h-4 w-4" />
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
      {/* ScrollArea for Font Options */}
      <Label className="flex items-center cursor-pointer">Font Family:</Label>

      <ScrollArea className="overflow-x-auto h-[300px] rounded-md border p-4 w-[80%] mx-auto">
        {/* Render font options using the defined font configurations */}
        {[
          { font: OpenSans, label: "Open Sans" },
          { font: RobotoFont, label: "Roboto" },
          { font: LatoFont, label: "Lato" },
          { font: MontserratFont, label: "Montserrat" },
          { font: PoppinsFont, label: "Poppins" },
          { font: OswaldFont, label: "Oswald" },
          { font: PlayfairDisplayFont, label: "Playfair Display" },
          { font: RalewayFont, label: "Raleway" },
          { font: MerriweatherFont, label: "Merriweather" },
          { font: TangerineFont, label: "Tangerine" },
          // Add other fonts as needed...
          { font: RobotoSlabFont, label: "Roboto Slab" },
          { font: LoraFont, label: "Lora" },
          { font: InterFont, label: "Inter" },
          { font: NotoSansFont, label: "Noto Sans" },
          { font: NotoSansKannadaFont, label: "Noto Sans Kannada" },
          { font: AnekKannadaFont, label: "Anek Kannada" },
          { font: TiroKannadaFont, label: "Tiro Kannada" },
          { font: AkayaKanadakaFont, label: "Akaya Kanadaka" },
          { font: NotoSerifKannadaFont, label: "Noto Serif Kannada" },
          { font: HindSiliguriFont, label: "Hind Siliguri" },
          { font: TiroDevanagariHindiFont, label: "Tiro Devanagari Hindi" },
          { font: PTSansFont, label: "PT Sans" },
          { font: SourceSansProFont, label: "Source Sans Pro" },
          { font: AlegreyaFont, label: "Alegreya" },
          { font: NunitoFont, label: "Nunito" },
          { font: RubikFont, label: "Rubik" },
          { font: WorkSansFont, label: "Work Sans" },
          { font: CourierPrimeFont, label: "Courier Prime" },
          { font: LibreFranklinFont, label: "Libre Franklin" },
          { font: MonofettFont, label: "Monofett" },
          { font: NotoSerifFont, label: "Noto Serif" },
        ].map(({ font, label }) => (
          <div key={label} className="mb-2">
            <div>
            <label className="flex items-center justify-center cursor-pointer">
                <span
                  className={`${font.className}`}
                  onClick={() => setSelectedFontClass(font.className)}
                >
                  {label}
                </span>
              </label>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
