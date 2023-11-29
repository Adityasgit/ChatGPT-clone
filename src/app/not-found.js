import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-full gap-7 justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
      <h2 className="text-2xl text-red-600">404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Button>
        <Link href="/" className="">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
