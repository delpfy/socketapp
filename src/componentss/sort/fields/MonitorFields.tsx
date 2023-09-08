import React from "react";
import ItemsAccords from "../ItemsAccords";
import {
  fields_MONITORS,
  ukrfields_MONITORS,
} from "../../../utils/itemsFields/allItemsFields";

export default function MonitorFields() {
  return (
    <ItemsAccords
      uniqueFieldNames={fields_MONITORS}
      uniqueFieldUkrNames={ukrfields_MONITORS}
    />
  );
}
