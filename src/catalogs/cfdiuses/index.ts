import { createCatalog } from "../../core/createCatalog";
import type { CfdiusesRecord } from "./types";
import data from "./data.json";

export type { CfdiusesRecord };

export const cfdiuses = createCatalog(data as CfdiusesRecord[], "value");
