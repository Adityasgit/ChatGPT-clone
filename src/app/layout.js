import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MindCase GPT",
  description: "This is the gpt from openai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        {" "}
        <body
          suppressHydrationWarning={true}
          className={inter.className}
          style={{
            backgroundColor: "#343541",
            overflow: "hidden",
          }}
        >
          <main>{children}</main>
          <Toaster />
        </body>
    </html>
  );
}
