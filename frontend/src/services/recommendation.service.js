const RECOMMENDATION_TYPES = {
  SINGLE: 'SingleProduct',
  MULTIPLE: 'MultipleProducts',
};

const calculateProductScore = (product, selectedPreferences, selectedFeatures) => {
  const preferenceMatches = selectedPreferences.filter(
    (pref) => product.preferences.includes(pref)
  ).length;

  const featureMatches = selectedFeatures.filter(
    (feat) => product.features.includes(feat)
  ).length;

  return preferenceMatches + featureMatches;
};

const scoredProducts = (products, selectedPreferences, selectedFeatures) => {
  return products.map((product) => ({
    product,
    score: calculateProductScore(product, selectedPreferences, selectedFeatures),
  }));
};

const filterMatchingProducts = (scored) => {
  return scored.filter(({ score }) => score > 0);
};

const selectSingleProduct = (matchingProducts) => {
  if (matchingProducts.length === 0) return [];

  const maxScore = Math.max(...matchingProducts.map(({ score }) => score));

  const topProducts = matchingProducts.filter(
    ({ score }) => score === maxScore
  );

  const lastMatch = topProducts[topProducts.length - 1];
  return [lastMatch.product];
};

const selectMultipleProducts = (matchingProducts) => {
  return matchingProducts.map(({ product }) => product);
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  if (!products || products.length === 0) return [];

  const scored = scoredProducts(products, selectedPreferences, selectedFeatures);
  const matching = filterMatchingProducts(scored);

  if (matching.length === 0) return [];

  const isSingle = selectedRecommendationType === RECOMMENDATION_TYPES.SINGLE;
  return isSingle
    ? selectSingleProduct(matching)
    : selectMultipleProducts(matching);
};

const recommendationService = { getRecommendations };

export default recommendationService;
