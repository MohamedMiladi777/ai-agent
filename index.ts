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
  parameters: z.object({})
}

const response = await runAgent({userMessage, tools: []})
console.log(response)

//console.log(process)
console.log(process.argv[2])


