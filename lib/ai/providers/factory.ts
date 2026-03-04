import { OpenAIProvider } from './openai'
import { AnthropicProvider } from './anthropic'
import { DashScopeProvider } from './dashscope'

export type AIProviderType = 'openai' | 'anthropic' | 'dashscope'

export interface ProviderConfig {
  type: AIProviderType
  apiKey: string
  model?: string
  baseUrl?: string
}

const defaultModels: Record<AIProviderType, string> = {
  openai: 'gpt-4',
  anthropic: 'claude-3-opus-20240229',
  dashscope: 'qwen-max',
}

export function createProvider(config: ProviderConfig) {
  switch (config.type) {
    case 'openai':
      return new OpenAIProvider(config.apiKey)
    case 'anthropic':
      return new AnthropicProvider(config.apiKey)
    case 'dashscope':
      return new DashScopeProvider(config.apiKey, config.baseUrl)
    default:
      throw new Error(`Unknown provider type: ${config.type}`)
  }
}

export function getDefaultProvider() {
  // Decide which provider to use based on DEFAULT_MODEL env variable
  const defaultModel = process.env.DEFAULT_MODEL || 'gpt-4'

  if (defaultModel.startsWith('gpt-')) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not set')
    }
    return createProvider({
      type: 'openai',
      apiKey,
      model: defaultModel,
    })
  }

  if (defaultModel.startsWith('claude-')) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not set')
    }
    return createProvider({
      type: 'anthropic',
      apiKey,
      model: defaultModel,
    })
  }

  if (defaultModel.startsWith('qwen')) {
    const apiKey = process.env.DASHSCOPE_API_KEY
    if (!apiKey) {
      throw new Error('DASHSCOPE_API_KEY not set')
    }
    return createProvider({
      type: 'dashscope',
      apiKey,
      model: defaultModel,
      baseUrl: process.env.DASHSCOPE_BASE_URL,
    })
  }

  throw new Error(`Unknown default model: ${defaultModel}`)
}

// Get provider for specific model name
export function getProviderForModel(model: string) {
  if (!model) {
    throw new Error('Model name is required')
  }

  if (model.startsWith('gpt-')) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not set')
    }
    return createProvider({ type: 'openai', apiKey, model })
  }

  if (model.startsWith('claude-')) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not set')
    }
    return createProvider({ type: 'anthropic', apiKey, model })
  }

  if (model.startsWith('qwen')) {
    const apiKey = process.env.DASHSCOPE_API_KEY
    if (!apiKey) {
      throw new Error('DASHSCOPE_API_KEY not set')
    }
    return createProvider({
      type: 'dashscope',
      apiKey,
      model,
      baseUrl: process.env.DASHSCOPE_BASE_URL,
    })
  }

  throw new Error(`Unknown model: ${model}`)
}
