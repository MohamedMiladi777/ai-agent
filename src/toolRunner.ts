import type OpenAI from 'openai'
import type { ToolCall } from 'openai/resources/beta/threads/runs/steps.mjs'
import { addMessage } from './memory'
//Hardcoded the weather since almost all APIs are not free

const getWeather = () => 'It is ice cold, 90deg FARENHEIT'

/** Make a runTool async function to which takes:
 * @param {ToolCall} ToolCall
 * @param {String} userMessage
 */

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  // Make an input object which has two propreties: userMessage and toolArgs
  const input = {
    userMessage: userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input)
    default:
      throw new Error(`Uknown tool', ${toolCall.function.name}`)
  }
}

/**
 * A function to save the output of the LLM which takes:
 * @param {toolCallId} : string
 * @param {toolResponse}: string
 *
 * @returns {role}: 'tool'
 * @returns {content}: 'toolResponse'
 * @returns {tool_call_id} : toolCallId
 */

export const saveToolResponse = async (toolCallId: string, toolResponse: string) => {
  
  console.log('return addMessage: ', addMessage)
  
  return addMessage([
    {
      role: 'tool',
      content: toolResponse,
      tool_call_id: toolCallId,
    },
  ])
}

// Make a switch statement to determine which tool the AI would use.
