import { Fragment } from "react";
import Link from "next/link";

export const Regions = (
  <Fragment>
    <h2>Regions</h2>
    <Link href="/properties/latest?region=greater_accra">
      <a>Greater Accra</a>
    </Link>
    <Link href="/properties/latest?region=central">
      <a>Central</a>
    </Link>
    <Link href="/properties/latest?region=eastern">
      <a>Eastern</a>
    </Link>
    <Link href="/properties/latest?region=western">
      <a>Western</a>
    </Link>
    <Link href="/properties/latest?region=ashanti">
      <a>Ashanti</a>
    </Link>
    <Link href="/properties/latest?region=northern">
      <a>Northern</a>
    </Link>
    <Link href="/properties/latest?region=upper_east">
      <a>Upper East</a>
    </Link>
    <Link href="/properties/latest?region=upper_west">
      <a>Upper West</a>
    </Link>
    <Link href="/properties/latest?region=volta">
      <a>Volta</a>
    </Link>
    <Link href="/properties/latest?region=brong_ahafo">
      <a>Brong Ahafo</a>
    </Link>
  </Fragment>
);
