import { createCatalog } from "../../core/createCatalog";
import type { RegimenfiscalRecord } from "./types";
import data from "./data.json";

export type { RegimenfiscalRecord };

export const regimenfiscal = createCatalog(data as RegimenfiscalRecord[], "value");
