import { Fragment } from "react";
import Link from "next/link";

export const LocationOptions = (
  <Fragment>
    <option value="">Select location</option>
    <optgroup label="Towns">
      <option value="accra">Accra</option>
      <option value="kumasi">Kumasi</option>
      <option value="sekondi">Sekondi</option>
      <option value="sunyani">Sunyani</option>
      <option value="tamale">Tamale</option>
      <option value="takoradi">Takoradi</option>
      <option value="obuasi">Obuasi</option>
      <option value="tema">Tema</option>
      <option value="ashaiman">Ashaiman</option>
    </optgroup>
    <optgroup label="Regions">
      <option value="greater_accra">Greater Accra</option>
      <option value="central">Central</option>
      <option value="eastern">Eastern</option>
      <option value="western">Western</option>
      <option value="ashanti">Ashanti</option>
      <option value="northern">Northern</option>
      <option value="upper_east">Upper East</option>
      <option value="upper_west">Upper West</option>
      <option value="bolta">Volta</option>
      <option value="brong_ahafo">Brong Ahafo</option>
    </optgroup>
  </Fragment>
);

export const MinPriceOptionsForSale = (
  <Fragment>
    <option value="">Min Price (any)</option>
    <option value="0">From 0</option>
    <option value="10000">From ₵ 10.000</option>
    <option value="20000">From ₵ 20.000</option>
    <option value="30000">From ₵ 35.000</option>
    <option value="50000">From ₵ 50.000</option>
    <option value="75000">From ₵ 75.000</option>
    <option value="100000">From ₵ 100.000</option>
    <option value="250000">From ₵ 250.000</option>
    <option value="500000">From ₵ 500.000</option>
    <option value="750000">From ₵ 750.000</option>
    <option value="1000000">From ₵ 1.000.000</option>
  </Fragment>
);

export const MaxPriceOptionsForSale = (
  <Fragment>
    <option value="">Max Price (any)</option>
    <option value="20000">To ₵ 20.000</option>
    <option value="30000">To ₵ 35.000</option>
    <option value="50000">To ₵ 50.000</option>
    <option value="75000">To ₵ 75.000</option>
    <option value="100000">To ₵ 100.000</option>
    <option value="250000">To ₵ 250.000</option>
    <option value="500000">To ₵ 500.000</option>
    <option value="750000">To ₵ 750.000</option>
    <option value="1000000">To ₵ 1.000.000</option>
    <option value="5000000">To ₵ 5.000.000</option>
    <option value="10000000">To ₵ 10.000.000</option>
    <option value="20000000">To ₵ 20.000.000</option>
  </Fragment>
);
