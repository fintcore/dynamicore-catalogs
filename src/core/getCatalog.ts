import { nacionalidad1 } from '../catalogs/Nacionalidad-1';
import { actividadEconomica } from '../catalogs/actividad_economica';
import { actividadesVulnerables } from '../catalogs/actividades_vulnerables';
import { ageorincorporationdateV2 } from '../catalogs/ageorincorporationdate_v2';
import { catalogoPrioridad } from '../catalogs/catalogo_prioridad';
import { ccPais } from '../catalogs/cc_pais';
import { cfdiuses } from '../catalogs/cfdiuses';
import { clasificacionActividadEconomica } from '../catalogs/clasificacion_actividad_economica';
import { claveActividad } from '../catalogs/clave_actividad';
import { claveMoneda } from '../catalogs/clave_moneda';
import { colonia } from '../catalogs/colonia';
import { countriesV2 } from '../catalogs/countries_v2';
import { credittermV2 } from '../catalogs/creditterm_v2';
import { currency } from '../catalogs/currency';
import { currencyV2 } from '../catalogs/currency_v2';
import { customerseniorityV2 } from '../catalogs/customerseniority_v2';
import { destinoRecursos } from '../catalogs/destino_recursos';
import { economicactivityV2 } from '../catalogs/economicactivity_v2';
import { enpagosActividadEconomica } from '../catalogs/enpagos_actividad_economica';
import { enpagosMunicupio } from '../catalogs/enpagos_municupio';
import { enpagosPais } from '../catalogs/enpagos_pais';
import { entidadFederativa } from '../catalogs/entidad_federativa';
import { girosPagaqui } from '../catalogs/giros_pagaqui';
import { guaranteesV2 } from '../catalogs/guarantees_v2';
import { guaratortypesV2 } from '../catalogs/guaratortypes_v2';
import { instrumentoMonetario } from '../catalogs/instrumento_monetario';
import { municipios } from '../catalogs/municipios';
import { nacionalidad } from '../catalogs/nacionalidad';
import { nationalityV2 } from '../catalogs/nationality_v2';
import { numeroTrabajadores } from '../catalogs/numero_trabajadores';
import { origenRecurso } from '../catalogs/origen_recurso';
import { pais } from '../catalogs/pais';
import { paymentForms } from '../catalogs/paymentForms';
import { paymentMethods } from '../catalogs/paymentMethods';
import { persontypeV2 } from '../catalogs/persontype_v2';
import { pisaActividadEconomica } from '../catalogs/pisa_actividad_economica';
import { pisaOcupaciones } from '../catalogs/pisa_ocupaciones';
import { pisaProfesion } from '../catalogs/pisa_profesion';
import { pisaPuesto } from '../catalogs/pisa_puesto';
import { prioridad } from '../catalogs/prioridad';
import { productsV2 } from '../catalogs/products_v2';
import { regimenfiscal } from '../catalogs/regimenfiscal';
import { relationTypes } from '../catalogs/relationTypes';
import { resourcedestinationV2 } from '../catalogs/resourcedestination_v2';
import { resourceoriginV2 } from '../catalogs/resourceorigin_v2';
import { sectorClasificacion } from '../catalogs/sector_clasificacion';
import { states } from '../catalogs/states';
import { statesV2 } from '../catalogs/states_v2';
import { subclasificacionActividad } from '../catalogs/subclasificacion_actividad';
import { taxonomy } from '../catalogs/taxonomy';
import { tipoOperacion } from '../catalogs/tipo_operacion';
import { tipoSociedad } from '../catalogs/tipo_sociedad';
import { transactionalfrecuencyV2 } from '../catalogs/transactionalfrecuency_v2';
import { transactionamountsV2 } from '../catalogs/transactionamounts_v2';
import { transactionsorsendingchannelsV2 } from '../catalogs/transactionsorsendingchannels_v2';
import { zipcode } from '../catalogs/zipcode';

const catalogRegistry = {
  'Nacionalidad-1': nacionalidad1,
  actividad_economica: actividadEconomica,
  actividades_vulnerables: actividadesVulnerables,
  ageorincorporationdate_v2: ageorincorporationdateV2,
  catalogo_prioridad: catalogoPrioridad,
  cc_pais: ccPais,
  cfdiuses,
  clasificacion_actividad_economica: clasificacionActividadEconomica,
  clave_actividad: claveActividad,
  clave_moneda: claveMoneda,
  colonia,
  countries_v2: countriesV2,
  creditterm_v2: credittermV2,
  currency,
  currency_v2: currencyV2,
  customerseniority_v2: customerseniorityV2,
  destino_recursos: destinoRecursos,
  economicactivity_v2: economicactivityV2,
  enpagos_actividad_economica: enpagosActividadEconomica,
  enpagos_municupio: enpagosMunicupio,
  enpagos_pais: enpagosPais,
  entidad_federativa: entidadFederativa,
  giros_pagaqui: girosPagaqui,
  guarantees_v2: guaranteesV2,
  guaratortypes_v2: guaratortypesV2,
  instrumento_monetario: instrumentoMonetario,
  municipios,
  nacionalidad,
  nationality_v2: nationalityV2,
  numero_trabajadores: numeroTrabajadores,
  origen_recurso: origenRecurso,
  pais,
  paymentForms,
  paymentMethods,
  persontype_v2: persontypeV2,
  pisa_actividad_economica: pisaActividadEconomica,
  pisa_ocupaciones: pisaOcupaciones,
  pisa_profesion: pisaProfesion,
  pisa_puesto: pisaPuesto,
  prioridad,
  products_v2: productsV2,
  regimenfiscal,
  relationTypes,
  resourcedestination_v2: resourcedestinationV2,
  resourceorigin_v2: resourceoriginV2,
  sector_clasificacion: sectorClasificacion,
  states,
  states_v2: statesV2,
  subclasificacion_actividad: subclasificacionActividad,
  taxonomy,
  tipo_operacion: tipoOperacion,
  tipo_sociedad: tipoSociedad,
  transactionalfrecuency_v2: transactionalfrecuencyV2,
  transactionamounts_v2: transactionamountsV2,
  transactionsorsendingchannels_v2: transactionsorsendingchannelsV2,
  zipcode,
} as const;

export type CatalogName = keyof typeof catalogRegistry;

export function getCatalog<K extends CatalogName>(name: K): typeof catalogRegistry[K] {
  return catalogRegistry[name];
}

export function listCatalogs(): CatalogName[] {
  return Object.keys(catalogRegistry) as CatalogName[];
}
