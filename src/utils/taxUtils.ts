export const getDeductionRate = (
  donor: string,
  donationAmount: number
): number | null => {
  if (donor === "개인") {
    return donationAmount > 10000000 ? 0.35 : 0.2;
  } else if (donor === "사업자") {
    return 0.3;
  }
  return null;
};
