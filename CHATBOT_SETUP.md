# Chatbot Feature Setup (Zarga)

The IEEE ISIMM SB website now features "Zarga", an AI-powered chatbot assistant.

## Features
- **Knowledge Base (KB)**: Answers questions based on a local JSON database of 30+ IEEE & ISIMM facts.
- **LLM Integration**: Uses Google Gemini to handle complex queries or missing KB info.
- **RAG-lite**: Automatically injects relevant KB entries into the prompt.
- **Secure**: All AI communication happens on the server via `/api/chat`.
- **User Friendly**: Floating widget with message history, typing indicators, and markdown support.

## Prerequisites
- A Google Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/)).

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install @google/generative-ai react-markdown
   ```

2. **Environment Variables**:
   Copy the contents of `env-example.txt` into a new file named `.env` in the root directory.
   Update the `LLM_API_KEY` with your Gemini key.

3. **Verify the API**:
   The backend route is located at `app/api/chat/route.ts`.
   The knowledge base is at `data/ieee_knowledge_tn.json`.

4. **Run the project**:
   ```bash
   npm run dev
   ```

## Functional Tests
- [ ] Click the blue chat bubble (bottom-right).
- [ ] Ask: "What is IEEE?" (Should pull from KB).
- [ ] Ask: "How to join ISIMM SB?" (Should pull from KB).
- [ ] Ask something complex like "Write a welcome message for a new member" (Should use LLM).
- [ ] Test "Clear Chat" and "Copy Answer" icons.
