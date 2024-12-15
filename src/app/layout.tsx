import "../styles/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="w-full bg-gradient-to-r from-black via-gray-800 to-black">
            <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Star Wars Fan Page</h1>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/films"
                    className="text-gray-300 hover:text-white"
                  >
                    List Films
                  </Link>
                </li>
                <li>
                  <Link
                    href="/characters"
                    className="text-gray-300 hover:text-white"
                  >
                    List Characters
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          {/* Main Content */}
          <main className="flex-1 bg-gray-800">
            {children}
          </main>
          {/* Footer */}
          <footer className="w-full p-3 bg-gray-800 text-white text-center">
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Star Wars Fan Page. All rights
              reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}

