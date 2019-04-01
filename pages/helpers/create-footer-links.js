import Link from "next/link";

export default (base, link, key, val) => (
  <Link
    href={`/${base}${key}=${val ? val.toLowerCase() : link.toLowerCase()}`}
    key={link}
  >
    <a>{link}</a>
  </Link>
);
