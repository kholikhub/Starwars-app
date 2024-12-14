import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="w-full bg-gray-800 text-white">
            <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Star Wars Fan Page</h1>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#films" className="text-gray-300 hover:text-white">List Films</a></li>
                <li><a href="#characters" className="text-gray-300 hover:text-white">List Characters</a></li>
              </ul>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="w-full p-3 bg-gray-800 text-white text-center">
            <p className="text-xs">&copy; {new Date().getFullYear()} Star Wars Fan Page. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}