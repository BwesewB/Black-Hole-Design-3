import "./styles/globals.css";

export const metadata = {
  title: "Black Hole",
  description: "Generated by Sebastian Fok",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{padding:"0", margin:"0"}}>
      <body>
        {children}
      </body>
    </html>
  );
}
