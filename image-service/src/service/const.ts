export const prompt = `
  Carefully analyze the provided image and assign a score from 0 to 10 for the overall quality of the school uniform garment.
  Consider the following criteria in your evaluation:

  Fabric condition: presence of tears, wear, or loose threads;
  Cleanliness: visible stains, dirt, or discoloration;
  General appearance: whether the garment looks new, gently used, or heavily worn.

  Provide a brief justification for each criterion and then give a final overall score.
  All justifications should be written in Brazilian Portuguese (PT-BR).

  Return your response in the following JSON format (always using the same structure):

  {
    "fabricCondition": {
      "score": number,
      "comments": "string"
    },
    "cleanliness": {
      "score": number,
      "comments": "string"
    },
    "generalAppearance": {
      "score": number,
      "comments": "string"
    },
    "overallScore": number,
    "overallComments": "string"
  }
  `