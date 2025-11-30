import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weather_tool = {
  name: 'get_weather',
  description: "Use this tool to get the weather.",
  parameters: z.object({
    reasoning: z.string().describe('Explain your tool choice.')
  })
}

await runAgent({userMessage, tools: [weather_tool]})

//console.log(process)
console.log(process.argv[2])


