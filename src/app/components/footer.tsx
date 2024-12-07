"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] p-4 w-full">
      <div className="flex items-center justify-between w-full">
        {/* Links section, displayed horizontally and centered */}
        <div className="flex space-x-16 flex-grow justify-center text-gray-700 font-bold">
          <a href="#" className="text-sm hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-sm hover:text-blue-500">
            About
          </a>
          <a href="#" className="text-sm hover:text-blue-500">
            Contact Us
          </a>
          <a href="#" className="text-sm hover:text-blue-500">
            Donations
          </a>
        </div>
      </div>

      {/* Bottom text with separator */}
      <div className="mt-4 border-t border-gray-700 pt-2 text-center text-sm text-gray-700">
        <p>© 2024 artblock | designed by hello555</p>
      </div>
    </footer>
  );
}
