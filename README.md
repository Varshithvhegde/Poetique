
<h1 align="center" style="font-size:50px;"><a href="https://poetique.vercel.app">Poetique</a></h1>  

Poetique is an innovative online platform that allows users to transform words into stunning visual poetry effortlessly. Whether you're a seasoned poet or just starting out, Poetique offers a plethora of tools and resources to help you craft captivating pieces of art from your own words or from existing literary works. With a vast library of over 80,000 images to choose from, you can easily find the perfect visuals to complement your poetry, adding depth and meaning to your creations.

## Get Started
Ready to unleash your creativity? Here's how to get started with Poetique:

1. Visit Poetique website.
2. Input your poem/quote, title, and author (if needed).
3. Explore the editing page where you can change background images and text styles.
4. Customize your visual poetry to your heart's content.
5. Save and share your masterpiece with the world!


## Features

- **Create Visual Poetry**: Input your poems or quotes along with titles and authors (if needed) and transform them into visually stunning poetry.
- **Customization Options**: Customize your visual poetry by changing background images, text styles, and more.
- **Pexels Integration**: Integrated with the Pexels Image API to provide users with a vast collection of high-quality images to choose from.
- **Download and Share**: Download your visual poetry as an image or share it directly with others.

## Customization & Accessibility

One of the key features of Poetique is its intuitive customization options. Users have the freedom to personalize their visual poetry by adjusting background colors, text colors, and other visual elements, allowing for endless creativity and expression. Whether you prefer a minimalist aesthetic or a bold and vibrant style, Poetique provides the flexibility to bring your artistic vision to life.

What sets Poetique apart from other platforms is its commitment to accessibility. Unlike some creative tools that come with hefty price tags, Poetique offers all of its features completely free of charge. There are no hidden costs or subscription fees – just pure, unadulterated creativity. This democratization of art means that anyone, regardless of their financial circumstances, can explore the world of visual poetry and share their unique voice with the world.

## Technologies Used

- **Frontend Framework**: Next.js 14
- **Styling Framework**: Shadcn, Aceternity UI
- **Image Source**: Pexels Image API
- **Image Manipulation**: `html-to-image` library
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
- **HTTP Requests**: Axios for fetching images from the Pexels API
- **Routing**: `next/navigation` for navigating between pages
- **UI Components**: Custom components such as `Pagination`, `Button`, `Input`, `ScrollArea`, `Tabs`, etc.
- **Fonts**: Various font options provided by Radix UI and custom font selections
- **Styling**: Styled Components for dynamic styling


### Tech Stack

1. **Next.js 14**: Next.js is a React framework that enables server-side rendering, static site generation, and routing for React-based web applications. It simplifies the development process by providing built-in features like code splitting, hot module replacement, and optimized production builds. Version 14 of Next.js brings new enhancements and improvements to the framework.

2. **Shadcn**: Shadcn is likely a typo or an internal library specific to the project. Without further context or documentation, it's challenging to provide specific information about it. However, it might be related to styling, animations, or other UI-related functionalities.

3. **Aceternity UI**: Aceternity UI seems to be another custom or third-party UI library used in the project. Again, without additional information, it's difficult to provide specific details about its features or functionalities. It might include components, styles, or utilities designed to enhance the user interface of the application.

4. **Pexels Image API**: Pexels Image API is a third-party API used to fetch images for the Poetique application. It provides access to a vast collection of high-quality, royalty-free images that users can use to enhance their visual poetry creations. The API allows users to search for images based on keywords and provides various endpoints for retrieving image data.

## Main Code Snippets 

### 1. Image Search and Selection:

**Description:** This functionality allows users to search for images based on a query and select an image to use as the background for their poem. It utilizes the Pexels API to fetch images based on the user's search query.

**How it works:**
- The component maintains state variables such as `images`, `selectedImage`, and `searchQuery` using React's `useState` hook.
- The `fetchImages` function is an asynchronous function that sends a GET request to the Pexels API endpoint with the search query and page number.
- Upon receiving a response, it updates the `images` state with the fetched photos and sets the `totalPages` state with the total number of pages of results.
- When a user clicks on an image, the `handleImageClick` function sets the selected image in the state.

```javascript
const [images, setImages] = useState<PexelsImage[]>([]);
const [selectedImage, setSelectedImage] = useState<PexelsImage | null>(null);
const [searchQuery, setSearchQuery] = useState("nature");

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

const handleImageClick = (image: PexelsImage) => {
  setSelectedImage(image);
};
```

### 2. Text Styling:

**Description:** This feature enables users to style text by changing font color, font size, font family, and applying bold, italic, or underline formatting.

**How it works:**
- The component maintains state variables such as `textStyles`, `fontColor`, `fontSize`, `bold`, and `selectedFont` using React's `useState` hook.
- Functions like `handleFontColorChange`, `handleFontSizeChange`, and `handleBoldText` update their respective state variables when the user interacts with the UI elements.
- The `handleTextStyleToggle` function is responsible for adding or removing text styles from the `textStyles` set based on user actions.

    ```javascript
    const [textStyles, setTextStyles] = useState<Set<string>>(new Set());
    const [fontColor, setFontColor] = useState("#000000");
    const [fontSize, setFontSize] = useState(16);
    const [bold, setBold] = useState<boolean>(false);
    const [selectedFont, setSelectedFont] = useState<string | null>(null);

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

    const handleBoldText = () => {
    setBold(!bold);
    handleTextStyleToggle("bold");
    };
    ```

### 3. Image Rendering and Styling:

**Description:** This functionality renders the selected image and allows users to apply styling options such as background color, opacity, and blur.

**How it works:**
- The component maintains state variables such as `backgroundColor`, `imageOpacity`, and `imageBlur` using React's `useState` hook.
- Functions like `handleColorChange`, `handleImageOpacityChange`, and `handleImageBlurChange` update their respective state variables when the user interacts with the UI elements.

    ```javascript
    const [backgroundColor, setBackgroundColor] = useState("#b3e0ff");
    const [imageOpacity, setImageOpacity] = useState(1);
    const [imageBlur, setImageBlur] = useState(0);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
    setSelectedImage(null);
    };

    const handleImageOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageOpacity(parseFloat(event.target.value));
    };

    const handleImageBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageBlur(parseFloat(event.target.value));
    };
    ```

### 4. Download and Share:

**Description:** This feature enables users to download the created image or share it via supported platforms.

**How it works:**
- The `handleDownloadClick` function initiates the download process by converting the content of the canvas container to an image using `toPng` from the `html-to-image` library. It then creates a download link for the image and triggers a download.
- The `handleShareClick` function allows users to share the image using the Web Share API if supported by the browser. It converts the content of the canvas container to a Blob and shares it using the `navigator.share` method.

    ```javascript
    const handleDownloadClick = async () => {
    setisDownloading(true);
    if (canvasContainerRef.current) {
        try {
        const dataUrl = await toPng(canvasContainerRef.current, {
            quality: 1.0,
        });
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
        if (canvasContainerRef.current) {
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
            alert("Sharing is not supported on this browser.");
        }
        }
    } catch (error) {
        console.error("Error sharing:", error);
    }
    };
    ```

### 5. Handling Style Changes:

**Description:** This functionality allows users to toggle text styles such as font color, font size, and alignment.

**How it works:**
- The `handleTextStyleToggle` function manages the addition and removal of text styles from the `textStyles` set based on user actions.
- It parses the style string to determine the type of style to apply (e.g., font color, font size) and updates the relevant state variables accordingly.

    ```javascript
    const handleTextStyleToggle = (style: string) => {
    const updatedStyles = new Set(textStyles);

    if (style.includes("align-")) {
        updatedStyles.forEach((existingStyle) => {
        if (existingStyle.startsWith("align-")) {
            updatedStyles.delete(existingStyle);
        }
        });
    }

    if (style.startsWith("text-color-")) {
        updatedStyles.forEach((existingStyle) => {
        if (existingStyle.startsWith("text-color

    -")) {
            updatedStyles.delete(existingStyle);
        }
        });
    }

    if (updatedStyles.has(style)) {
        updatedStyles.delete(style);
    } else {
        updatedStyles.add(style);
    }

    if (style.startsWith("font-size-")) {
        updatedStyles.forEach((existingStyle) => {
        if (existingStyle.startsWith("font-size-")) {
            updatedStyles.delete(existingStyle);
        }
        });
        setFontSize(parseInt(style.replace("font-size-", ""), 10));
    }

    setTextStyles(new Set(Array.from(updatedStyles)));
    };
    ```

These functionalities collectively enable users to create visually appealing poems by combining images and styled text, providing them with a versatile and user-friendly platform for creative expression.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Varshithvhegde/Poetique.git
   ```

2. Navigate to the project directory:

   ```bash
   cd poetique
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add your Pexels API key:
   - Get your Pexels API from [pexels.com](https://www.pexels.com/api/)
     ```env
     NEXT_PUBLIC_PEXELS_API_KEY=your_api_key_here
     ```

5. Run the project:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000/` to access the page.

## Contributing

Contributions are welcome! If you'd like to contribute to Poetique, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/myfeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/myfeature`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- **Pexels**: Thanks to Pexels for providing the API used to fetch high-quality images.
- **Next.js**: Next.js made it easy to build a fast and scalable React application.
- **Aceternity UI**: Aceternity UI provided useful UI components and styling utilities.
- **Shadcn**: Shadcn helped in creating beautiful shadow effects for UI elements.

---
