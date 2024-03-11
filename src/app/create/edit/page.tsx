"use client";
import Pagination from "@/components/pagination/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { toBlob, toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { TextStyleToggleGroup } from "@/components/toggle-group/TextStyleToggleGroup";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Share1Icon } from "@radix-ui/react-icons";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
interface PexelsImage {
  id: number;
  photographer: string;
  src: {
    tiny: string;
    large2x: string;
  };
}

const ColoredCanvas = styled.div<{
  backgroundColor: string;
  imageOpacity: number;
  imageBlur: number;
}>`
  position: relative;
  width: 380px; /* Fixed width */
  height: 400px; /* Fixed height */
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${(props) => props.imageOpacity};
    filter: blur(${(props) => props.imageBlur}px);
  }
`;
const options = {
  allowTaint: true,
  useCORS: true,
  removeContainer: true,
};
const PoemContainer = styled.div<{
  appliedStyles: string;
  selectedFont: string;
}>`
  color: black; /* Default color */
  z-index: 4; /* Change the z-index value to bring the text above the image */
  user-select: none; /* Make the text unselectable */
  position: absolute;
  cursor: move;
  touch-action: none;
  ${({ appliedStyles, selectedFont }) => `
  ${appliedStyles}
  ${selectedFont ? `className: ${selectedFont};` : ""}
  
`}
`;
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem; // Adjust the margin as needed
`;

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
// Your EditPage component
function EditPage() {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("nature");
  const [backgroundColor, setBackgroundColor] = useState("#b3e0ff");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState<string>("");
  const [poem, setPoem] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [position, setPosition] = useState({ x: 10, y: 50 });
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageBlur, setImageBlur] = useState(0);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textStyles, setTextStyles] = useState<Set<string>>(new Set());
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [isDownloading, setisDownloading] = useState<Boolean>(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(16);
  const [bold,setbold]= useState<boolean>(false);
  const router = useRouter();

  let pending = false;
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setFontColor(color);
    handleTextStyleToggle(`text-color-${color}`);
  };

  const handleFontSizeChange = (value: string) => {
    const size = parseInt(value, 10);
    setFontSize(size);
    handleTextStyleToggle(`font-size-${size}`);
  };

  const handleBoldText = ()=>{
    handleTextStyleToggle("bold");
    if(bold){
      setbold(false);
    }
    else{
      setbold(true);
    }
    
  }

  const handleDownloadClick = async () => {
    setisDownloading(true);
    // Use the ref instead of document.getElementById
    if (canvasContainerRef.current) {
      try {
        // Use toPng from html-to-image to convert the container content to an image
        const dataUrl = await toPng(canvasContainerRef.current, {
          quality: 1.0,
        });

        // Create a download link for the image
        const link = document.createElement("a");
        link.href = dataUrl || "";
        link.download = "downloaded-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setisDownloading(false);
      } catch (error) {
        setisDownloading(false);
        console.error("Error downloading image:", error);
      }
    }
    setisDownloading(false);
  };

  const handleShareClick = async () => {
    try {
      // Use the ref instead of document.getElementById
      if (canvasContainerRef.current) {
        // Use toBlob to convert the container content to a Blob
        const blob = await toBlob(canvasContainerRef.current, {
          quality: 1.0,
        });

        if (blob && navigator.share) {
          await navigator.share({
            title: "Poetique Image",
            text: "Check out this beautiful image poem!",
            files: [
              new File([blob], "poetique-image.png", { type: "image/png" }),
            ],
          });
        } else {
          // Fallback for browsers that do not support Web Share API
          // You can provide a link or any other sharing mechanism here
          alert("Sharing is not supported on this browser.");
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  useEffect(() => {
    const storedPoem = localStorage.getItem("poem");
    console.log(storedPoem, "storedPoem");

    const parsedPoem = storedPoem ? JSON.parse(storedPoem) : "";
    if (parsedPoem === "" || !parsedPoem || parsedPoem.trim() === "") {
      console.log(parsedPoem, "parsedPoem");
      router.push("/");
    }
    const AuthorLocal = localStorage.getItem("author");
    const TitleLocal = localStorage.getItem("title");
    const formattedAuthor = AuthorLocal ? `-  ${AuthorLocal}` : "";

    const lines = parsedPoem.split("\n");
    let isPreviousLineEmpty = false;

    const formattedLines = lines.map((line: any, index: any) => {
      const isEmptyLine = line.trim() === "";
      const lineContent = isEmptyLine
        ? '<span style="height: 10px; display: block;"></span>'
        : line;
      const resultLine = isEmptyLine ? lineContent : lineContent + "<br/>";
      console.log(resultLine);
      isPreviousLineEmpty = isEmptyLine;

      return resultLine;
    });

    const fullPoem =
      formattedLines.join("\n") +
      "\n" +
      "\t\t" +
      '<span style="height: 6px; display: block;"></span>' +
      formattedAuthor;
    setPoem(fullPoem);

    setAuthor(AuthorLocal ? AuthorLocal : "");
    setTitle(TitleLocal ? TitleLocal : "");
  }, []);

  const fetchImages = async (page: number) => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchQuery}&page=${page}`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
          },
        }
      );
      setImages(response.data.photos);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    // Reset currentPage to 1 when searchQuery changes
    setCurrentPage(1);
    fetchImages(1);
  }, [searchQuery]);

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleImageClick = (image: PexelsImage) => {
    setSelectedImage(image);
    // setBackgroundColor("#b3e0ff");
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
    setSelectedImage(null);
  };

  const handleImageOpacityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageOpacity(parseFloat(event.target.value));
  };

  const handleImageBlurChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageBlur(parseFloat(event.target.value));
  };

  const handleTextStyleToggle = (style: string) => {
    const updatedStyles = new Set(textStyles);

    // Handle text align styles
    if (style.includes("align-")) {
      updatedStyles.forEach((existingStyle) => {
        if (existingStyle.startsWith("align-")) {
          updatedStyles.delete(existingStyle);
        }
      });
    }

    // Handle text color style
    if (style.startsWith("text-color-")) {
      updatedStyles.forEach((existingStyle) => {
        if (existingStyle.startsWith("text-color-")) {
          updatedStyles.delete(existingStyle);
        }
      });
    }

    // Add or remove the style
    if (updatedStyles.has(style)) {
      updatedStyles.delete(style);
    } else {
      updatedStyles.add(style);
    }

    // Handle font size style
    if (style.startsWith("font-size-")) {
      // Remove existing font-size styles
      updatedStyles.forEach((existingStyle) => {
        if (existingStyle.startsWith("font-size-")) {
          updatedStyles.delete(existingStyle);
        }
      });

      // Add the new font-size style
      setFontSize(parseInt(style.replace("font-size-", ""), 10));
    }

    setTextStyles(new Set(Array.from(updatedStyles)));
  };

  const appliedStyles = Array.from(textStyles).join(" ");

  const handleFirstImageClick = () => {
    // Trigger the input for selecting an image from the user's media
    document.getElementById("fileInput")?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the selected image to the uploaded image
        setSelectedImage({
          id: Date.now(), // Use a unique ID or timestamp as a temporary ID
          photographer: "User Uploaded",
          src: {
            tiny: reader.result as string,
            large2x: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-8 flex flex-col items-center justify-center">
        <div
          style={{ width: "380px", height: "400px" }}
          ref={canvasContainerRef}
          className="mb-4"
        >
          <ColoredCanvas
            backgroundColor={backgroundColor}
            imageOpacity={imageOpacity}
            imageBlur={imageBlur}
            className="mx-auto"
            id="canvas-container"
          >
            {selectedImage && (
              <img
                src={
                  selectedImage.src.large2x
                    ? selectedImage.src.large2x
                    : "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                alt={selectedImage.photographer}
                onLoad={handleImageLoad}
              />
            )}
            {title && (
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  // marginTop: "10px",
                  top: "20px",
                  // width: "100%",
                  zIndex: 3,
                  userSelect: "none",
                  position: "absolute",
                  fontFamily: "serif",
                  color: Array.from(textStyles)
                    .find((style) => style.startsWith("text-color-"))
                    ?.replace("text-color-", ""),
                }}
                dangerouslySetInnerHTML={{ __html: title }}
              ></div>
            )}

            {poem && (
              <Draggable
                bounds="parent"
                position={position}
                onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
              >
                <PoemContainer
                  contentEditable={false}
                  appliedStyles={appliedStyles}
                  selectedFont={selectedFont || ""}
                  className={selectedFont || ""}
                  style={{
                    position: "absolute",
                    width: "fit-content",
                    height: "fit-content",
                    textAlign: textStyles.has("align-center")
                      ? "center"
                      : textStyles.has("align-left")
                      ? "left"
                      : textStyles.has("align-right")
                      ? "right"
                      : "center",
                    zIndex: 3,
                    fontWeight: textStyles.has("bold") ? "bold" : "normal",
                    fontStyle: textStyles.has("italic") ? "italic" : "normal",
                    textDecoration: textStyles.has("underline")
                      ? "underline"
                      : "none",
                    color: Array.from(textStyles)
                      .find((style) => style.startsWith("text-color-"))
                      ?.replace("text-color-", ""),
                    fontSize: `${fontSize}px`, // Use the fontSize state here
                  }}
                  dangerouslySetInnerHTML={{ __html: poem }}
                />
              </Draggable>
            )}
          </ColoredCanvas>
        </div>
        <div className="flex mt-4">
          <Button onClick={handleDownloadClick} className="mr-2">
            {isDownloading && (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Downloading
              </>
            )}
            {!isDownloading && <>Download</>}
          </Button>
          <Button onClick={handleShareClick}>
            Share
            <Share1Icon className="mx-2" />
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-8">
        {/* Updated Tabs structure */}
        <Tabs defaultValue="image" className="image-editor">
          <TabsList className="flex space-x-4 mb-6">
            <TabsTrigger value="image" className="w-[150px]">
              Image Editor
            </TabsTrigger>
            <TabsTrigger value="text" className="w-[150px]">
              Text Editor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="image">
            <Input
              type="text"
              defaultValue=""
              placeholder="Search for images..."
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Label htmlFor="background" className="mr-2">
                  Background:
                </Label>
                <Input
                  style={{ width: "80px" }}
                  type="color"
                  value={backgroundColor}
                  onChange={handleColorChange}
                  className="mr-2"
                  placeholder="color"
                  id="background"
                />
              </div>
              <div className="flex items-center mr-4">
                <Label htmlFor="imageOpacitySlider" className="mr-2">
                  Opacity:{" "}
                </Label>
                <input
                  id="imageOpacitySlider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={imageOpacity}
                  onChange={handleImageOpacityChange}
                  className="ml-2"
                />
              </div>
            </div>
            <div className="flex items-center  mb-4">
              <Label htmlFor="imageBlurSlider" className="mr-2">
                Image Blur:{" "}
              </Label>
              <input
                id="imageBlurSlider"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={imageBlur}
                onChange={handleImageBlurChange}
                className="ml-2 w-[250px]"
              />
            </div>
            <ScrollArea className="overflow-x-auto h-[300px] rounded-md border p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Special handling for the first image */}
                <div className="cursor-pointer hover:shadow-lg flex flex-col items-center justify-center">
                  {/* Display the "+" icon or any other element to indicate the user can select an image */}
                  <label
                    htmlFor="fileInput"
                    className="text-center mb-2 items-center flex flex-col justify-center cursor-pointer"
                  >
                    <PlusCircledIcon className="w-4 h-4" />
                    Choose Image From Media
                  </label>
                  {/* Input for selecting an image from the user's media */}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                </div>

                {/* Display other images */}
                {images.slice(1).map((image) => (
                  <img
                    key={image.id}
                    src={image.src.tiny}
                    alt={image.photographer}
                    className="cursor-pointer hover:shadow-lg"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </ScrollArea>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </TabsContent>
          <TabsContent value="text">
            <div className="mb-4">
              {/* <TextStyleToggleGroup
                textStyles={textStyles}
                onTextStyleToggle={handleTextStyleToggle}
                setSelectedFontClass={setSelectedFont}
              /> */}
                  <div className="flex flex-col items-center space-y-4">
      {/* First Line: Font Color and Font Size */}
      <div className="flex items-center space-x-6">
        <Label className="flex items-center cursor-pointer">Font Color:</Label>
        <Input
          type="color"
          value={fontColor}
          onChange={handleFontColorChange}
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
            onClick={() => handleBoldText()}
          >
            <FontBoldIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => handleTextStyleToggle("italic")}
          >
            <FontItalicIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={() => handleTextStyleToggle("underline")}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="single">
          <ToggleGroupItem
            value="align-left"
            aria-label="Align left"
            onClick={() => handleTextStyleToggle("align-left")}
          >
            <TextAlignLeftIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="align-center"
            aria-label="Align center"
            onClick={() => handleTextStyleToggle("align-center")}
          >
            <TextAlignCenterIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="align-right"
            aria-label="Align right"
            onClick={() => handleTextStyleToggle("align-right")}
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
                  onClick={() => setSelectedFont(font.className)}
                >
                  {label}
                </span>
              </label>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EditPage;
