import Link from "next/link";

export default link => {
  return (
    <Link href={`/property?location=${link.toUpperCase()}`}>
      <a>{link}</a>
    </Link>
  )
}