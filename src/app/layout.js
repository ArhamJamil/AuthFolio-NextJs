import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ThemeWrapper from "./components/theme-wrapper"



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          themes={["dark", "light", "rose", "darkblue", "darkgreen"]}
        >
          <ThemeWrapper>{children}</ThemeWrapper>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
