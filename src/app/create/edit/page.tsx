"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Draggable from "react-draggable";
import Pagination from "@/components/pagination/pagination";
import { Input } from "@/components/ui/input";
import { Transition } from "@headlessui/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toPng, toSvg } from "html-to-image";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { TextStyleToggleGroup } from "@/components/toggle-group/TextStyleToggleGroup";
// import { toPng } from "html-to-image"; // Import the toPng function
// Interface for PexelsImage
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
  border-radius: 8px;
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
    border-radius: 8px;
    opacity: ${(props) => props.imageOpacity};
    filter: blur(${(props) => props.imageBlur}px);
  }
`;
const options = {
  allowTaint: true,
  useCORS: true,
  removeContainer: true,
};
const PoemContainer = styled.div<{ fontSize: number }>`
  color: black; /* Default color */
  font-size: ${(props) => props.fontSize}px;
  z-index: 4; /* Change the z-index value to bring the text above the image */
  user-select: none; /* Make the text unselectable */
  position: absolute;
  cursor: move;
  touch-action: none;
  // font-weight: bold;
  // font-style :italic;
  // font-family: "Times New Roman", Times, serif;
`;
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem; // Adjust the margin as needed
`;
// Your EditPage component
function EditPage() {
  const [fontSize, setFontSize] = useState(16);
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("nature");
  const [backgroundColor, setBackgroundColor] = useState("#b3e0ff");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [poem, setPoem] = useState<string>("");
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageBlur, setImageBlur] = useState(0);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textStyles, setTextStyles] = useState<Set<string>>(new Set());
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownloadClick = async () => {
    // Use the ref instead of document.getElementById
    if (canvasContainerRef.current && imageLoaded) {
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
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  // const prepareURL = async () => {
  //   const cardElement = canvasContainerRef.current;

  //   if (!cardElement) return;

  //   try {
  //     // lazy load this package
  //     const html2canvas = await import(
  //       /* webpackPrefetch: true */ "html2canvas"
  //     );

  //     const result = await html2canvas.default(cardElement, options);
  //     const asURL = result.toDataURL("image/png");
  //     // as far as I know this is a quick and dirty solution
  //     const anchor = document.createElement("a");
  //     anchor.href = asURL;
  //     anchor.download = "your-card.png";
  //     anchor.click();
  //     anchor.remove();
  //    // maybe this part should set state with `setURLData(asURL)`
  //    // and when that's set to something you show the download button
  //    // which has `href=URLData`, so that people can click on it
  //   } catch (reason) {
  //     console.log(reason);
  //   }
  // };

  useEffect(() => {
    const storedPoem = localStorage.getItem("poem");
    const parsedPoem = storedPoem ? JSON.parse(storedPoem) : "";
    const formattedPoem = parsedPoem.replace(/\n/g, "<br>");
    setPoem(formattedPoem);
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

  const handleTextClick = () => {
    // setFontSize((prevFontSize) => (prevFontSize === 16 ? 20 : 16));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const formattedPoem = event.target.innerText.replace(/\n/g, "<br>");
    setPoem(formattedPoem);
    localStorage.setItem("poem", JSON.stringify(formattedPoem));
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
    if (updatedStyles.has(style)) {
      updatedStyles.delete(style);
    } else {
      updatedStyles.add(style);
    }
    setTextStyles(updatedStyles);
  };

  const appliedStyles = Array.from(textStyles).join(' ');

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
                src={selectedImage.src.large2x}
                alt={selectedImage.photographer}
                className="rounded shadow-lg"
                onLoad={handleImageLoad}
              />
            )}
            {poem && (
              <Draggable
                bounds="parent"
                position={position}
                onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
              >
                <PoemContainer
  fontSize={fontSize}
  onClick={handleTextClick}
  contentEditable={false}
  style={{
    position: "absolute",
    width: "fit-content",
    height: "fit-content",
    textAlign: "center",
    zIndex: 3,
    fontWeight: textStyles.has("bold") ? "bold" : "normal",
    fontStyle: textStyles.has("italic") ? "italic" : "normal",
    textDecoration: textStyles.has("underline") ? "underline" : "none",
  }}
  dangerouslySetInnerHTML={{ __html: poem }}
/>
              </Draggable>
            )}
          </ColoredCanvas>
        </div>
        <Button onClick={handleDownloadClick} className="mt-4">
          Download
        </Button>
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
              placeholder="Search for images..."
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Input
                  style={{ width: "50px" }}
                  type="color"
                  value={backgroundColor}
                  onChange={handleColorChange}
                  className="mr-2"
                  placeholder="color"
                />
              </div>
              <div className="flex items-center mr-4">
                <label htmlFor="imageOpacitySlider" className="mr-2">
                  Opacity:{" "}
                </label>
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
              <label htmlFor="imageBlurSlider" className="mr-2">
                Image Blur:{" "}
              </label>
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
                {images.map((image) => (
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
    <TextStyleToggleGroup
      textStyles={textStyles}
      onTextStyleToggle={handleTextStyleToggle}
    />
  </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EditPage;
