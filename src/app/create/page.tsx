"use client"
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Page() {
  const [title, setTitle] = useState('');
  const [poem, setPoem] = useState('');
  const [author, setAuthor] = useState('');
  const [poemError, setPoemError] = useState(false);
  const router = useRouter();

  const isDataValid = poem.trim() !== '';

  useEffect(() => {
    localStorage.setItem('title', title);
    localStorage.setItem('poem', JSON.stringify(poem));
    localStorage.setItem('author', author);
  }, [title, poem, author]);

  const handleGenerateQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setPoem(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleNextClick = () => {
    if (isDataValid) {
      setPoemError(false);
      // Continue to the next page using useRouter from Next.js
      router.push('/create/edit');
    } else {
      // Display an error for the empty poem field
      setPoemError(true);
    }
  };

  return (
    <div className="grid w-full max-w-screen-md gap-4 p-4 mx-auto">
      <Label htmlFor="title" className="text-xl font-bold">
        Title of Your Masterpiece
      </Label>
      <Input
        type="text"
        id="title"
        placeholder="E.g., Symphony of Dreams"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:border-blue-300 transition duration-300"
      />
      <Label htmlFor="poem" className="text-xl font-bold">
        Express Your Soulful Creation
      </Label>
      <div className="flex items-end justify-end">
        <a
          className=" text-blue-500 hover:text-blue-700 transition duration-300 cursor-pointer select-none"
          onClick={handleGenerateQuote}
        >
          Generate Random Quote
        </a>
      </div>
      <Textarea
        placeholder="Type your Poem or Inspirational Quote here."
        id="poem"
        value={poem}
        onChange={(e) => {
          setPoem(e.target.value);
          setPoemError(false);
        }}
        className={`p-2 border rounded focus:outline-none ${
          poemError ? 'border-red-500' : 'focus:border-blue-500'
        } transition duration-300 max-h-[80vh] h-80`}
      />
      {poemError && (
        <p className="text-red-500 text-sm">Please fill in the Poem field.</p>
      )}
      <Label htmlFor="author" className="text-xl font-bold">
        Craftsperson Behind the Words
      </Label>
      <Input
        type="text"
        id="author"
        placeholder="E.g., Jane Doe"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <Button
        type="button"
        onClick={handleNextClick}
        className="max-w-screen-md p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Next
      </Button>
    </div>
  );
}

export default Page;
