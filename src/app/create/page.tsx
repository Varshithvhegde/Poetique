"use client"
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Page() {
  const [title, setTitle] = useState('');
  const [poem, setPoem] = useState('');
  const [author, setAuthor] = useState('');

  const isDataValid =poem !== '';

  const data = {
      "title":title,
      "poem": poem,
      "author":author
  }

  useEffect(()=>{
    localStorage.setItem("title",title)
    localStorage.setItem("poem", JSON.stringify(poem));
    localStorage.setItem("author",author)
  },[title,poem,author])

  

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
        className="p-2 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <Label htmlFor="poem" className="text-xl font-bold">
        Express Your Soulful Creation
      </Label>
      <Textarea
        placeholder="Type your Poem or Inspirational Quote here."
        id="poem"
        value={poem}
        onChange={(e) => setPoem(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:border-blue-500 transition duration-300 max-h-[80vh] h-80"
      />
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
      <Link  href={{
    pathname: '/create/edit'
  }} 
  className="max-w-screen-md">
      <Button
        type="submit"
        className="max-w-screen-md p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Next
      </Button>
      </Link>
    </div>
  );
}

export default Page;
