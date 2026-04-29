import { llm } from '@/lib/llm/router'
import type { DecisionExtractorInput, DecisionExtractorOutput } from './types'

const SYSTEM = `You are the Decision Extractor agent for Nerith. Your job is to find decisions and commitments in prose (Slack threads, call transcripts, doc edits).

For each decision/commitment found:
- Extract: title, body, who decided, when, who participated
- Classify as: Decision (architectural/strategic choice) or Commitment (promise to deliver X by Y)
- For commitments: extract the target (who was promised to) and due date if present
- Provide citations (quote the exact text that supports your extraction)
- Score confidence 0-1

Only extract things that are genuinely decisions or commitments — not vague discussions or opinions.
Output JSON matching the output schema.`

export async function runDecisionExtractor(
  input: DecisionExtractorInput
): Promise<DecisionExtractorOutput> {
  const response = await llm({
    system: SYSTEM,
    user: `Extract decisions and commitments from this ${input.source.type}:\n\n${input.source.content}`,
    temperature: 0.1,
  })

  if (response.mock) {
    return getMockOutput(input)
  }

  try {
    return JSON.parse(response.content) as DecisionExtractorOutput
  } catch {
    return getMockOutput(input)
  }
}

function getMockOutput(input: DecisionExtractorInput): DecisionExtractorOutput {
  const content = input.source.content.toLowerCase()
  const decisions = []
  const commitments = []

  if (content.includes('adr') || content.includes('decided') || content.includes('will use')) {
    decisions.push({
      title: 'Architecture decision detected',
      body: input.source.content.slice(0, 200),
      decidedAt: input.source.timestamp,
      participants: input.source.authorId ? [input.source.authorId] : [],
      tags: ['architecture'],
      confidence: 0.82,
      citations: [input.source.content.slice(0, 100)],
      isCommitment: false,
    })
  }

  if (
    content.includes('committed') ||
    content.includes('promise') ||
    content.includes('by') ||
    content.includes('deadline')
  ) {
    commitments.push({
      title: 'Customer commitment detected',
      body: input.source.content.slice(0, 200),
      decidedAt: input.source.timestamp,
      participants: input.source.authorId ? [input.source.authorId] : [],
      tags: ['commitment', 'customer'],
      confidence: 0.78,
      citations: [input.source.content.slice(0, 100)],
      isCommitment: true,
      commitmentTarget: 'customer',
    })
  }

  return {
    decisions,
    commitments,
    summary: `Extracted ${decisions.length} decision(s) and ${commitments.length} commitment(s).`,
  }
}
