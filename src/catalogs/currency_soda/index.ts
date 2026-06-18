import { createCatalog } from "../../core/createCatalog";
import type { CurrencySodaRecord } from "./types";
import data from "./data.json";

export type { CurrencySodaRecord };

export const currencySoda = createCatalog(data as CurrencySodaRecord[], "value");
