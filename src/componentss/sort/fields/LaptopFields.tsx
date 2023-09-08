import React from "react";
import ItemsAccords from "../ItemsAccords";
import {
  fields_LAPTOPS,
  ukrfields_LAPTOPS,
} from "../../../utils/itemsFields/allItemsFields";

export default function LaptopFields() {
  return (
    <ItemsAccords
      uniqueFieldNames={fields_LAPTOPS}
      uniqueFieldUkrNames={ukrfields_LAPTOPS}
    />
  );
}
