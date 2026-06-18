import { createCatalog } from "../../core/createCatalog";
import type { CurrencyRecord } from "./types";
import data from "./data.json";

export type { CurrencyRecord };

export const currency = createCatalog(data as CurrencyRecord[], "value");
