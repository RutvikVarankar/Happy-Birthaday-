import "./globals.css";

export const metadata = {
  title: "Something special for you... ",
  description: "Happy Birthday! 🎂 A birthday surprise made just for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
