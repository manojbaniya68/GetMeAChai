"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const { data: session, status } = useSession();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchResults, setsearchResults] = useState([]);
  const [renderSearchResult, setrenderSearchResult] = useState(false);
  const controllerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") return null;

  const handleKeyPress = (e) => {};

  const handleChange = async (e) => {
    const value = e.target.value.trim();

    if (e.key === "Enter") {
      for (let arr of searchResults) {
        if (arr.username === value) {
          router.push(`/${value}`);
          e.target.value = "";
          setrenderSearchResult(false);
        }
      }
      return;
    }

    if (!value) {
      controllerRef.current?.abort();
      setrenderSearchResult(false);
      setsearchResults([]);
      return;
    }

    // Cancel previous request
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: value }),
        signal: controllerRef.current.signal,
      });

      const data = await res.json();
      setrenderSearchResult(true);
      setsearchResults(data.user);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    }
  };

  return (
    <nav className="bg-gray-700 text-white flex justify-between items-center h-12 p-2 px-6">
      <div className="logo font-bold text-lg">
        <Link href="/">GetMeaChai</Link>
      </div>
      <div className="relative w-full max-w-md">
        
        {!session && pathname === "/" && (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
              {/* Search Icon */}
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.6-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Input */}
              <input
                onBlur={() => {
                  setTimeout(() => {
                    setrenderSearchResult(false);
                  }, 150);
                }}
                onChange={handleChange}
                onKeyDown={handleChange}
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400"
              />
            </div>
          </div>
        )}

        {renderSearchResult && pathname === "/" && (
          <div className="searchResult absolute top-full left-0 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 shadow-lg z-20 max-h-64 overflow-y-auto">
            {/* You can render search results here */}
            {/* Example: */}
            {searchResults.map((user, index) => (
              <Link
                key={index}
                href={`/${user.username}`}
                onClick={() => {
                  setrenderSearchResult(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                {user.username}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="button">
        {!session && (
          <Link href="/login">
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mx-1 text-center">
              Login
            </button>
          </Link>
        )}

        {session && (
          <div ref={dropdownRef} className="me-2 inline-block">
            <button
              // onBlur={() =>
              //   setTimeout(() => {
              //     setShowDropDown(!showDropDown);
              //   }, 100)
              // }
              onClick={() => setShowDropDown(!showDropDown)}
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownHover"
              className={`z-10 bg-white divide-y ${
                showDropDown ? "" : "hidden"
              } divide-gray-100 absolute right-8 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.username}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Pages
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => signOut({ callbackUrl: "/" })}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
