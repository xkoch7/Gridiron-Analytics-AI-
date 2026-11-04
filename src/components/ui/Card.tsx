import Link from "next/link";

interface CardProps {
  title: string;
  children: React.ReactNode;
  // When set, the whole card becomes a link
  href?: string;
}

export default function Card({ title, children, href }: CardProps) {
  const content = (
    <>
      <h3>{title}</h3>
      <div>{children}</div>
    </>
  );

  return href ? (
    <Link href={href} className="card">
      {content}
    </Link>
  ) : (
    <div className="card">{content}</div>
  );
}
