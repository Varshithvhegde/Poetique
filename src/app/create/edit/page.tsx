"use client"
// Your edit page component
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
interface PexelsImage {
    id: number;
    photographer: string;
    src: {
      tiny: string;
      large2x: string;
      // Add other necessary properties
    };
    // Add other necessary properties
  }
function EditPage() {
    const [fontSize, setFontSize] = useState(16); // Initial font size
    useEffect(() => {
        // Perform localStorage action
        const storedPoem = localStorage.getItem('poem');
        const parsedPoem = storedPoem ? JSON.parse(storedPoem) : '';
        const formattedPoem = parsedPoem.replace(/\\t/g, '\t');
      }, [])
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFontSize(parseInt(event.target.value, 10));
    };
  
    const [images, setImages] = useState<PexelsImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${searchQuery}`,
            {
              headers: {
                Authorization: "4o0UtnFDXW7lWj0oB4MORmhk1H3PicSS6N3c9qqajV52OuMf1fA7ZnjQ",
              },
            }
          );
          setImages(response.data.photos);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
  
      fetchImages();
    }, [searchQuery]);
  
    const handleImageClick = (image: PexelsImage) => {
      setSelectedImage(image);
    };
  
    return (
      <div className="flex" style={{opacity:0}}>
        <div className="w-1/2 p-8 bg-blue-500" style={{ width:"500px",height:"500px"}}>
          {/* Left part with colored image/canvas */}
          {selectedImage ? (
            <img
              src={selectedImage.src.large2x}
              alt={selectedImage.photographer}
              className="w-full h-full object-cover rounded shadow-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div className="w-1/2 p-8">
          {/* Right part with search box and image list */}
          <input
            type="text"
            placeholder="Search for images..."
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
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
        </div>
      </div>
    );
  }

export default EditPage;
