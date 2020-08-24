export const BREAKFAST = 'breakfast';
export const BRUNCH = 'brunch';
export const LUNCH = 'lunch';
export const DINNER = 'dinner';
export const DRINK = 'drink';
export const SNACK = 'snack';

export const isValidType = (type) => [BREAKFAST, BRUNCH, LUNCH, DINNER].includes(type.toLowerCase());

export const mealTypeOptions = [
  { id: BREAKFAST, value: 'Breakfast' },
  { id: BRUNCH, value: 'Brunch' },
  { id: LUNCH, value: 'Lunch' },
  { id: DINNER, value: 'Dinner' },
  { id: DRINK, value: 'Drink' },
  { id: SNACK, value: 'Snack' },
];
