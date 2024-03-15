
# [Poetique](https://poetique.vercel.app/)

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

Feel free to customize the README according to your project's specific details and requirements.