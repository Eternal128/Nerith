export type LLMMessage = { role: string; content: string };

const MOCK_COVER_LETTERS = [
  `Hi [Hiring Manager],

I've been using [Company]'s product for about two years now, and I remember the moment it clicked for me - I was debugging a deployment pipeline at 11pm, and your tool cut what would've been a three-hour investigation down to twenty minutes. That's the kind of thing that sticks with you.

I'm a software engineer with five years working across the stack, mostly TypeScript and Go on the backend, React on the front. At my last job I led a team of four through a complete infrastructure migration - moved us off a self-managed Kubernetes cluster onto a managed solution, which reduced our ops overhead by about 60% and let the team actually focus on product work instead of keeping the lights on.

What I'm most interested in at [Company] is the work you're doing on developer tooling. I've read the engineering blog posts on your distributed tracing system and your approach to making complex systems observable - that's exactly the kind of problem I want to be working on.

I'm happy to chat more about any of this. Thanks for reading.

[Name]`,

  `Hi,

When I saw this role come up at [Company], I forwarded it to two colleagues before I even applied. That's probably a good sign about my enthusiasm level.

The short version: I'm a product designer with six years building things at the intersection of complexity and clarity. My last project was redesigning [Previous Company]'s core workflow tool - something 40,000 users touched every day - and we shipped it with a 94% satisfaction score in post-launch surveys, up from 71%. I'm proud of that number, but I'm more proud of the process that got us there: 60+ user interviews, three rounds of prototyping, and a lot of disagreements with the engineering team that I think made the product better.

I noticed [Company] is thinking about [specific product challenge from JD]. That's a problem I've been thinking about a lot lately, and I have some ideas I'd genuinely enjoy walking you through.

Happy to connect whenever.

[Name]`,
];

export function getMockResponse(messages: LLMMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content ?? "";
  const idx = lastMessage.length % MOCK_COVER_LETTERS.length;
  return MOCK_COVER_LETTERS[idx];
}
