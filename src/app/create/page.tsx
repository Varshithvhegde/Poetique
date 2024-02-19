import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Page() {
  return (
    <div className="grid w-full max-w-screen-md gap-4 p-4 mx-auto">
      <Label htmlFor="title" className="text-xl font-bold">
        Title of Your Masterpiece
      </Label>
      <Input
        type="text"
        id="title"
        placeholder="E.g., Symphony of Dreams"
        className="p-2 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <Label htmlFor="poem" className="text-xl font-bold">
        Express Your Soulful Creation
      </Label>
      <Textarea
        placeholder="Type your Poem or Inspirational Quote here."
        id="poem"
        className="p-2 border rounded focus:outline-none focus:border-blue-500 transition duration-300 max-h-[80vh] h-80"
      />
      <Label htmlFor="author" className="text-xl font-bold">
        Craftsperson Behind the Words
      </Label>
      <Input
        type="text"
        id="author"
        placeholder="E.g., Jane Doe"
        className="p-2 border rounded focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <Button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Next
      </Button>
    </div>
  );
}

export default Page;
