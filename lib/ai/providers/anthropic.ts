import Anthropic from '@anthropic-ai/sdk'
import type { Message, ChatOptions, ChatResponse } from './base'
import { AIProvider } from './base'

export class AnthropicProvider extends AIProvider {
  private client: Anthropic

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new Anthropic({ apiKey })
  }

  async chat(messages: Message[], options: ChatOptions = {}): Promise<ChatResponse> {
    const response = await this.client.messages.create({
      model: options.model || 'claude-3-opus-20240229',
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature ?? 0.7,
      messages: messages.filter(m => m.role !== 'system'),
      system: messages.find(m => m.role === 'system')?.content,
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    return {
      content: content.text,
      usage: response.usage ? {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      } : undefined,
      model: response.model,
    }
  }

  async *stream(messages: Message[], options: ChatOptions = {}): AsyncGenerator<string> {
    const stream = await this.client.messages.stream({
      model: options.model || 'claude-3-opus-20240229',
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature ?? 0.7,
      messages: messages.filter(m => m.role !== 'system'),
      system: messages.find(m => m.role === 'system')?.content,
    })

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text
      }
    }
  }
}
