import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "로디 베이커리 | 프리미엄 구움과자 답례품",
  description: "프랑스산 AOP 고메 버터와 유기농 밀가루로 구워내는 수제 구움과자 답례품 전문점. 결혼식, 돌잔치, 기업 행사 맞춤 패키지 및 커스텀 메시지 텍 무료 혜택.",
  keywords: ["답례품", "구움과자답례품", "결혼식답례품", "쿠키답례품", "돌잔치답례품", "로디베이커리", "수제쿠키선물세트"],
  openGraph: {
    title: "로디 베이커리 | 프리미엄 구움과자 답례품",
    description: "소중한 날, 감사의 마음을 담아 선물하는 수제 구움과자 답례품 전문 베이커리입니다.",
    url: "https://lodybakery.com",
    siteName: "로디 베이커리",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${playfair.variable} ${notoSansKr.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
