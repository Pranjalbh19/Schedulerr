import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Inter} from 'next/font/google'
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Scheduler",
  description: "Scheduler app",
};
const inter = Inter({subsets:['latin']})
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={inter.className}
      >
        {/*Header*/}
<Header></Header>
<main className  = "min-h-screen bg-gradient-to-b from-blue-50 to-white">
{children}


</main>

        {/*Footer*/}
        <footer className = "bg-blue-100 py-12">
          <div className = "container mx-auto px-4 text-center text-gray-600">
            <p>
              Shedule yourself
            </p>
          </div>

        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
