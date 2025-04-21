import { EvaluationAspect } from "../model/image";

export interface ImageResult {
  fabricCondition: EvaluationAspect;
  cleanliness: EvaluationAspect;
  generalAppearance: EvaluationAspect;
  overallScore: number;
  overallComments: string;
}