import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { generateEmbedding } from "../config/embedding.js";
import mongoose from "mongoose";
export const suggestReplies = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;

    // Reusing same logic as getMessages — last conversation nikalna
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    }).populate("messages");

    if (!conversation || conversation.messages.length === 0) {
      return res.status(200).json({ suggestions: [] });
    }

    // Last 5 messages le lo context ke liye
    let lastMessages = conversation.messages.slice(-5)
      .map(m => `${m.sender.toString() === sender ? "Me" : "Them"}: ${m.message}`)
      .join("\n");

    let prompt = `Given this conversation:\n${lastMessages}\n\nSuggest 3 short, natural replies I could send next. Reply ONLY with a JSON array of 3 strings, nothing else.`;

    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    let data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));
    let rawText = data.candidates[0].content.parts[0].text;

    // LLM kabhi-kabhi ```json``` wrap kar deta hai, clean karo
    let cleanText = rawText.replace(/```json|```/g, "").trim();
    let suggestions = JSON.parse(cleanText);

    return res.status(200).json({ suggestions });
  } catch (error) {
    console.log("AI suggest-replies error:", error.message);
    return res.status(500).json({ message: "Could not generate suggestions" });
  }
};
export const searchMessages = async (req, res) => {
  try {
    // let sender = req.userId;
    // let { receiver } = req.params;
    // let { query } = req.body;
     let sender = new mongoose.Types.ObjectId(req.userId);        // ✅ convert
    let { receiver } = req.params;
    let receiverId = new mongoose.Types.ObjectId(receiver);       // ✅ convert
    let { query } = req.body;
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ message: "Search query required" });
    }

    // Step 1: query ka embedding banao
    let queryEmbedding = await generateEmbedding(query);
    if (!queryEmbedding) {
      return res.status(500).json({ message: "Could not process search query" });
    }

    // Step 2: vector search chalao
    let results = await Message.aggregate([
      {
        $vectorSearch: {
          index: "message_vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 5
        }
      },
      {
        $match: {
          $or: [
            { sender: sender, receiver: receiverId },      // ✅ ab ObjectId se compare ho raha hai
            { sender: receiverId, receiver: sender }
          ]
        }
      },
      {
        $project: {
          message: 1,
          sender: 1,
          receiver: 1,
          createdAt: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ]);

    return res.status(200).json({ results });
  } catch (error) {
    console.log("searchMessages error:", error.message);
    return res.status(500).json({ message: "Search failed" });
  }
};
export const summarizeChat = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    }).populate("messages");

    if (!conversation || conversation.messages.length === 0) {
      return res.status(200).json({ summary: "No messages yet to summarize." });
    }

    // Last 20 messages tak le lo (bahut zyada bhejne se prompt bada ho jaata hai)
    let recentMessages = conversation.messages.slice(-20)
      .map(m => `${m.sender.toString() === sender ? "Me" : "Them"}: ${m.message}`)
      .join("\n");

    let prompt = `Summarize this conversation in 3 short bullet points, focusing on key topics discussed and any decisions or plans made:\n\n${recentMessages}\n\nReply with ONLY the 3 bullet points, no extra text.`;

    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    let data = await response.json();

    if (!response.ok || !data.candidates) {
      console.log("Gemini API error:", JSON.stringify(data));
      return res.status(502).json({ message: "AI service error" });
    }

    let summary = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ summary });
  } catch (error) {
    console.log("summarizeChat error:", error.message);
    return res.status(500).json({ message: "Could not generate summary" });
  }
};