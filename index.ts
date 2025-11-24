import 'dotenv/config'
import { runLLM } from './src/llm'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

//console.log(process)
console.log(process.argv[2])

// On first run, the LLM will respond correctly but on consecutive runs it
// will not interact with previous prompts since it has dementia..
const response = await runLLM({ userMessage })
console.log(response)
