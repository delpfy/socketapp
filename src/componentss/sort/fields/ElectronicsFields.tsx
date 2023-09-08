import React from "react";
import ItemsAccords from "../ItemsAccords";
import {
  fields_ELECTRONICS,
  ukrfields_ELECTRONICS,
} from "../../../utils/itemsFields/allItemsFields";

export default function ElectronicsFields() {
  return (
    <ItemsAccords
      uniqueFieldNames={fields_ELECTRONICS}
      uniqueFieldUkrNames={ukrfields_ELECTRONICS}
    />
  );
}
