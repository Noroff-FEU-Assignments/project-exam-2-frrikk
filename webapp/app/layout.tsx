import "./globals.css";
import UserContextProvider from "@/app/_context/user-context";
import MenuBar from "@/app/_components/menu-bar";
import Providers from "@/app/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-[100%]">
      <body
        suppressHydrationWarning
        className="h-[100%] bg-pastel-lightGreen p-6 sm:p-10 max-w-[1200px] m-auto"
      >
        <Providers>
          <UserContextProvider>
            {children}
            <MenuBar />
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
