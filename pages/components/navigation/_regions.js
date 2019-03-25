import { Fragment } from "react";
import Link from "next/link";

export const Regions = (
  <Fragment>
    <h2>Regions</h2>
    <Link href="/properties?region=greater_accra">
      <a>Greater Accra</a>
    </Link>
    <Link href="/properties?region=central">
      <a>Central</a>
    </Link>
    <Link href="/properties?region=eastern">
      <a>Eastern</a>
    </Link>
    <Link href="/properties?region=western">
      <a>Western</a>
    </Link>
    <Link href="/properties?region=ashanti">
      <a>Ashanti</a>
    </Link>
    <Link href="/properties?region=northern">
      <a>Northern</a>
    </Link>
    <Link href="/properties?region=upper_east">
      <a>Upper East</a>
    </Link>
    <Link href="/properties?region=upper_west">
      <a>Upper West</a>
    </Link>
    <Link href="/properties?region=volta">
      <a>Volta</a>
    </Link>
    <Link href="/properties?region=brong_ahafo">
      <a>Brong Ahafo</a>
    </Link>
  </Fragment>
);
