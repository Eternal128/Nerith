import { isDemoMode } from '@/lib/env'
import { mockLlm } from './mock'

export interface LLMRequest {
  system: string
  user: string
  model?: string
  maxTokens?: number
  temperature?: number
}

export interface LLMResponse {
  content: string
  model: string
  tokensUsed: number
  mock: boolean
}

export async function llm(req: LLMRequest): Promise<LLMResponse> {
  const hasOpenAI = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 0
  const hasAnthropic = process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.length > 0

  if (isDemoMode || (!hasOpenAI && !hasAnthropic)) {
    return mockLlm(req)
  }

  if (hasAnthropic) {
    return callAnthropic(req)
  }

  return callOpenAI(req)
}

async function callOpenAI(req: LLMRequest): Promise<LLMResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: req.model ?? 'gpt-4o',
      messages: [
        { role: 'system', content: req.system },
        { role: 'user', content: req.user },
      ],
      max_tokens: req.maxTokens ?? 2000,
      temperature: req.temperature ?? 0.2,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>
    usage: { total_tokens: number }
    model: string
  }
  return {
    content: data.choices[0].message.content,
    model: data.model,
    tokensUsed: data.usage.total_tokens,
    mock: false,
  }
}

async function callAnthropic(req: LLMRequest): Promise<LLMResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: req.model ?? 'claude-3-5-sonnet-20241022',
      max_tokens: req.maxTokens ?? 2000,
      system: req.system,
      messages: [{ role: 'user', content: req.user }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`)
  }

  const data = await response.json() as {
    content: Array<{ text: string }>
    usage: { input_tokens: number; output_tokens: number }
    model: string
  }
  return {
    content: data.content[0].text,
    model: data.model,
    tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
    mock: false,
  }
}
