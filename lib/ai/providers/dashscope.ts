import OpenAI from 'openai'
import type { Message, ChatOptions, ChatResponse } from './base'
import { AIProvider } from './base'

/**
 * DashScope Provider for Alibaba Cloud Qwen models
 * Uses OpenAI-compatible API format
 */
export class DashScopeProvider extends AIProvider {
  private client: OpenAI
  private baseUrl: string

  constructor(apiKey: string, baseUrl?: string) {
    super(apiKey)
    this.baseUrl = baseUrl || 'https://dashscope.aliyuncs.com/compatible-mode/v1'
    this.client = new OpenAI({
      apiKey,
      baseURL: this.baseUrl,
    })
  }

  async chat(messages: Message[], options: ChatOptions = {}): Promise<ChatResponse> {
    const response = await this.client.chat.completions.create({
      model: options.model || 'qwen-max',
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
      timeout: options.timeout,
    })

    return {
      content: response.choices[0]?.message?.content || '',
      usage: response.usage ? {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens,
      } : undefined,
      model: response.model,
    }
  }

  *stream(messages: Message[], options: ChatOptions = {}): Generator<string> {
    const stream = this.client.chat.completions.create({
      model: options.model || 'qwen-max',
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens,
      stream: true,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) {
        yield content
      }
    }
  }
}
