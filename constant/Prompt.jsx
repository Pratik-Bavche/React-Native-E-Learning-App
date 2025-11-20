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
You are an expert coaching teacher.

Generate course data based ONLY on the selected topics.
Output MUST BE valid JSON ONLY.  
NO text outside JSON.  
NO comments.  
NO placeholder symbols like < >.

The JSON STRUCTURE MUST BE:
// NOTE: We are generating only ONE course and simplifying the structure to improve reliability.
// We have temporarily removed Quiz, Flashcards, and QA sections.

{
  "courseTitle": "",
  "description": "",
  "banner_image": "",
  "category": "",
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
  ]
}

RULES:
- Create EXACTLY 1 course.
- The course must have 3–5 chapters. (Reduced from 5-8)
- Each chapter must have 2–4 content items. (Reduced from 3-6)
- “explain” must be 3–5 lines. (Reduced from 5-8)
- “code” only if relevant, else "".
- “example” only if relevant, else "".
- banner_image must be EXACTLY one of:
  ["/banner1.png","/banner2.png","/banner3.png","/banner4.png","/banner5.png","/banner6.png"]
- category must be one of:
  ["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
- Output valid JSON only.
`
};