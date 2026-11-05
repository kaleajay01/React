export const assessmentCriteria = [
  {
    title: "Depth of Understanding",
    description: "Explains the concept in own words and why it works.",
  },
  {
    title: "Practical Demonstration",
    description: "Runs working Python code and explains lines and output.",
  },
  {
    title: "Problem-Solving Ability",
    description: "Uses real-world examples and discusses edge cases.",
  },
  {
    title: "Content Composition",
    description: "Organizes the video with introduction, explanation, demo, and conclusion.",
  },
  {
    title: "Storytelling Ability",
    description: "Uses relatable scenarios, analogies, or examples.",
  },
  {
    title: "Communication Skills",
    description: "Speaks clearly and uses technical vocabulary.",
  },
  {
    title: "Presentation and Confidence",
    description: "Appears prepared, composed, and comfortable.",
  },
  {
    title: "Visual and Video Quality",
    description: "Ensures audio, code, slides, and screen recording are clear.",
  },
  {
    title: "AI Literacy and Independent Thinking",
    description: "Validates AI-generated content and explains or modifies solutions.",
  },
  {
    title: "Professionalism and Audience Engagement",
    description: "Respects the time limit, credits sources, and ends professionally.",
  },
];

export const getReadiness = (total) => {
  if (total >= 90) return "Mentor-ready";
  if (total >= 75) return "Workplace-ready potential";
  if (total >= 60) return "Developing";
  if (total >= 40) return "Needs guided practice";
  return "Rebuild fundamentals";
};