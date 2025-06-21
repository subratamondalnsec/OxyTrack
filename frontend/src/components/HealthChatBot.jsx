import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const backendUrl=import.meta.env.VITE_BACKEND_URL;

export default function HealthChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(`${backendUrl}/api/chat`, {
        message: input,
        language: "English",
      });

      const botMsg = { type: "bot", text: res.data.reply };
      console.log(botMsg);
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { type: "bot", text: "Sorry, I couldn’t respond right now." };
      setMessages((prev) => [...prev, errorMsg]);
      console.log(err);
    }
  };

  return (
    <div>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          onClick={toggleChat}
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl p-4 z-50 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-blue-600">AI Health Coach</h2>
            <button onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mb-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[90%] ${
                  msg.type === "user"
                    ? "bg-blue-100 self-end text-right ml-auto"
                    : "bg-gray-100 self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border px-2 py-1 rounded-md text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
