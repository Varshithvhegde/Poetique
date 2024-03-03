  "use client";
  import React, { useState, useEffect, useRef } from "react";
  import axios from "axios";
  import styled from "styled-components";
  import Draggable from "react-draggable";
  import Pagination from "@/components/pagination/pagination";
  import { Input } from "@/components/ui/input";
  import { Transition } from "@headlessui/react";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { ScrollArea } from "@/components/ui/scroll-area"
  // Interface for PexelsImage
  interface PexelsImage {
    id: number;
    photographer: string;
    src: {
      tiny: string;
      large2x: string;
    };
  }

  const ColoredCanvas = styled.div<{ backgroundColor: string; imageOpacity: number; imageBlur: number }>`
  position: relative;
  width: 380px; /* Fixed width */
  height: 400px; /* Fixed height */
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto; /* Add margin: auto to center the element */
  // margin-top: 50vh; /* Add a margin-top to vertically center the element */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    opacity: ${(props) => props.imageOpacity};
    filter: blur(${(props) => props.imageBlur}px);
  }
`;

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
      setBackgroundColor("#b3e0ff");
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
  
    const handleImageOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setImageOpacity(parseFloat(event.target.value));
    };
  
    const handleImageBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setImageBlur(parseFloat(event.target.value));
    };
  
    return (
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-8">
          <ColoredCanvas
            backgroundColor={backgroundColor}
            imageOpacity={imageOpacity}
            imageBlur={imageBlur}
            className="mb-4 lg:mb-0 mx-4"
          >
            {selectedImage && (
              <img
                src={selectedImage.src.large2x}
                alt={selectedImage.photographer}
                className="rounded shadow-lg"
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
                  }}
                  dangerouslySetInnerHTML={{ __html: poem }}
                />
              </Draggable>
            )}
          </ColoredCanvas>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          {/* Updated Tabs structure */}
          <Tabs defaultValue="image" className="image-editor">
            <TabsList className="flex space-x-4 mb-6">
              <TabsTrigger value="image" className="w-[150px]">Image Editor</TabsTrigger>
              <TabsTrigger value="text" className="w-[150px]">Text Editor</TabsTrigger>
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
                <Input
                  style={{ width: "100px" }}
                  type="color"
                  value={backgroundColor}
                  onChange={handleColorChange}
                  className="mr-2"
                  placeholder="color"
                />
              </div>
              <div className="flex items-center mb-4">
                <label htmlFor="imageOpacitySlider">Image Opacity: </label>
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
              <div className="flex items-center mb-4">
                <label htmlFor="imageBlurSlider">Image Blur: </label>
                <input
                  id="imageBlurSlider"
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={imageBlur}
                  onChange={handleImageBlurChange}
                  className="ml-2"
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
              {/* Add your text editor content here */}
              Text Editor
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
  
  export default EditPage;