import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Inter} from 'next/font/google'
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/ui/create-event";


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
<Header ></Header>
<main className  = "min-h-screen bg-gradient-to-b from-gray-700 to-black">
{children}


</main>
        {/*Footer*/}
        <footer className = "bg-gray-600 py-12">
          <div className = "container mx-auto px-4 text-center text-gray-900">
            <p>
              Schedule yourself
            </p>
          </div>

        </footer>
                  <CreateEventDrawer />


      </body>
    </html>
    </ClerkProvider>

  );
}
