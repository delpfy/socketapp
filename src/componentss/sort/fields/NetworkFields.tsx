import React from "react";

import ItemsAccords from "../ItemsAccords";
import {
  fields_NETWORK,
  ukrfields_NETWORK,
} from "../../../utils/itemsFields/allItemsFields";

export default function NetworkFields() {
  return (
    <ItemsAccords
      uniqueFieldNames={fields_NETWORK}
      uniqueFieldUkrNames={ukrfields_NETWORK}
    />
  );
}
