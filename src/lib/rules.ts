export interface Recommendation {
  id: string;
  category: 'training' | 'nutrition' | 'recovery' | 'looksmax';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  icon: string;
  timeframe: string;
}

export function generateRecommendations(
  goal: string,
  bmi: number,
  activityLevel: string,
  weight: number,
  protein: number
): Recommendation[] {
  const rules: Recommendation[] = [];

  // Training rules
  if (goal === 'muscle_gain') {
    rules.push({ id: 't1', category: 'training', title: 'PPL SPLIT', description: 'Push/Pull/Legs 6x/week. Progressive overload +2.5kg/week.', priority: 'high', icon: '🏋️', timeframe: 'Ongoing' });
  } else if (goal === 'strength') {
    rules.push({ id: 't2', category: 'training', title: '5X5 PROTOCOL', description: 'Compound focus. Deload every 4 weeks.', priority: 'high', icon: '⚡', timeframe: 'Ongoing' });
  } else if (goal === 'fat_loss') {
    rules.push({ id: 't3', category: 'training', title: 'HYBRID BURN', description: 'PPL 4x + LISS cardio 30min daily.', priority: 'high', icon: '🔥', timeframe: 'Ongoing' });
  } else if (goal === 'recomp') {
    rules.push({ id: 't4', category: 'training', title: 'BODY RECOMPOSITION', description: 'Full body 4x/week, moderate weights, HIIT 2x/week.', priority: 'high', icon: '⚖️', timeframe: 'Ongoing' });
  }
  
  if (activityLevel === 'sedentary') {
    rules.push({ id: 't5', category: 'training', title: 'HABIT BUILDER', description: 'Start with 3x full body. Build the habit first.', priority: 'critical', icon: '🏃', timeframe: 'First 4 weeks' });
  }

  // Nutrition rules
  if (bmi > 25 && goal === 'muscle_gain') {
    rules.push({ id: 'n1', category: 'nutrition', title: 'RECOMP PRIORITIZED', description: 'High BMI detected. Recommend body recomposition before aggressive bulking.', priority: 'medium', icon: '⚠️', timeframe: 'Ongoing' });
  }
  if (bmi < 18.5) {
    rules.push({ id: 'n2', category: 'nutrition', title: 'AGGRESSIVE BULK', description: 'Liquid calories required. Minimum 4 meals daily.', priority: 'critical', icon: '🥛', timeframe: 'Until BMI > 18.5' });
  }
  if (protein < weight * 1.6) {
    rules.push({ id: 'n3', category: 'nutrition', title: 'PROTEIN DEFICIT', description: 'Current protein targets are below optimal for tissue synthesis.', priority: 'critical', icon: '🥩', timeframe: 'Immediate' });
  }

  // Looksmax rules
  rules.push({ id: 'l1', category: 'looksmax', title: 'MEWING', description: 'Correct tongue posture daily. Nasal breathing only.', priority: 'medium', icon: '🤫', timeframe: 'Daily' });
  rules.push({ id: 'l2', category: 'looksmax', title: 'HYDRATION PROTOCOL', description: '35ml per kg bodyweight daily minimum.', priority: 'high', icon: '💧', timeframe: 'Daily' });
  rules.push({ id: 'l3', category: 'looksmax', title: 'SKINCARE BASE', description: 'SPF daily, retinol at night.', priority: 'high', icon: '🧴', timeframe: 'Daily' });
  rules.push({ id: 'l4', category: 'looksmax', title: 'POSTURE ALIGNMENT', description: 'Deadhang 60s daily, face pulls, chin tucks.', priority: 'medium', icon: '🧍', timeframe: 'Daily' });
  rules.push({ id: 'l5', category: 'looksmax', title: 'GROOMING MAINTENANCE', description: 'Beard line cleanup, eyebrow maintenance.', priority: 'low', icon: '✂️', timeframe: 'Weekly' });
  
  if (goal === 'fat_loss') {
     rules.push({ id: 'l6', category: 'looksmax', title: 'FACIAL FAT REDUCTION', description: 'Caloric deficit reveals bone structure.', priority: 'high', icon: '💀', timeframe: '12-16 weeks' });
  }

  // Recovery rules
  rules.push({ id: 'r1', category: 'recovery', title: 'SLEEP OPTIMIZATION', description: '8-9hrs sleep. Peak GH and testosterone window.', priority: 'critical', icon: '🛌', timeframe: 'Nightly' });
  rules.push({ id: 'r2', category: 'recovery', title: 'SYSTEM DELOAD', description: 'Reduce volume every 6 weeks to prevent CNS fatigue.', priority: 'medium', icon: '🔋', timeframe: 'Every 6 weeks' });

  // Sort by priority (critical > high > medium > low)
  const priorityScore = { critical: 4, high: 3, medium: 2, low: 1 };
  rules.sort((a, b) => priorityScore[b.priority] - priorityScore[a.priority]);

  return rules;
}
