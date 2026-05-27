export interface BatmanQuote {
  text: string
  attribution: string | null
}

export const BATMAN_QUOTES: BatmanQuote[] = [
  { text: "Fear is a tool.", attribution: "— The Apex Protocol" },
  { text: "Discipline over emotion.", attribution: "— System Directive 001" },
  { text: "You become what you train for.", attribution: "— Gotham Axiom" },
  { text: "Pain builds legends.", attribution: "— Apex Core" },
  { text: "The night belongs to the prepared.", attribution: null },
  { text: "Strength is earned in silence.", attribution: "— Dark Knight Principle" },
  { text: "A weak mind quits before the body.", attribution: null },
  { text: "Built in darkness.", attribution: "— Apex Genesis" },
  { text: "Legends are forged alone.", attribution: null },
  { text: "Every rep is a decision to become.", attribution: "— Protocol APEX" },
]

export function getRandomQuote(previousIndex?: number): { quote: BatmanQuote; index: number } {
  let index: number
  do {
    index = Math.floor(Math.random() * BATMAN_QUOTES.length)
  } while (index === previousIndex && BATMAN_QUOTES.length > 1)
  return { quote: BATMAN_QUOTES[index], index }
}
