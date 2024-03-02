"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Draggable from "react-draggable";
import Pagination from "@/components/pagination/pagination";
import { Input } from "@/components/ui/input";

// Interface for PexelsImage
interface PexelsImage {
  id: number;
  photographer: string;
  src: {
    tiny: string;
    large2x: string;
  };
}

// Styled component for the left part with colored image/canvas
// const ColoredCanvas = styled.div<{ backgroundColor: string; imageSrc: string }>`
//   position: relative;
//   width: 100%; /* Make it responsive */
//   padding-bottom: 75%; /* Aspect ratio 4:3 (300 / 400) */
//   border-radius: 8px;
//   overflow: hidden;
//   background-color: ${(props) => props.backgroundColor};
// `;

const ColoredCanvas = styled.div<{ backgroundColor: string }>`
  position: relative;
  width: 400px; /* Fixed width */
  height: 300px; /* Fixed height */
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
`;

const PoemContainer = styled.div<{ fontSize: number }>`
  color: black; /* Default color */
  font-size: ${(props) => props.fontSize}px;
  z-index: 2;
  user-select: none; /* Make the text unselectable */
  position: absolute;
  white-space: nowrap; /* Avoid breaking lines */
  cursor: move;
  touch-action: none;
`;

// Your EditPage component
function EditPage() {
  const [fontSize, setFontSize] = useState(16);
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#b3e0ff");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [poem, setPoem] = useState<string>("");
  const [position, setPosition] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const storedPoem = localStorage.getItem("poem");
    const parsedPoem = storedPoem ? JSON.parse(storedPoem) : "";
    const formattedPoem = parsedPoem.replace(/\\t/g, "\t");
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
    fetchImages(currentPage);
  }, [searchQuery, currentPage]);

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
    setPoem(event.target.innerText);
    localStorage.setItem("poem", JSON.stringify(event.target.innerText));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-8">
        <ColoredCanvas backgroundColor={backgroundColor} className="mb-4 lg:mb-0">
          {selectedImage && (
            <img
              src={selectedImage.src.large2x}
              alt={selectedImage.photographer}
              className="w-full h-full object-cover rounded shadow-lg"
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
                style={{ position: "absolute", width: "fit-content", height: "fit-content", zIndex: 2 }}
              >
                {poem}
              </PoemContainer>
            </Draggable>
          )}
        </ColoredCanvas>
      </div>
      <div className="w-full lg:w-1/2 p-8">
        <Input
          type="text"
          placeholder="Search for images..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></Input>
        <Input
          type="color"
          value={backgroundColor}
          onChange={handleColorChange}
          className="mt-4"
          placeholder="color"
        ></Input>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default EditPage;
