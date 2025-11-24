import { openai } from './ai'

// Destructure the userMessage
export const runLLM = async ({ userMessage }: { userMessage: string }) => {
  //the create function has multiple properties like top-p,n (number of chat completions) and so onx²
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages: [{ role: 'user', content: userMessage }],
  })

  return response.choices[0].message.content
}
