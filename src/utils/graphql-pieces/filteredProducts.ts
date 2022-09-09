import { gql } from "graphql-request"

export const MENU_DUMP_QUEUE_NAME = "menuDump"

export const F_PRODUCT_STRAIN = gql`
  fragment MenuStrain on Strain {
    ratio
    aromas
    updatedAt
    _id
    terpenes {
      aromas
      name
      updatedAt
      strainIds
      aliasList
      createdAt
      description
      id
      effects
    }
    description
    imageUrl
    name
    labels
    createdAt
    id
    effects
  }
`

export const F_PRODUCT_BRAND = gql`
  fragment MenuProductBrand on Brand {
    description
    aliasList
    parentBrand {
      id
    }
    _id
    createdAt
    id
    updatedAt
    imageUrl
    name
    productsCount
    isGlobal
    source
  }
`

export const F_PRODUCT_SPECIALS_DATA = gql`
  fragment MenuSpecialsData on Products_specialData {
    saleSpecials {
      source
      discount
      sourceId
      specialName
      menuType
      specialId
      targetPrice
    }
    discount
    bogoSpecials {
      qualifyingOptions
      bogoConditions {
        categoryName
        brandId
        weight
        productId
        quantity
        brandName
        productGroup
      }
      endStamp
      excludedProducts {
        conditions {
          Name
          key
          _id
        }
        rewards {
          Name
          key
          _id
        }
      }
      specialName
      menuType
      totalWeight {
        weight
        enabled
      }
      specialId
      isRecurring
      discountBundle {
        value
        applyTo
        discountType
        limit
        enabled
      }
      bogoRewards {
        categoryName
        brandId
        weight
        productId
        quantity
        brandName
        productGroup
        targetPrice
      }
    }
  }
`

export const F_PRODUCT_TERPENES = gql`
  fragment MenuProductTerpenes on Products_Terpene {
    unit
    value
    name
    active
    terpeneId
    id
  }
`

export const F_RODUCT_POTENCY = gql`
  fragment MenuProductPotency on ProductPotency {
    unit
    value
    range
  }
`

export const F_PRODUCT_MEASUREMENTS = gql`
  fragment MenuProductMeasurements on Products_measurements {
    volume {
      values
      unit
    }
    netWeight {
      values
      unit
    }
  }
`

export const F_POS_METADATA = gql`
  fragment MenuPosMetadata on Products_POSMetaData {
    children {
      option
      canonicalID
      recEquivalent {
        unit
        value
      }
      price
      medPrice
      quantity
      recPrice
    }
    canonicalID
    integrationID
  }
`

export const F_MENU_IMAGES = gql`
  fragment MenuImages on Products_Images {
    url
    userId
    updatedAt
    digest
    label
    active
    origin
    createdAt
    description
    etag
  }
`

export const F_MENU_SCHEMA = gql`
  fragment MenuSchema on Products {
    CBD
    Description
    DispensaryID
    Image
    Name
    Options
    Prices
    Status
    THC
    _id
    brandDescription
    brandId
    brandLogo
    brandName
    cName
    comingSoon
    connectedAt
    connectedBy
    connectedCount
    createdAt
    createdBy
    dateCreated
    description
    descriptionHtml
    dispensaryId
    dispensaryName
    effects
    id
    integrationKey
    medicalOnly
    medicalPrices
    name
    overrides
    pastCNames
    popularSortKey
    prices
    rawPrices
    recOnly
    recPrices
    reviewedAt
    reviewedBy
    score
    special
    stockImage
    subcategory
    syncedAt
    type
    updatedAt
    updatedBy
    weight
    adminEdits {
      updatedAt
      updatedBy
    }
    featured {
      startTime
      current
      endTime
    }
  }
`
