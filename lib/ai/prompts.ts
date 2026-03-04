import { z } from 'zod'

// AI Role Definition
const AI_ROLE = `You are an expert AI Product Researcher with 15 years of experience in global markets.

Your expertise includes:
- Discovering opportunities from user complaints, negative reviews, and developer trends
- Identifying overlooked essential needs
- Finding workflows that require 3-5 tools to be stitched together
- Discovering product opportunities where Web is strong but Mobile is weak

Your analysis is based on cross-validation from 10 intelligence sources:
1. Reddit user complaints (100+ communities)
2. App Store negative reviews (1-3 star ratings)
3. SaaS review platforms (G2, Capterra, Trustpilot)
4. Workflow complexity signals
5. Developer ecosystem trends
6. SEO demand signals
7. Content creator workflows
8. Indie developer signals
9. Web strong Mobile weak opportunities
10. New trend signals

Each opportunity must be validated by at least 3 signal sources.`

export const PROMPTS = {
  /**
   * Stage 1: Understanding
   * Understand user input and extract key concepts
   */
  understanding: (input: string) => `${AI_ROLE}

Analyze the following product direction:
"${input}"

Your task is to understand and extract:
1. Key concepts and themes
2. Target user segments
3. Core problems being addressed
4. Market context

Output as JSON:
{
  "key_concepts": ["concept1", "concept2"],
  "target_users": ["segment1", "segment2"],
  "core_problems": ["problem1", "problem2"],
  "market_context": "brief description of the market landscape"
}`,

  /**
   * Stage 2: Analyzing
   * Research market trends and industry dynamics
   */
  analyzing: (context: string) => `${AI_ROLE}

Based on the product understanding:
${context}

Research and analyze:
1. Industry structure and dynamics
2. Market size and growth potential
3. Key players and competitive landscape
4. Technology trends

Output as JSON:
{
  "industry_structure": "description of industry structure",
  "market_size": "estimated market size and growth",
  "key_players": ["player1", "player2"],
  "technology_trends": ["trend1", "trend2"]
}`,

  /**
   * Stage 3: Scanning
   * Detect emerging patterns and opportunity signals (10 signal sources)
   */
  scanning: (direction: string) => `${AI_ROLE}

Scan across 10 intelligence sources for "${direction}":

1. Reddit user complaints (100+ communities)
2. App Store negative reviews (1-3 stars)
3. SaaS review platforms (G2, Capterra, Trustpilot)
4. Workflow complexity signals (Zapier, Make, Airtable templates)
5. Developer ecosystem trends (GitHub, LangChain, HuggingFace)
6. SEO demand signals (Google search intent analysis)
7. Content creator workflows (YouTube, TikTok, Instagram)
8. Indie developer signals (IndieHackers, TAAFT, Product Hunt)
9. Web strong Mobile weak opportunities
10. New trend signals (Exploding Topics, Google Trends)

IMPORTANT: Every field in the JSON output is REQUIRED. Do not omit any field.

Output signal data as JSON:
{
  "categories": [
    {
      "name": "category_name",
      "description": "brief description"
    }
  ],
  "signals": [
    {
      "source": "source_name (required)",
      "description": "signal description (required)",
      "urgency": "high or medium or low (required)",
      "keywords": ["keyword1", "keyword2"]
    }
  ],
  "inspiration_sources": [
    {
      "platform": "platform_name (required)",
      "community": "specific community/thread (required)",
      "pain_point": "the pain point (required)"
    }
  ]
}`,

  /**
   * Stage 4: Generating (batch processing)
   * Generate opportunities in batches (50 per batch)
   */
  generating: (batchNumber: number, totalBatches: number, direction: string, signals: string) => `${AI_ROLE}

Generate batch ${batchNumber} of ${totalBatches} for "${direction}".

Based on the signal analysis:
${signals}

Requirements:
1. Generate 5 UNIQUE AI Native Mobile-First product opportunities
2. Each opportunity must have 3+ signal source cross-validation
3. Each must be:
   - Mobile-first design
   - AI Native (AI is core to the product)
   - Implementable as MVP in 3 months
4. No generic concepts (be specific)
5. Must reference real pain points from signals
6. Focus on underserved niches and specific use cases

Output as JSON array:
[
  {
    "index_number": 1,
    "name": "Specific, catchy product name",
    "core_users": "Specific target user profile (e.g., 'freelance graphic designers with ADHD')",
    "pain_points": "Real pain point with source reference (e.g., 'Reddit/r/freelance: \"I lose track of time...\"')",
    "user_demands": "What users explicitly want or need",
    "ai_solution": "Specific AI-based solution (not just 'AI-powered', but how AI is used)",
    "category": "Specific category (e.g., 'Time Management', 'Content Creation', etc.)",
    "inspiration_source": "Specific community/platform where this pain point was found",
    "signal_count": 3
  }
]`,

  /**
   * Stage 5: Scoring
   * Score each opportunity on 5 dimensions
   */
  scoring: (opportunities: any[]) => `${AI_ROLE}

Score each opportunity on 5 dimensions (0-100):

1. Monetization potential: How easy to monetize and potential revenue
2. Industry size: Total addressable market size
3. Competition: Higher score = MORE competitive (easier market)
4. MVP difficulty: Higher score = HARDER to build
5. Final score: Composite weighted score (monetization 30%, industry 25%, competition inverted 20%, difficulty inverted 25%)

Opportunities:
${JSON.stringify(opportunities, null, 2)}

Output as JSON array with added scores:
[
  {
    ...original fields,
    "monetization_score": 75,
    "industry_size_score": 60,
    "competition_score": 40,
    "mvp_difficulty_score": 50,
    "final_score": 70
  }
]`,

  /**
   * Stage 6: Finalizing
   * Write expert summary and final rankings
   */
  finalizing: (opportunities: any[], direction: string) => `${AI_ROLE}

Generate an expert summary for "${direction}" based on ${opportunities.length} opportunities.

Your summary should include:
1. Industry structure assessment
2. Unmet user needs gaps
3. Core opportunity directions (top 3-5)
4. Risk considerations and challenges

Calculate and include:
- Premium ratio: percentage of opportunities with final_score > 80

Also provide a concise summary text (200-400 words) that captures the essence of the analysis. Be concise and impactful.

Output as JSON:
{
  "summary_text": "Concise expert summary (200-400 words)...",
  "industry_assessment": "Brief assessment of industry structure",
  "unmet_needs": ["need1", "need2"],
  "core_opportunities": ["opp1", "opp2", "opp3"],
  "risks": ["risk1", "risk2"],
  "premium_ratio": 0.0,
  "premium_count": 0
}`,
}

// Zod schemas for validation

// Schema for Generating stage (no scores yet)
export const GeneratingOpportunitySchema = z.object({
  index_number: z.number().optional().default(0),
  name: z.string().min(1),
  core_users: z.string().min(1),
  pain_points: z.string().min(1),
  user_demands: z.string().min(1),
  ai_solution: z.string().min(1),
  category: z.string().optional().default(''),
  inspiration_source: z.string().optional().default(''),
  signal_count: z.number().min(0).optional().default(1),
})

// Schema for Scoring stage (with scores)
export const OpportunitySchema = GeneratingOpportunitySchema.extend({
  monetization_score: z.number().min(0).max(100).optional().default(50),
  industry_size_score: z.number().min(0).max(100).optional().default(50),
  competition_score: z.number().min(0).max(100).optional().default(50),
  mvp_difficulty_score: z.number().min(0).max(100).optional().default(50),
  final_score: z.number().min(0).max(100).optional().default(50),
})

export const UnderstandingOutputSchema = z.object({
  key_concepts: z.array(z.string()).optional().default([]),
  target_users: z.array(z.string()).optional().default([]),
  core_problems: z.array(z.string()).optional().default([]),
  market_context: z.string().optional().default(''),
})

export const AnalyzingOutputSchema = z.object({
  industry_structure: z.string().optional().default(''),
  market_size: z.string().optional().default(''),
  key_players: z.array(z.string()).optional().default([]),
  technology_trends: z.array(z.string()).optional().default([]),
})

export const ScanningOutputSchema = z.object({
  categories: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })),
  signals: z.array(z.object({
    source: z.string(),
    description: z.string(),
    urgency: z.enum(['high', 'medium', 'low']),
    keywords: z.array(z.string()).optional().default([]),
  })),
  inspiration_sources: z.array(z.object({
    platform: z.string(),
    community: z.string(),
    pain_point: z.string(),
  })).optional().default([]),
})

export const FinalizingOutputSchema = z.object({
  summary_text: z.string().min(100).max(5000),
  industry_assessment: z.string().optional().default(''),
  unmet_needs: z.array(z.string()).optional().default([]),
  core_opportunities: z.array(z.string()).optional().default([]),
  risks: z.array(z.string()).optional().default([]),
  premium_ratio: z.number().optional().default(0),
  premium_count: z.number().optional().default(0),
})
