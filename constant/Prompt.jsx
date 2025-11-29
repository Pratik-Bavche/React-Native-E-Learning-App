export default {
  IDEA: `
As you are a coaching teacher:
- User wants to learn about the topic
- Generate 5-7 short course titles
- Must match the topic
- Output ONLY JSON ARRAY of strings
- No extra text
  `,

  COURSE: `
You are an expert coaching teacher. Generate course data based ONLY on the selected topic.
OUTPUT MUST BE STRICTLY JSON. NO explanations, NO comments, NO text outside JSON.

Return EXACTLY this structure:

{
  "courseTitle": "",
  "description": "",
  "banner_image": "",
  "category": "",
  "level": "",
  "chapters": [
    {
      "chapterName": "",
      "content": [
        {
          "topic": "",
          "explain": "",
          "code": "",
          "example": ""
        }
      ]
    }
  ],
  "quiz": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "answer": ""
    }
  ],
  "flashcards": [
    {
      "front": "",
      "back": ""
    }
  ],
  "qa": [
    {
      "question": "",
      "answer": ""
    }
  ]
}

RULES:
- Create EXACTLY 1 course.
- Level: ["Easy", "Moderate", "Advanced"].
- Banner: ["/banner1.png","/banner2.png","/banner3.png","/banner4.png","/banner5.png","/banner6.png"].
- Category: ["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"].

CHAPTER RULES:
- Create 3 chapters.
- Each chapter must have 2 content items.
- "explain" must be 3-5 lines.

QUIZ RULES:
- Generate 5 quiz questions.
- Each must have 4 options, and the answer must match one option.

FLASHCARDS:
- Generate 5 flashcards.

Q&A:
- Generate 5 Q&A pairs.

STRICT RULE:
- Output valid JSON ONLY. No markdown, no text outside JSON.
  `
};