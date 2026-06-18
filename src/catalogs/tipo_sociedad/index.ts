import { createCatalog } from "../../core/createCatalog";
import type { TipoSociedadRecord } from "./types";
import data from "./data.json";

export type { TipoSociedadRecord };

export const tipoSociedad = createCatalog(data as TipoSociedadRecord[], "value");
