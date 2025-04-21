import OpenAI from "openai";
import { ImageMessage } from "../handler/types";
import { MongoDB } from "../lib/mongodb";
import { ImageEvaluation, ImageEvaluationSchemaDefinition } from "../model/image";
import { prompt } from "./const";
import { ImageResult } from "./types";
import { config } from "../config/env";

export class ImageService {
  private openAI: OpenAI;

  constructor(
    private readonly mongo: MongoDB,
  ) {
    this.openAI = new OpenAI({
      apiKey: config.openAPI.KEY
    });
  }

  async process(data: ImageMessage) {
    const model = await this.mongo.getModel<ImageEvaluation>(
      'Image',
      ImageEvaluationSchemaDefinition
    );

    const response = await this.openAI.chat.completions.create({
      model: 'gpt-4.1-mini', // modelo que suporta imagens e é barato
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${data.image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      temperature: 0.3, // respostas mais conservadoras
    });

    if (!response.choices[0].message.content) {
      throw new Error("Response content is null");
      // TODO: tratar erro de forma mais adequada
    }

    const result: ImageResult = JSON.parse(response.choices[0].message.content);

    await this.mongo.insertOne(model, {
      imageId: data.imageId,
      fabricCondition: result.fabricCondition,
      cleanliness: result.cleanliness,
      generalAppearance: result.generalAppearance,
      overallScore: result.overallScore,
      overallComments: result.overallComments,
    })
  }
}
