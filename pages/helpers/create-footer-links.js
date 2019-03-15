import Link from "next/link";

export default (basePath, link, paramName, paramVal) => (
  <Link href={`/${basePath}${paramName}=${paramVal ? paramVal.toUpperCase() : link.toUpperCase()}`} key={link}>
    <a>{link}</a>
  </Link>
)