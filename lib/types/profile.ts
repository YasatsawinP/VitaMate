export type Gender = "female" | "male" | "other";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active";
export type HealthGoal = "maintain" | "lose_weight" | "gain_muscle" | "improve_health";

export type UserProfile = {
  name: string;
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  activity: ActivityLevel;
  goal: HealthGoal;
};

export type DailyTargets = {
  calories: number; // kcal/day
  protein: number;  // g/day
  water: number;    // ml/day
  sleepMin: number; // hours
  sleepMax: number; // hours
};
