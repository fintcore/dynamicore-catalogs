import { createCatalog } from "../../core/createCatalog";
import type { PaymentFormsRecord } from "./types";
import data from "./data.json";

export type { PaymentFormsRecord };

export const paymentForms = createCatalog(data as PaymentFormsRecord[], "value");
