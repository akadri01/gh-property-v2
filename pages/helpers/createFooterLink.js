import Link from "next/link";

export default (basePath, link, paramName, paramVal) => {
  return (
    <Link href={`/${basePath}${paramName}=${paramVal ? paramVal.toUpperCase() : link.toUpperCase()}`}>
      <a>{link}</a>
    </Link>
  )
}