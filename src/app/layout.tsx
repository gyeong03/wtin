import type { Metadata, Viewport } from "next";
import "./globals.css";
import GNB from "@/components/GNB";

export const metadata: Metadata = {
  title: "Wt'in - 부산 빈티지 연결하다",
  description: "부산 지역 빈티지 옷가게와 유저를 연결하는 서비스 Wt'in",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Soft-Wall MVP test configuration: Set true/false to simulate login states
  const mockIsLoggedIn = false;

  return (
    <html lang="ko" className="h-full select-none antialiased">
      <body className="h-full bg-brand-bg text-brand-primary flex justify-center overflow-hidden">
        {/* Mobile Mockup Wrapper for Premium Presentation */}
        <div className="w-full max-w-md h-full bg-brand-bg shadow-2xl relative flex flex-col overflow-hidden border-x border-brand-primary/10">
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
          <GNB isLoggedIn={mockIsLoggedIn} />
        </div>
      </body>
    </html>
  );
}
