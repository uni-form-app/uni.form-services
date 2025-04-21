export interface EvaluationAspect {
  score: number;
  comments: string;
}

export interface ImageEvaluation {
  imageId: string;
  fabricCondition: EvaluationAspect;
  cleanliness: EvaluationAspect;
  generalAppearance: EvaluationAspect;
  overallScore: number;
  overallComments: string;
}

export const ImageEvaluationSchemaDefinition = {
  imageId: { type: String, required: true },
  fabricCondition: {
    score: { type: Number, required: true },
    comments: { type: String, required: true },
  },
  cleanliness: {
    score: { type: Number, required: true },
    comments: { type: String, required: true },
  },
  generalAppearance: {
    score: { type: Number, required: true },
    comments: { type: String, required: true },
  },
  overallScore: { type: Number, required: true },
  overallComments: { type: String, required: true },
};
