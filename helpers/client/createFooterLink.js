import Link from "next/link";

export default (basePath, link, query, customLink) => {
  return (
    <Link href={`/${basePath}${query}=${customLink ? customLink.toUpperCase() : link.toUpperCase()}`}>
      <a>{link}</a>
    </Link>
  )
}