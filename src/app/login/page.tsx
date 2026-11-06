"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  function toggleMode() {
    setMode(isSignup ? "login" : "signup");
    setError(null);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Picked up by the handle_new_user trigger to fill in the profile
          data: { display_name: displayName },
          emailRedirectTo: `${window.location.origin}/account`,
        },
      });
      setLoading(false);
      if (error) return setError(error.message);
      // No session means email confirmation is required first
      if (!data.session) {
        return setMessage("Check your email for a link to confirm your account.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setError(error.message);
    }

    router.push("/account");
  }

  // OAuth works the same for login and signup: Supabase creates the user on first sign-in
  async function handleOAuth(provider: "google" | "azure") {
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/account`,
        // Azure needs the email scope to return the user's address
        scopes: provider === "azure" ? "email" : undefined,
      },
    });
    if (error) setError(error.message);
  }

  const oauthVerb = isSignup ? "Sign up" : "Log in";

  return (
    <div className={`${styles.page} full-bleed`}>
      <section className={styles.board}>
        <PlayDiagram />
        <div>
          <h2 className={styles.tagline}>Know the matchup before kickoff.</h2>
          <p className={styles.taglineSub}>
            Projections for your fantasy lineup and every game on the slate.
          </p>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelInner}>
          <h1 className={styles.title}>{isSignup ? "Create your account" : "Log in"}</h1>
          <p className={styles.subtitle}>
            {isSignup
              ? "Save your teams and get personalized predictions."
              : "Welcome back to Gridiron Analytics."}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {isSignup && (
              <label className={styles.field}>
                Display name
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoComplete="nickname"
                  required
                />
              </label>
            )}
            <label className={styles.field}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className={styles.field}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={6}
                required
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.message}>{message}</p>}

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
            </button>
          </form>

          <div className={styles.divider}>or</div>

          <div className={styles.oauthButtons}>
            <button type="button" className={styles.oauth} onClick={() => handleOAuth("google")}>
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              {oauthVerb} with Google
            </button>
            <button type="button" className={styles.oauth} onClick={() => handleOAuth("azure")}>
              <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
              {oauthVerb} with Microsoft
            </button>
          </div>

          <button type="button" className={styles.toggle} onClick={toggleMode}>
            {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </section>
    </div>
  );
}

// Offense (O) below the line of scrimmage, defense (X) above, routes drawn in on load
const offense = [
  [140, 182], [170, 182], [200, 182], [230, 182], [260, 182], // line
  [292, 186], // tight end
  [60, 186], [350, 186], // receivers
  [200, 214], // quarterback
  [200, 246], // running back
];
const defense = [
  [155, 152], [185, 152], [215, 152], [245, 152], // line
  [160, 116], [200, 110], [240, 116], // linebackers
  [76, 138], [370, 132], // corners
  [140, 58], [262, 58], // safeties
];
const routes = [
  { d: "M60 176 L60 34", color: "Red", arrow: "60,24 53,37 67,37", delay: 0.2 },
  { d: "M350 176 L350 136 L298 84", color: "Red", arrow: "291,77 302,80 294,88", delay: 0.45 },
  { d: "M292 176 L292 104 L362 104", color: "White", arrow: "372,104 360,97 360,111", delay: 0.7 },
  { d: "M188 248 Q130 252 112 212", color: "White", arrow: "108,203 118,210 107,215", delay: 0.95 },
] as const;

function PlayDiagram() {
  return (
    <svg className={styles.diagram} viewBox="0 0 410 270" role="img" aria-label="Football play diagram">
      {[30, 80, 130, 230].map((y) => (
        <line key={y} className={styles.yard} x1="0" y1={y} x2="410" y2={y} />
      ))}
      <line className={styles.scrimmage} x1="10" y1="168" x2="400" y2="168" />

      {defense.map(([x, y]) => (
        <g key={`x${x}-${y}`} className={styles.defense}>
          <line x1={x - 7} y1={y - 7} x2={x + 7} y2={y + 7} />
          <line x1={x - 7} y1={y + 7} x2={x + 7} y2={y - 7} />
        </g>
      ))}
      {offense.map(([x, y]) => (
        <circle key={`o${x}-${y}`} className={styles.offense} cx={x} cy={y} r="9" />
      ))}

      {routes.map((r) => (
        <g key={r.d}>
          <path
            className={`${styles.route} ${styles[`route${r.color}`]}`}
            d={r.d}
            pathLength={1}
            style={{ animationDelay: `${r.delay}s` }}
          />
          <polygon
            className={`${styles.arrow} ${styles[`arrow${r.color}`]}`}
            points={r.arrow}
            style={{ animationDelay: `${r.delay + 0.8}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
