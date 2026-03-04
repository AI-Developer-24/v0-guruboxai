export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  timeout?: number
}

export interface ChatResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
}

export abstract class AIProvider {
  protected apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Single chat completion (non-streaming)
   */
  abstract chat(
    messages: Message[],
    options?: ChatOptions
  ): Promise<ChatResponse>

  /**
   * Streaming chat completion (for real-time output)
   */
  abstract stream(
    messages: Message[],
    options?: ChatOptions
  ): AsyncGenerator<string, void, unknown>
}
