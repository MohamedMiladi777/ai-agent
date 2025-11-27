import { auto } from 'openai/_shims/registry.mjs'
import type { AIMessage } from '../types'
import { openai } from './ai'
//import zod function 
import { zodFunction } from 'openai/helpers/zod.mjs'

// Destructure the userMessage
export const runLLM = async ({ messages, tools }: { messages: AIMessage[], tools: any[] }) => {
  
  //Format all the tools and convert them into zod functions
  const formattedTools = tools.map(zodFunction)
  //the create function has multiple properties like top-p,n (number of chat completions) and so onx²
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
    
  })

  return response.choices[0].message
}
