import { gql } from "graphql-request"
import {
  DISPO_EXTRA_DATA,
  DISPO_LIVE_METADATA,
  DISPO_SCHEMA,
  DISPO_TOP_DATA,
  F_DISPO_HOURS_SET_TOP,
} from "./dispensaries"
import {
  F_PRODUCT_STRAIN,
  F_PRODUCT_BRAND,
  F_PRODUCT_SPECIALS_DATA,
  F_PRODUCT_TERPENES,
  F_RODUCT_POTENCY,
  F_PRODUCT_MEASUREMENTS,
  F_POS_METADATA,
  F_MENU_IMAGES,
  F_MENU_SCHEMA,
} from "./filteredProducts"

export const DISPO_DATA_FULL = gql`
  query FullDispensaryDump($nearLat: Float!, $nearLng: Float!, $distance: Float!) {
    filteredDispensaries(filter: { nearLat: $nearLat, nearLng: $nearLng, distance: $distance }) {
      ...DispoTopLevelData
      ...DispoExtraData
      ...DispoLiveMetadataData
      ...DispoHoursSetTop
      ...DispoSchema
    }
  }
  ${DISPO_TOP_DATA}
  ${DISPO_EXTRA_DATA}
  ${DISPO_LIVE_METADATA}
  ${F_DISPO_HOURS_SET_TOP}
  ${DISPO_SCHEMA}
`

export const DISPO_IDS = gql`
  query DispensaryIdsDump($nearLat: Float!, $nearLng: Float!, $distance: Float!) {
    filteredDispensaries(filter: { nearLat: $nearLat, nearLng: $nearLng, distance: $distance }) {
      name
      id
    }
  }
`

export const FullMenuDump = gql`
  query DutchieMenuDump($dispensaryId: String!) {
    filteredProducts(filter: { dispensaryId: $dispensaryId }) {
      categories
      products {
        ...MenuSchema
        brand {
          ...MenuProductBrand
        }
        thcContent {
          ...MenuProductPotency
        }
        strain {
          ...MenuStrain
        }
        cbdContent {
          ...MenuProductPotency
        }
        specialData {
          ...MenuSpecialsData
        }
        CBDContent {
          ...MenuProductPotency
        }
        terpenes {
          ...MenuProductTerpenes
        }
        measurements {
          ...MenuProductMeasurements
        }
        THCContent {
          ...MenuProductPotency
        }
        images {
          ...MenuImages
        }
        POSMetaData {
          ...MenuPosMetadata
        }
      }
    }
  }
  ${F_PRODUCT_STRAIN}
  ${F_PRODUCT_BRAND}
  ${F_PRODUCT_SPECIALS_DATA}
  ${F_PRODUCT_TERPENES}
  ${F_RODUCT_POTENCY}
  ${F_PRODUCT_MEASUREMENTS}
  ${F_POS_METADATA}
  ${F_MENU_IMAGES}
  ${F_MENU_SCHEMA}
`

export const LiveMenuFeed = gql`
  query DutchieMenuDump($dispensaryId: String!) {
    filteredProducts(filter: { dispensaryId: $dispensaryId }) {
      products {
        dispensaryId
        DispensaryID
        Name
        name
        cName
        recOnly
        medicalOnly
        updatedAt
        _id
        id
        brandId
        strain {
          ...MenuStrain
        }
        POSMetaData {
          ...MenuPosMetadata
        }
      }
    }
  }
  ${F_PRODUCT_STRAIN}
  ${F_POS_METADATA}
`
