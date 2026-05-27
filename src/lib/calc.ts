export function calcBMR(weightKg: number, heightCm: number, age: number, gender: string): number {
  if (gender.toLowerCase() === 'female') {
    return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }
  // Default to Male formula for male or 'other'
  return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
}

export function calcTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'elite': 1.9
  };
  const multiplier = multipliers[activityLevel.toLowerCase()] || 1.2;
  return Math.round(bmr * multiplier);
}

export function calcBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calcMacros(tdee: number, weightKg: number, goal: string): { calories: number, protein: number, fat: number, carbs: number } {
  let calories = tdee;
  let proteinMultiplier = 2.0;
  let fatPercentage = 0.25;

  // Format the goal string to match expected formats
  const normalizedGoal = goal.toLowerCase().replace(' ', '_');

  switch (normalizedGoal) {
    case 'fat_loss':
      calories = tdee - 500;
      proteinMultiplier = 2.4;
      fatPercentage = 0.25;
      break;
    case 'muscle_gain':
      calories = tdee + 300;
      proteinMultiplier = 2.2;
      fatPercentage = 0.25;
      break;
    case 'recomp':
    case 'recomposition':
      calories = tdee;
      proteinMultiplier = 2.5;
      fatPercentage = 0.30;
      break;
    case 'strength':
      calories = tdee + 200;
      proteinMultiplier = 2.0;
      fatPercentage = 0.30;
      break;
    case 'aesthetics':
      calories = tdee - 200;
      proteinMultiplier = 2.3;
      fatPercentage = 0.28;
      break;
  }

  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const fatGrams = Math.round((calories * fatPercentage) / 9);
  
  // Remaining calories go to carbs (4 kcal/g)
  const remainingCals = calories - (proteinGrams * 4) - (fatGrams * 9);
  const carbGrams = Math.max(0, Math.round(remainingCals / 4));

  return {
    calories: Math.round(calories),
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams
  };
}

export function calcAll(weightKg: number, heightCm: number, age: number, gender: string, activityLevel: string, goal: string) {
  const bmr = calcBMR(weightKg, heightCm, age, gender);
  const tdee = calcTDEE(bmr, activityLevel);
  const bmi = calcBMI(weightKg, heightCm);
  const category = bmiCategory(bmi);
  const macros = calcMacros(tdee, weightKg, goal);

  return {
    bmr: Math.round(bmr),
    tdee,
    bmi,
    bmiCategory: category,
    targetCalories: macros.calories,
    macros: {
      protein: macros.protein,
      fat: macros.fat,
      carbs: macros.carbs
    }
  };
}
