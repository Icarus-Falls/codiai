import { GoogleGenAI } from "@google/genai";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const Learning = () => {
  const [userRequest, setUserRequest] = useState("");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);
  const [isThinking, setIsThinking] = useState(false);
  useEffect(() => {
    const localtopic = JSON.parse(localStorage.getItem("topic") || '""'); // <-- string default
    setTopic(localtopic);

    const localMessages = JSON.parse(localStorage.getItem("messages") || '[]'); // <-- array default
    setMessages(localMessages);
  }, [])




  const handleRequest = async () => {
    if (!topic) {
      return console.log("Select topic first");
    }
    if (!userRequest || userRequest.trim() === "") {
      return console.log("type your question");
    }
    setIsThinking(true); // <-- Show "Thinking..." message

    localStorage.setItem("topic", JSON.stringify(topic));
    const currentRequest = userRequest.trim();
    setUserRequest("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: currentRequest }
    ]);

    const prompt = `
You are an expert ${topic} educator with 10+ years of teaching experience.
Respond to this user request: "${currentRequest}"
If the user is making casual conversation or greeting, respond naturally and conversationally.
For educational requests, provide a clear, structured response following this exact format:

OUTPUT FORMAT REQUIREMENTS:
- Return ONLY valid JSON with no additional text outside the JSON structure.
- Output must be an array containing exactly 1 object.
- The object MUST strictly follow this schema:

{
  "summary": "A concise 4-word headline summary from user question if question is one or two word use your intellegence and make it 4 word",
  "answer": "Your complete response here following the three-part structure below"
}

RESPONSE RULES:
1. "summary" must always be a short, exactly 4-word headline that give user understand what the question is also you can add ... also .
   Example: "DOM and VDOM in javascript"
2. "answer" must always contain three labeled sections in plain text:

EXPLANATION:
Step-by-step breakdown with simple language, assuming no prior knowledge.

EXAMPLE:
A practical, working example with input/output. Use readable text without markdown.

SUMMARY:
A detailed overview covering:
- What (definition)
- When (use cases)
- Where (context/environment)
- Why (benefits/importance)
- How (key methods/approaches)

FORMATTING RULES:
- Use plain text only (no markdown symbols like **, ##, or \`\`\`).
- Separate sections with clear headings.
- Ensure the response directly answers "${currentRequest}".

Remember: The entire response must strictly follow the JSON schema with both "summary" and "answer".`;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      let cleanedResponse = response.text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      console.log("test for response", response.text);
      const aiData = JSON.parse(cleanedResponse);
      const aiItem = Array.isArray(aiData) ? aiData[0] : aiData;
      console.log("this is response", aiItem);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: aiItem.answer || JSON.stringify(aiItem, null, 2) }
      ]);
      setIsThinking(false); // <-- Hide "Thinking..." after AI responds

    } catch (error) {
      console.log(error, "Error to connect with AI");
      setIsThinking(false); // <-- hide "Thinking..." on error
    }
  };

  return (
    <>
      <Navbar />

      {/* Page container to allow footer at the bottom */}
      <div className="flex flex-col min-h-screen relative">


        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-zinc-950 border border-zinc-700 text-white text-sm rounded-md px-4 py-3 focus:border-red-500 outline-none transition-all"
        >
          <option value="" disabled>
            Select Subject
          </option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Python">Python</option>
          <option value="HTML/CSS">HTML/CSS</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>



        {/* Chat messages */}
        <div className="flex justify-center flex-1 overflow-auto">
          <div className="w-full max-w-4xl px-4 py-6 space-y-4 pb-32">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-red-600 text-white rounded-br-md"
                    : "bg-zinc-800 text-white rounded-bl-md"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap bg-zinc-700 text-white rounded-bl-md">
                  Thinking...
                </div>
              </div>
            )}




          </div>
        </div>

        {/* Question input */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-xs uppercase tracking-widest text-zinc-400">

          </label>

        </div>

        {/* Chat input */}
        <div className="flex justify-center p-6 bg-zinc-900/40 border-t border-zinc-800 fixed bottom-0 left-0 w-full z-50">


          <div className="w-full max-w-4xl">
            <div className="relative flex items-end gap-2">
              <textarea
                value={userRequest}
                onChange={(e) => setUserRequest(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), handleRequest())
                }
                placeholder="Ask a technical question..."
                rows={1}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:border-red-500/50 outline-none resize-none transition-all placeholder:text-zinc-700 custom-scrollbar overflow-hidden"
              />
              <button
                onClick={handleRequest}
                className="bg-white text-black h-[52px] px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white disabled:opacity-50 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Footer at the very end */}

      </div>


    </>
  );
};

export default Learning;
