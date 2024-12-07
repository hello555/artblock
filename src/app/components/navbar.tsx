"use client";

import { useUserSession } from "@/app/hooks/userSession";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => (
  <>
    <span className="hidden md:block text-gray-800 text-sm">
      {user.user_metadata?.user_name}
    </span>
    {user.user_metadata?.avatar_url && (
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={user.user_metadata?.avatar_url}
          alt="User Avatar"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    )}
  </>
);

const LoginButton = () => (
  <button
    onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}
    className="bg-gray-800 text-white font-bold px-2 py-1 border-2 border-gray-800 rounded-md transition-colors duration-300 hover:bg-white hover:text-gray-800 hover:border-gray-800"
    aria-label="Sign in with github"
  >
    login
  </button>
);

const LogoutButton = ({ handleLogout }: { handleLogout: () => void }) => (
  <button
    onClick={handleLogout}
    className="bg-gray-800 text-white font-bold px-2 py-1 border-2 border-gray-800 rounded-md transition-colors duration-300 hover:bg-white hover:text-gray-800 hover:border-gray-800"
    aria-label="Logout from the application"
  >
    logout
  </button>
);

export default function Navbar() {
  const { user, loading } = useUserSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-gray-800"
            >
              artblock
            </Link>
            <span className="text-gray-300">|</span>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-800 hover:text-blue-500 font-bold transition"
              >
                home
              </Link>
              <Link
                href="/create-post"
                className="text-gray-800 hover:text-blue-500 font-bold transition"
              >
                create post
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!user ? (
              <LoginButton />
            ) : (
              <>
                <UserInfo user={user} />
                <LogoutButton handleLogout={handleLogout} />
              </>
            )}

            {/* Hamburger Menu (Mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--background)]">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
          >
            home
          </Link>
          <Link
            href="/create-post"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
          >
            create post
          </Link>
        </div>
      )}
    </nav>
  );
}
