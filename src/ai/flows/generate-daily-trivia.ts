'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a set of five diverse trivia questions each day.
 *
 * The flow uses an LLM to generate the questions, ensuring the game remains fresh and engaging.
 *
 * @interface GenerateDailyTriviaInput - The input type for the generateDailyTrivia function.
 * @interface GenerateDailyTriviaOutput - The output type for the generateDailyTrivia function.
 * @function generateDailyTrivia - A function that triggers the trivia question generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyTriviaInputSchema = z.object({
  topic: z.string().describe('The topic of the trivia questions.'),
});
export type GenerateDailyTriviaInput = z.infer<typeof GenerateDailyTriviaInputSchema>;

const TriviaQuestionSchema = z.object({
  question: z.string().describe('The trivia question.'),
  options: z.array(z.string()).describe('The possible answers to the question.'),
  correctAnswerIndex: z.number().describe('The index of the correct answer in the options array.'),
});

const GenerateDailyTriviaOutputSchema = z.object({
  questions: z.array(TriviaQuestionSchema).describe('An array of five trivia questions.'),
});
export type GenerateDailyTriviaOutput = z.infer<typeof GenerateDailyTriviaOutputSchema>;

export async function generateDailyTrivia(input: GenerateDailyTriviaInput): Promise<GenerateDailyTriviaOutput> {
  return generateDailyTriviaFlow(input);
}

const generateDailyTriviaPrompt = ai.definePrompt({
  name: 'generateDailyTriviaPrompt',
  input: {schema: GenerateDailyTriviaInputSchema},
  output: {schema: GenerateDailyTriviaOutputSchema},
  prompt: `You are a trivia question generator. Generate five diverse trivia questions about the topic: {{{topic}}}. Each question should have four possible answers, and one correct answer. Provide the index of the correct answer in the options array.

Example Output Format:
{
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["London", "Paris", "Berlin", "Rome"],
      "correctAnswerIndex": 1
    },
    {
      "question": "What is the highest mountain in the world?",
      "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      "correctAnswerIndex": 0
    }
  ]
}

Make sure there are five distinct questions in total.
`,
});

const generateDailyTriviaFlow = ai.defineFlow(
  {
    name: 'generateDailyTriviaFlow',
    inputSchema: GenerateDailyTriviaInputSchema,
    outputSchema: GenerateDailyTriviaOutputSchema,
  },
  async input => {
    const {output} = await generateDailyTriviaPrompt(input);
    return output!;
  }
);
