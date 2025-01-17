import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import "./globals.css";
import {Header, Footer } from "@/components/shared"


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark
    }}
    
    >
    <html suppressHydrationWarning  lang="en">
      
      <body>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
    </ClerkProvider>


  );
}
