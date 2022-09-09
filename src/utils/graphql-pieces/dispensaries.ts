import { gql } from "graphql-request"

export const F_DISPO_HOURS = gql`
  fragment DispoHours on HoursSettingsForOrderType {
    effectiveHours {
      Monday {
        active
        end
        start
      }
      Tuesday {
        active
        end
        start
      }
      Wednesday {
        active
        end
        start
      }
      Thursday {
        active
        end
        start
      }
      Friday {
        active
        end
        start
      }
      Saturday {
        active
        end
        start
      }
      Sunday {
        active
        end
        start
      }
    }
    hours {
      Monday {
        active
        end
        start
      }
      Tuesday {
        active
        end
        start
      }
      Wednesday {
        active
        end
        start
      }
      Thursday {
        active
        end
        start
      }
      Friday {
        active
        end
        start
      }
      Saturday {
        active
        end
        start
      }
      Sunday {
        active
        end
        start
      }
    }
  }
`

export const F_DISPO_HOURS_2 = gql`
  fragment DispoHours2 on HoursSettingsForOrderType {
    effectiveHours {
      Monday {
        active
        end
        start
      }
      Tuesday {
        active
        end
        start
      }
      Wednesday {
        active
        end
        start
      }
      Thursday {
        active
        end
        start
      }
      Friday {
        active
        end
        start
      }
      Saturday {
        active
        end
        start
      }
      Sunday {
        active
        end
        start
      }
    }
    hours {
      Monday {
        active
        end
        start
      }
      Tuesday {
        active
        end
        start
      }
      Wednesday {
        active
        end
        start
      }
      Thursday {
        active
        end
        start
      }
      Friday {
        active
        end
        start
      }
      Saturday {
        active
        end
        start
      }
      Sunday {
        active
        end
        start
      }
    }
  }
`

export const F_DISPO_HOURS_SET = gql`
  fragment DispoHoursSet on Dispensaries {
    hoursSettings {
      delivery {
        ...DispoHours
      }
      driveThruPickup {
        ...DispoHours
      }
      curbsidePickup {
        ...DispoHours
      }
      inStorePickup {
        ...DispoHours
      }
    }
  }
  ${F_DISPO_HOURS}
`

export const F_DISPO_HOURS_SET_TOP = gql`
  fragment DispoHoursSetTop on Dispensaries {
    hoursSettings {
      delivery {
        ...DispoHours2
      }
      driveThruPickup {
        ...DispoHours2
      }
      curbsidePickup {
        ...DispoHours2
      }
      inStorePickup {
        ...DispoHours2
      }
    }
  }
  ${F_DISPO_HOURS_2}
`

export const F_DISPO_KIOSK_SETTINGS = gql`
  fragment DispoKioskSetetings on KioskOrderingSettings {
    enabled
    fullNameOnly
    phoneRequired
    notesField
    directedOrders
    hideEmailField
    hidePhoneField
    showBirthdateField
    kioskInstructions
    paymentTypes {
      alt36
      check
      creditCardAtDoor
      payOnlineChase
      payOnlineHypur
      payOnlineMerrco
      payOnlineMoneris
      creditCardByPhone
      debit
      dutchiePay
      cash
      linx
      canPay
      paytender
      aeropay
    }
  }
`

export const F_DISPO_DELIVERY_SETTINGS = gql`
  fragment DispoDeliverySettings on DeliveryOrderingSettings {
    enableASAPOrdering
    enableScheduledOrdering
    enableAfterHoursOrdering
    deliveryMode
    deliveryZipCodes {
      zipCode
    }
    deliveryRadius {
      radiusInMiles
      orderMinimum {
        enabled
        minimumInCents
      }
    }
    deliveryFeeTiers {
      feeInCents
      maximumInCents
      minimumInCents
      feeType
      percentFee
    }
    scheduledOrderingConfigV2 {
      advancedDayOrderingEnabled
      advancedDayOrderingLimit
      incrementInMinutes
      nextAvailableInMinutes
      orderLimitsEnabled
    }
    paymentTypes {
      alt36
      check
      creditCardAtDoor
      payOnlineChase
      payOnlineHypur
      payOnlineMerrco
      payOnlineMoneris
      creditCardByPhone
      debit
      dutchiePay
      cash
      linx
      canPay
      paytender
      aeropay
    }
  }
`

export const F_DISPO_DRIVE_THRU_SETTINGS = gql`
  fragment DispoDriveThruSettings on DriveThruPickupOrderingSettings {
    enableASAPOrdering
    enableScheduledOrdering
    enableAfterHoursOrdering
    orderMinimum {
      enabled
      minimumInCents
    }
    scheduledOrderingConfigV2 {
      advancedDayOrderingEnabled
      advancedDayOrderingLimit
      incrementInMinutes
      nextAvailableInMinutes
      orderLimitsEnabled
    }
    paymentTypes {
      alt36
      check
      creditCardAtDoor
      payOnlineChase
      payOnlineHypur
      payOnlineMerrco
      payOnlineMoneris
      creditCardByPhone
      debit
      dutchiePay
      cash
      linx
      canPay
      paytender
      aeropay
    }
  }
`

export const F_DISPO_CURBSIDE_SETTINGS = gql`
  fragment DispoCurbsideSettings on CurbsidePickupOrderingSettings {
    enableASAPOrdering
    enableScheduledOrdering
    enableAfterHoursOrdering
    enableCurbsideArrivals
    arrivalInformationInstructions
    orderMinimum {
      enabled
      minimumInCents
    }
    scheduledOrderingConfigV2 {
      advancedDayOrderingEnabled
      advancedDayOrderingLimit
      incrementInMinutes
      nextAvailableInMinutes
      orderLimitsEnabled
    }
    paymentTypes {
      alt36
      check
      creditCardAtDoor
      payOnlineChase
      payOnlineHypur
      payOnlineMerrco
      payOnlineMoneris
      creditCardByPhone
      debit
      dutchiePay
      cash
      linx
      canPay
      paytender
      aeropay
    }
  }
`

export const F_DISPO_IN_STORE_PICKUP_SETTINGS = gql`
  fragment DispoInStorePickupSettings on InStorePickupOrderingSettings {
    enableASAPOrdering
    enableScheduledOrdering
    enableAfterHoursOrdering
    orderMinimum {
      enabled
      minimumInCents
    }
    scheduledOrderingConfigV2 {
      advancedDayOrderingEnabled
      advancedDayOrderingLimit
      incrementInMinutes
      nextAvailableInMinutes
      orderLimitsEnabled
    }
    paymentTypes {
      alt36
      check
      creditCardAtDoor
      payOnlineChase
      payOnlineHypur
      payOnlineMerrco
      payOnlineMoneris
      creditCardByPhone
      debit
      dutchiePay
      cash
      linx
      canPay
      paytender
      aeropay
    }
  }
`

export const F_DISPO_ORDER_TYPE_V2_CONFIG = gql`
  fragment DispoOrderTypesConfigV2 on OrderTypesConfigV2 {
    offerAnyPickupService
    offerDeliveryService
    kiosk {
      ...DispoKioskSetetings
    }
    delivery {
      ...DispoDeliverySettings
    }
    driveThruPickup {
      ...DispoDriveThruSettings
    }
    curbsidePickup {
      ...DispoCurbsideSettings
    }
    inStorePickup {
      ...DispoInStorePickupSettings
    }
  }
  ${F_DISPO_KIOSK_SETTINGS}
  ${F_DISPO_DELIVERY_SETTINGS}
  ${F_DISPO_DRIVE_THRU_SETTINGS}
  ${F_DISPO_CURBSIDE_SETTINGS}
  ${F_DISPO_IN_STORE_PICKUP_SETTINGS}
`

export const F_DISPO_ORDER_TYPE_CONFIG = gql`
  fragment DispoOrderTypesConfig on OrderTypesConfig {
    offerAnyPickupService
    offerDeliveryService
    kiosk {
      enabled
      paymentTypes {
        alt36
        check
        creditCardAtDoor
        payOnlineChase
        payOnlineHypur
        payOnlineMerrco
        payOnlineMoneris
        creditCardByPhone
        debit
        dutchiePay
        cash
        linx
        canPay
        paytender
        aeropay
      }
    }
    delivery {
      enabled
      paymentTypes {
        alt36
        check
        creditCardAtDoor
        payOnlineChase
        payOnlineHypur
        payOnlineMerrco
        payOnlineMoneris
        creditCardByPhone
        debit
        dutchiePay
        cash
        linx
        canPay
        paytender
        aeropay
      }
    }
    driveThruPickup {
      enabled
      paymentTypes {
        alt36
        check
        creditCardAtDoor
        payOnlineChase
        payOnlineHypur
        payOnlineMerrco
        payOnlineMoneris
        creditCardByPhone
        debit
        dutchiePay
        cash
        linx
        canPay
        paytender
        aeropay
      }
    }
    curbsidePickup {
      enabled
      paymentTypes {
        alt36
        check
        creditCardAtDoor
        payOnlineChase
        payOnlineHypur
        payOnlineMerrco
        payOnlineMoneris
        creditCardByPhone
        debit
        dutchiePay
        cash
        linx
        canPay
        paytender
        aeropay
      }
    }
    pickup {
      enabled
      paymentTypes {
        alt36
        check
        creditCardAtDoor
        payOnlineChase
        payOnlineHypur
        payOnlineMerrco
        payOnlineMoneris
        creditCardByPhone
        debit
        dutchiePay
        cash
        linx
        canPay
        paytender
        aeropay
      }
    }
  }
`

export const F_DISPO_STORE_SETTINGS = gql`
  fragment DispoStoreSettingsSchema on Dispensaries_storeSettings {
    isolatedMenus
    customerMessagingTermsAccepted
    defaultViewStyle
    disablePurchaseLimits
    disableGuestDOB
    displayPhoneConfirmation
    requireEmailAddressForGuestCheckout
    requireMedCardPhotoForPickup
    hideAddressFromDutchieMain
    requireMedCardPhotoForDelivery
    enableAfterHoursOrderingForPickup
    enableAfterHoursOrderingForDelivery
    enableLLxSaleDiscountSync
    enableMixAndMatchPricingForPickup
    enableMixAndMatchPricingForDelivery
    enableScheduledOrderingForPickup
    enableScheduledOrderingForDelivery
    enableLimitPerCustomer
    quantityLimit
    enableOrderStatusEmails
    enableStorefrontAgeGate
    disableGuestCheckout
    stealthMode
    dontCombineWeightedProducts
    keepUncombinedWeights
    dontMapSubcategoriesByProductName
    prioritizeStaffPicksInSearchResults
    hideEffects
    hideFilters
    subscriptions {
      enabled
    }
  }
`

export const F_DISPO_LOCATION = gql`
  fragment DispoLocation on Dispensaries_profile_location {
    ln1
    ln2
    city
    state
    country
    geometry {
      coordinates
    }
  }
`

export const F_DISPO_ACTION_ESTIMATES = gql`
  fragment DispoActionEstimates on ActionEstimates {
    pickup {
      readyInMinutes
      rangeInMinutes
    }
    delivery {
      readyInMinutes
      rangeInMinutes
    }
  }
`

export const F_DISPO_ACTION_ESTIMATES_OVERRIDE = gql`
  fragment DispoActionEstimatesOverride on DurationEstimates {
    delivery {
      enabled
      lowInMinutes
      highInMinutes
    }
    pickup {
      enabled
      lowInMinutes
      highInMinutes
    }
  }
`

export const F_DISPO_SPECIAL_SETTINGS = gql`
  fragment DispoSpecialsSettings on SpecialsSettings {
    discountBehavior
    discountStacking
    discountPrecedence
    enableIndividualSpecialPrecedence
    enableIndividualDiscountStacking
    stackingBehavior
    nonStackingBehavior
  }
`

export const F_DISPO_PAYMENT_TYPES = gql`
  fragment DispoPaymentTypesAccepted on PaymentTypesConfig {
    alt36
    check
    creditCardAtDoor
    payOnlineChase
    payOnlineHypur
    payOnlineMerrco
    payOnlineMoneris
    creditCardByPhone
    debit
    dutchiePay
    cash
    linx
    canPay
    paytender
    aeropay
  }
`

export const F_DISPO_FEATURE_FLAGS = gql`
  fragment DispoFeatureFlags on Dispensaries_featureFlags {
    hideStoreHours
    enableOnfleet
    hideDeliveryEstimate
    hideMyAccount
    enablePausedOrders
    hasEffectsFilter
    enableAdvancedDiscountSettings
    enableAfterHoursOrdering
    enableBogoSpecials
    enableBogoTotalQuantityAndWeight
    enableScheduledOrdering
    enableArrivals
    enableDriveThruPickup
    enableMenuImport
    enableMixAndMatch
    enableNonTerminalAutoConfirm
  }
`

export const F_DISPO_V1_DELIVERY_INFO = gql`
  fragment DispoV1DeliveryInfo on Dispensaries_deliveryInfo {
    minimumVaries
    fee
    minimum
    feeType
    feeVaries
    percentFee
  }
`

export const F_DISPO_RETAILER_INFO = gql`
  fragment DispoRetailerInfo on Retailer {
    enterprise {
      website
      phone
      createdAt
      accountTier
      name
      id
      updatedAt
      uniqueName
    }
    createdAt
    accountTier
    id
    updatedAt
    enterpriseId
    phone
    medLicense
    address
    recLicense
  }
`

export const F_DISPO_WEBHOOKS = gql`
  fragment DispoWebhooks on Dispensaries_webhook {
    url
    orderType
    method
    event
  }
`

export const F_DISPO_SPECIAL_HOURS = gql`
  fragment DispoSpecialHours on SpecialHours {
    startDate
    endDate
    name
  }
`

export const F_DISPO_TAX_CONFIG = gql`
  fragment DispoTaxConfig on Dispensaries_TaxConfig {
    calculationMethod
    discountTaxOrder
    version
    taxes {
      id
      type
      name
      rate
      potencyRate
      potency
      medical
      recreational
      taxBasis
      order
      deliveryPolicy
      includeStateSalesTaxInDestinationRate
      destinationRate
      applyTo {
        types
        hemp
      }
      stages {
        type
        op
      }
    }
  }
`

export const F_DISPO_SUPER_ADMINS = gql`
  fragment DispoSuperAdmins on Dispensaries_superAdmin {
    role
    userId
    name
  }
`

export const F_DISPO_ORDER_LIFECYCLE_CONFIG = gql`
  fragment DispoOrderLifecycleConfig on Dispensaries_ordersConfig {
    autoClose
    autoConfirm
    posItemNames
    terminalReceiptOptions {
      customerNameOption
      birthdate
      deliveryAddress
      phone
      medical
      potencyInfo
      disableSocialImpact
    }
  }
`

export const F_DISPO_V1_PAYMENT_FEE_SETTINGS = gql`
  fragment DispoV1PaymentFees on Dispensaries_paymentFees {
    feeType
    fee
    paymentType
  }
`

export const F_DISPO_INTEGRATIONS = gql`
  fragment DispoIntegrations on Dispensaries_integrations {
    enabled
    adapter
    live
    credentials {
      apiKey
      ordersEnabled
      email
    }
  }
`

export const F_DISPO_TERMINALS = gql`
  fragment DispoTerminals on Dispensaries_terminals {
    _id
    nickname
    versionNumber
    lastSeenAt
    lastSeenAtISO
  }
`

export const F_DISPO_MENU_INTEGRATIONS = gql`
  fragment DispoMenuIntegration on Dispensaries_integrations {

  }
`

export const F_DISPO_ADMINS = gql`
  fragment DispoAdminsInfo on Dispensaries_profile_admins {
    number
    name
    active
  }
`

export const F_DISPO_DELIVERY_AREA = gql`
  fragment DispoDeliveryArea on Polygon {
    type
    features {
      type
      geometry {
        type
        coordinates
      }
    }
  }
`

export const F_DISPO_EXCISE_TAX = gql`
  fragment DispoExciseTax on Dispensaries_exciseTax {
    local
    medicalLocal
    medicalState
    state
  }
`

export const F_DISPO_FEE_TIERS = gql`
  fragment DispoFeeTiers on Dispensaries_profile_feeTiers {
    max
    fee
    min
    feeType
    percentFee
  }
`

export const F_DISPO_V1_COORDINATES = gql`
  fragment DispoCoordinates on Dispensaries_profile_coordinates {
    lng
    lat
  }
`

export const F_DISPO_V1_DRIVERS = gql`
  fragment DispoDrivers on Dispensaries_profile_drivers {
    name
    number
  }
`

export const F_DISPO_MENU_SCORE = gql`
  fragment DispoMenuScore on MenuScore {
    category
    value
  }
`

export const F_DISPO_CATEGORY_LIMITS = gql`
  fragment CategoryLimits on Dispensaries_categoryLimits {
    name
    value
  }
`

export const F_DISPO_CATEGORY_INFO = gql`
  fragment CategoryInfo on CategorySummary {
    category
    value
  }
`

export const DISPO_TOP_DATA = gql`
  fragment DispoTopLevelData on Dispensaries {
    name
    address
    fullName
    cName
    chainName
    id
    description
    logoImage
    email
    updatedAt
    createdAt
    chain
    tier
    status
    phone
    emailConfirmation
    salesTax
    medicalDispensary
    medicalOnly
    recDispensary
    maxDeliveryDistance
    distance
  }
`

export const DISPO_EXTRA_DATA = gql`
  fragment DispoExtraData on Dispensaries {
    publicAPIToken
    textNotifications
    emailNotifications
    phoneTree
    callConfirmation
    timezone
    isLibrary
    resetToken
    listImage
    notes
    embeddedLogoImage
    embeddedMenuUrl
    SpecialLogoImage
    embedBackUrl
    offerCurbsidePickup
    offerDriveThruPickup
    offerDelivery
    menuScore
  }
`

export const DISPO_LIVE_METADATA = gql`
  fragment DispoLiveMetadataData on Dispensaries {
    deliveryMin
    actionEstimates {
      ...DispoActionEstimates
    }
    durationEstimateOverrides {
      ...DispoActionEstimatesOverride
    }
    deliveryInfo {
      ...DispoV1DeliveryInfo
    }
  }
  ${F_DISPO_ACTION_ESTIMATES}
  ${F_DISPO_ACTION_ESTIMATES_OVERRIDE}
  ${F_DISPO_V1_DELIVERY_INFO}
`

export const DISPO_SCHEMA = gql`
  fragment DispoSchema on Dispensaries {
    menuOrder
    menuUrl
    exciseTax {
      ...DispoExciseTax
    }
    feeTiers {
      ...DispoFeeTiers
    }
    check
    canPay
    complianceCode
    stealthMode
    alt36
    linx
    acceptsTips
    aeropay
    cashOnly
    creditCard
    bannerImage
    payInStore
    kioskInstructions
    cashless
    acceptsDutchiePayTips
    creditCardAtDoor
    payOnlineHypur
    payOnlineMerrco
    creditCardByPhone
    debitOnly
    deliveryFee
    ordersArePaused
    activeCategories
    paytender
    paymentTypesAccepted {
      ...DispoPaymentTypesAccepted
    }
    paymentFees {
      ...DispoV1PaymentFees
    }

    plusSettings {
      checkoutUrl
    }
    menuScoresByCategory {
      ...DispoMenuScore
    }
    categoryLimits {
      ...CategoryLimits
    }
    productCategorySummary {
      ...CategoryInfo
    }
    colorSettings {
      linkColor
    }
    preferences {
      betaIntegrations
    }
    ...DispoHoursSet
    customDomainSettings {
      domain
    }
    pickupMinimum {
      enabled
      minimumInCents
    }
    orderTypesConfigV2 {
      ...DispoOrderTypesConfigV2
    }
    orderTypesConfig {
      ...DispoOrderTypesConfig
    }
    specialsSettings {
      ...DispoSpecialsSettings
    }
    storeSettings {
      ...DispoStoreSettingsSchema
    }
    location {
      ...DispoLocation
    }
    specialHours {
      ...DispoSpecialHours
    }
    featureFlags {
      ...DispoFeatureFlags
    }
    webhooks {
      ...DispoWebhooks
    }
    retailer {
      ...DispoRetailerInfo
    }
    taxConfig {
      ...DispoTaxConfig
    }
    superAdmins {
      ...DispoSuperAdmins
    }
    ordersConfig {
      ...DispoOrderLifecycleConfig
    }
    terminals {
      ...DispoTerminals
    }
    integrations {
      ...DispoIntegrations
    }
    menuIntegration {
      ...DispoIntegrations
    }
    admins {
      ...DispoAdminsInfo
    }
    deliveryArea {
      ...DispoDeliveryArea
    }
    coordinates {
      ...DispoCoordinates
    }
    drivers {
      ...DispoDrivers
    }
  }
  ${F_DISPO_EXCISE_TAX}
  ${F_DISPO_FEE_TIERS}
  ${F_DISPO_PAYMENT_TYPES}
  ${F_DISPO_V1_PAYMENT_FEE_SETTINGS}
  ${F_DISPO_MENU_SCORE}
  ${F_DISPO_CATEGORY_LIMITS}
  ${F_DISPO_CATEGORY_INFO}
  ${F_DISPO_HOURS_SET}
  ${F_DISPO_ORDER_TYPE_V2_CONFIG}
  ${F_DISPO_ORDER_TYPE_CONFIG}
  ${F_DISPO_SPECIAL_SETTINGS}
  ${F_DISPO_STORE_SETTINGS}
  ${F_DISPO_LOCATION}
  ${F_DISPO_SPECIAL_HOURS}
  ${F_DISPO_FEATURE_FLAGS}
  ${F_DISPO_WEBHOOKS}
  ${F_DISPO_RETAILER_INFO}
  ${F_DISPO_TAX_CONFIG}
  ${F_DISPO_SUPER_ADMINS}
  ${F_DISPO_ORDER_LIFECYCLE_CONFIG}
  ${F_DISPO_TERMINALS}
  ${F_DISPO_INTEGRATIONS}
  ${F_DISPO_ADMINS}
  ${F_DISPO_DELIVERY_AREA}
  ${F_DISPO_V1_COORDINATES}
  ${F_DISPO_V1_DRIVERS}
`

// eslint-disable-next-line unused-imports/no-unused-vars
const F_DISPO_DATA_FULL = gql`
  fragment DispoDataFull on Dispensaries {
    ...DispoTopLevelData
    ...DispoExtraData
    ...DispoLiveMetadataData
    ...DispoHours
    ...DispoSchema
  }
  ${DISPO_TOP_DATA}
  ${DISPO_EXTRA_DATA}
  ${DISPO_LIVE_METADATA}
  ${DISPO_SCHEMA}
  ${F_DISPO_HOURS}
`
