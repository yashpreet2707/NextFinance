import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Finance",
  description: "next gen AI finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ScrollToTop />
          {/* Header */}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          {/* Footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💙 by Yashpreet</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
