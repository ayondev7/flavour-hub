// Recipe form constants
export const MEAL_TYPES = [
  { value: "Breakfast", label: "Breakfast" },
  { value: "Brunch", label: "Brunch" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
  { value: "Snack", label: "Snack" },
  { value: "Dessert", label: "Dessert" },
  { value: "Appetizer", label: "Appetizer" },
  { value: "Side Dish", label: "Side Dish" },
  { value: "Beverage", label: "Beverage" },
];

export const CUISINE_TYPES = [
  { value: "Indian", label: "Indian" },
  { value: "American", label: "American" },
  { value: "Chinese", label: "Chinese" },
  { value: "Italian", label: "Italian" },
  { value: "Mexican", label: "Mexican" },
  { value: "French", label: "French" },
  { value: "Japanese", label: "Japanese" },
  { value: "Middle Eastern", label: "Middle Eastern" },
];

export const TIME_VALIDATION = {
  HOURS: { min: 0, max: 24 },
  MINUTES: { min: 0, max: 60 },
};

export const IMAGE_VALIDATION = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
};