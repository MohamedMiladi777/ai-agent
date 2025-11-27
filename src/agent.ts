import type { AIMessage } from '../types'
import { runLLM } from './llm'
import { addMessage, getMessages } from './memory'
import { logMessage, showLoader } from './ui'
//Created a runAgent function that takes a userMessage(Through destructuring)
export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  //Added the userMessage to the lowdb
  await addMessage([{ role: 'user', content: userMessage }])

  //Improrted showLoader from UI to display the thinking phase
  const loader = showLoader('Thinking...')

  //We get all message history
  const history = await getMessages()

  //Call runLLm and pass the history and tools
  const response = await runLLM({ messages: history, tools })
  //(also pass the tools in runLLM and index.ts and runAgent)

  //Add the response of the LLM
  await addMessage([response])
  // Log the message
  logMessage(response)

  loader.stop()
  return getMessages()
}

//stop the loader from showing

//
