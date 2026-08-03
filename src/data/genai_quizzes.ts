import { ModuleAssessment, QuizQuestion, quizzesMod1To5 } from "./quizzes_mod_1_5";
import { quizzesMod6To10 } from "./quizzes_mod_6_10";
import { quizzesMod11To15 } from "./quizzes_mod_11_15";

export type { ModuleAssessment, QuizQuestion };

/**
 * Complete repository of Proctored Module Evaluations & Capstone Exams
 * for Course 1: Generative AI Masterclass (15 Modules × 10 Questions = 150 Total Questions).
 */
export const genaiQuizzes: ModuleAssessment[] = [
  ...quizzesMod1To5,
  ...quizzesMod6To10,
  ...quizzesMod11To15,
];
