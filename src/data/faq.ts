// Visible FAQ copy, reused as FAQPage JSON-LD (HTML stripped in landing.astro).
export interface FaqItem {
  question: string;
  answers: string[];
}

export const faqs: FaqItem[] = [
  {
    question: "When does Fifth Wheel launch in Atlanta?",
    answers: [
      "Fifth Wheel is a new social dining experience launching in Atlanta this November. Our first tables open on November with intentionally limited seating as we introduce Fifth Wheel one table at a time.",
      "Register today for Founder Access to be among the first invited to upcoming tables, neighborhoods, and experience founder perks before dates are released more broadly. Such as free appetizers, swag, and other fun events.",
    ],
  },
  {
    question: "How does Fifth Wheel decide who sits at my table?",
    answers: [
      "Tables are intentionally curated rather than randomly assigned. A Fifth Wheel coordinator considers things like your age range, availability, preferred neighborhood, and the overall conversational balance of the group. There’s no promise you’ll be attracted to anyone but the goal is to create a table worth showing up for.",
    ],
  },
  {
    question: "What ages can participate?",
    answers: [
      "Fifth Wheel is for adults 21+, with the experiences organized around compatible age ranges and profile preferences. The current booking experience should offer age bands extending beyond 46+, including 46–51, 51–56, 56–61, and 61–65.",
    ],
  },
  {
    question: "Is it awkward to be the “Fifth Wheel”?",
    answers: [
      "Everyone is the fifth wheel. You’re not walking into someone else’s date. You’re joining four other people who showed up for the same reason: to meet someone new. There’s a little uncertainty built into the night, and that’s part of the fun. Fifth Wheel is designed to make that edge feel playful, social, and low pressure.",
    ],
  },
  {
    question: "When do I vote and what happens?",
    answers: [
      "The current trigger for voting is 90 minutes after the event begins. You privately indicate who, if anyone, you’d like to share dessert with. Your vote stays anonymous unless the interest is mutual. If you match, Fifth Wheel introduces the two of you. If you don’t, nobody at the table learns how you voted.",
    ],
  },
  {
    question: "What if I don’t like anyone at my table?",
    answers: [
      "There is no obligation to make a connection that isn’t there. You still met four new people, experienced several local venues, and hopefully had a good dinner.",
    ],
  },
  {
    question: "How does booking work, and how far ahead should I plan?",
    answers: [
      "Tables open 7 days in advance. When we find a table that fits, you’ll receive an invitation with the details and a deadline to claim your seat.",
      "Accept and pay to confirm your spot. Invitations expire when the table fills, or when the claim window closes.",
    ],
  },
  {
    question: "What happens if I need to cancel or someone else cancels?",
    answers: [
      "Cancel 24+ hours ahead and the reservation fee is fully refunded; cancel 6–24 hours ahead and 50% is refunded; within 6 hours the fee is non-refundable. If someone else drops out, Fifth Wheel may bring in a curated substitute, proceed with four guests, or cancel the experience if there are less than 3 participants. If Fifth Wheel cancels the evening, guests receive a full reservation-fee refund or the option to attend a future evening at no additional cost.",
    ],
  },
  {
    question: "What does my $25 reservation actually include and what do I pay for that night?",
    answers: [
      "The $25 fee covers curation, identity verification, coordination with the venues, reserved space, and the Fifth Wheel experience, including voting. Food and drinks aren’t included; everyone pays their own restaurant/bar tabs, tax, gratuity, transportation, and parking.",
    ],
  },
  {
    question: "What if I feel uncomfortable or someone behaves inappropriately?",
    answers: [
      "If you feel uncomfortable or unsafe, you may leave the experience at any time. If you believe you are in immediate danger, call 911 or local emergency services.",
      "All participants are required to complete identity verification. Verification confirms biometric selfies to video. This is not a criminal background check, sex offender registry search, or assessment of a participant’s character, intentions, or safety.",
    ],
  },
  {
    question: "How do I provide feedback?",
    answers: [
      "At the end of the evening each guest will receive a short survey. We’d love to hear what worked, what didn’t, and anything that could make your next Fifth Wheel experience even better.",
      'You can also reach out to us directly anytime at <a href="mailto:hello@5thwheel.app">hello@5thwheel.app</a>. If you have a concern during an evening, please contact your Fifth Wheel coordinator directly.',
    ],
  },
];
