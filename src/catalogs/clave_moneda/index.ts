import { createCatalog } from "../../core/createCatalog";
import type { ClaveMonedaRecord } from "./types";
import data from "./data.json";

export type { ClaveMonedaRecord };

export const claveMoneda = createCatalog(data as ClaveMonedaRecord[], "value");
