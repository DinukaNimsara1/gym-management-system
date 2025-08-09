export interface MealPlan {
  id: number;
  memberId: number;
  items: Array<{ name: string; calories: number; time: string }>;
}


