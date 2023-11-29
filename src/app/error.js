"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center h-full gap-7 justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
      <h2 className="text-2xl text-red-600">404 Not Found</h2>
      <p>something went wrong</p>
      <Button onClick={() => reset()}>try again</Button>
    </div>
  );
}
