export const calculateFabricMeters = (lengthPerUnit, quantity, wastagePercent) => {
  const base = Number(lengthPerUnit) * Number(quantity);
  const withWastage = base * (1 + Number(wastagePercent) / 100);
  return Number.isFinite(withWastage) ? withWastage : 0;
};

export const calculateSubtotal = ({
  fabricMetersRequired,
  fabricPricePerMeter,
  accessories,
  quantity,
  otherCostPerUnit,
  lengthPerUnit,
  wastagePercent,
}) => {
  const fabricCost = fabricMetersRequired * fabricPricePerMeter;
  const accessoriesCost = accessories.reduce(
    (sum, a) => sum + (a.qtyPerUnit || 0) * (a.unitCost || 0) * quantity,
    0
  );
  const otherCostTotal = otherCostPerUnit * quantity;
  const subtotal = fabricCost + accessoriesCost + otherCostTotal;

  const lowEstimate = subtotal * 0.95;
  const highEstimate = subtotal * 1.05;

  const perUnitFabric = lengthPerUnit * (1 + wastagePercent / 100);
  const perUnitFabricCost = perUnitFabric * fabricPricePerMeter;
  const perUnitAccessories = accessories.reduce(
    (sum, a) => sum + (a.qtyPerUnit || 0) * (a.unitCost || 0),
    0
  );
  const perUnitOther = otherCostPerUnit;
  const totalPerUnit = perUnitFabricCost + perUnitAccessories + perUnitOther;

  return {
    fabricCost,
    accessoriesCost,
    otherCostTotal,
    subtotal,
    lowEstimate,
    highEstimate,
    perUnit: { totalPerUnit, perUnitFabric },
  };
};
