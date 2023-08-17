import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

export const metadata = {
  title: "Ergobook | Fantastic Notes",
  description: "For better and faster note-taking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
