import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessage, getMessages } from './src/memory'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

//console.log(process)
console.log(process.argv[2])

//We fetch for the entire history of messages
const messages = await getMessages()

// On first run, the LLM will respond correctly but on consecutive runs it
// will not interact with previous prompts since it has dementia..


const response = await runLLM({ messages: [...messages, {role: "user", content: userMessage}] })
console.log(response)
