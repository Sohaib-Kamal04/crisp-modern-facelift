// utils/pricing.ts

export const CLEANING_TYPE_PRICES = {
  Regular: 45,
  Deep: 135,
  Vacate: 280,
} as const;

export const HOME_DETAIL_PRICES = {
  Bedroom: 20,
  Bathroom: 45,
  Kitchen: 35,
  Other: 20,
} as const;

export const EXTRA_PRICES = {
  Windows: 30,
  Walls: 40,
  Cabinets: 30,
  Organisation: 40,
  Blinds: 35,
  'Oven/Stovetops': 35,
  Fridge: 30,
  Dishwasher: 25,
  Garage: 40,
  Microwave: 10,
  Laundry: 35,
  'Tiles/Flooring': 35,
} as const;

export const FREQUENCY_DISCOUNTS = {
  'One time': 0,
  Weekly: 15,
  Fortnightly: 10,
  Monthly: 5,
} as const;

export const ACTION_TAKER_DISCOUNT = 30;

// Type definitions
export type CleaningType = keyof typeof CLEANING_TYPE_PRICES;
export type Extra = keyof typeof EXTRA_PRICES;
export type Frequency = keyof typeof FREQUENCY_DISCOUNTS;

export interface PricingRequest {
  cleaningType: CleaningType;
  homeDetails: {
    bedrooms?: number;
    bathrooms?: number;
    kitchens?: number;
    other?: number;
  };
  extras?: Extra[];
  frequency: Frequency;
  actionTakerDiscount?: boolean;
}

export interface PricingResponse {
  subtotal: number;
  discounts: {
    frequency?: { name: string; percentage: number; amount: number };
    actionTaker?: { name: string; percentage: number; amount: number };
  };
  totalDiscount: number;
  total: number;
  breakdown: {
    cleaningType: { name: string; price: number };
    homeDetails: {
      bedrooms?: number;
      bathrooms?: number;
      kitchens?: number;
      other?: number;
      total: number;
    };
    extras: { items: Array<{ name: string; price: number }>; total: number };
  };
}

export function calculatePricing(request: PricingRequest): PricingResponse {
  // Validate required fields
  if (!request.cleaningType || !request.frequency) {
    throw new Error('Missing required fields: cleaningType and frequency');
  }

  // Calculate base cleaning type price
  const cleaningTypePrice = CLEANING_TYPE_PRICES[request.cleaningType];

  // Calculate home details total
  const homeDetailsTotal =
    (request.homeDetails.bedrooms || 0) * HOME_DETAIL_PRICES.Bedroom +
    (request.homeDetails.bathrooms || 0) * HOME_DETAIL_PRICES.Bathroom +
    (request.homeDetails.kitchens || 0) * HOME_DETAIL_PRICES.Kitchen +
    (request.homeDetails.other || 0) * HOME_DETAIL_PRICES.Other;

  // Calculate extras total
  const extrasItems =
    request.extras?.map((extra) => ({
      name: extra,
      price: EXTRA_PRICES[extra],
    })) || [];

  const extrasTotal = extrasItems.reduce((sum, item) => sum + item.price, 0);

  // Calculate subtotal
  const subtotal = cleaningTypePrice + homeDetailsTotal + extrasTotal;

  // Calculate discounts
  const discounts: PricingResponse['discounts'] = {};
  let totalDiscount = 0;

  // Frequency discount
  const frequencyDiscountPercent = FREQUENCY_DISCOUNTS[request.frequency];
  if (frequencyDiscountPercent > 0) {
    const frequencyDiscountAmount = (subtotal * frequencyDiscountPercent) / 100;
    discounts.frequency = {
      name: `${request.frequency} discount`,
      percentage: frequencyDiscountPercent,
      amount: frequencyDiscountAmount,
    };
    totalDiscount += frequencyDiscountAmount;
  }

  // Action taker discount (applied after frequency discount)
  const discountedSubtotal = subtotal - totalDiscount;
  if (request.actionTakerDiscount) {
    const actionTakerDiscountAmount =
      (discountedSubtotal * ACTION_TAKER_DISCOUNT) / 100;
    discounts.actionTaker = {
      name: 'Action taker discount',
      percentage: ACTION_TAKER_DISCOUNT,
      amount: actionTakerDiscountAmount,
    };
    totalDiscount += actionTakerDiscountAmount;
  }

  // Calculate final total
  const total = subtotal - totalDiscount;

  return {
    subtotal,
    discounts,
    totalDiscount,
    total: Math.round(total * 100) / 100,
    breakdown: {
      cleaningType: { name: request.cleaningType, price: cleaningTypePrice },
      homeDetails: {
        bedrooms: request.homeDetails.bedrooms,
        bathrooms: request.homeDetails.bathrooms,
        kitchens: request.homeDetails.kitchens,
        other: request.homeDetails.other,
        total: homeDetailsTotal,
      },
      extras: { items: extrasItems, total: extrasTotal },
    },
  };
}
