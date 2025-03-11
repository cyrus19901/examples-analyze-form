export function calculateEffectiveGrossRevenue(
  units: number,
  effectiveRentPerUnit: number,
  generalVacancy: number
): number {
  return units * effectiveRentPerUnit * (1 - generalVacancy) * 12;
}

export function calculateNetOperatingIncome(
  effectiveGrossRevenue: number,
  operatingExpenseRatio: number
): number {
  return effectiveGrossRevenue * (1 - operatingExpenseRatio);
}

export function calculatePropertyValue(
  netOperatingIncome: number,
  capRate: number
): number {
  return netOperatingIncome / capRate;
}

export function calculateCapRate(
  netOperatingIncome: number,
  propertyValue: number
): number {
  return netOperatingIncome / propertyValue;
}

export function validateValue(
  actual: number,
  calculated: number,
  tolerance: number = 0.01
): boolean {
  return Math.abs(actual - calculated) / actual < tolerance;
}
