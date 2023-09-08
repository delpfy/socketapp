import React from "react";
import ItemsAccords from "../ItemsAccords";
import {
  fields_CABELS,
  ukrfields_CABELS,
} from "../../../utils/itemsFields/allItemsFields";

export default function CabelsFields() {
  return (
    <ItemsAccords
      uniqueFieldNames={fields_CABELS}
      uniqueFieldUkrNames={ukrfields_CABELS}
    />
  );
}
