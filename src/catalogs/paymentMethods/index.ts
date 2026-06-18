import { createCatalog } from "../../core/createCatalog";
import type { PaymentMethodsRecord } from "./types";
import data from "./data.json";

export type { PaymentMethodsRecord };

export const paymentMethods = createCatalog(data as PaymentMethodsRecord[], "value");
