"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <Link href="/" className="brand">
        Gridiron Analytics AI
      </Link>
      <nav>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/login" className="btn">
          Log In
        </Link>
      </nav>
    </header>
  );
}
