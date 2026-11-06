"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { navLinks } from "@/data/navLinks";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  // Keep the navbar in sync with login/logout
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

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
        {session ? (
          <button type="button" className="btn" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link href="/login" className="btn">
            Log In
          </Link>
        )}
      </nav>
    </header>
  );
}
