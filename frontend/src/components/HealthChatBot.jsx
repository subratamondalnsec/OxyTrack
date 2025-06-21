import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function HealthChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  // Close chat popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (open && chatRef.current && !chatRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="bg-gradient-to-tr from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-200 border-2 border-white"
          onClick={toggleChat}
        >
          <MessageCircle size={28} />
        </button>
      </div>

      {/* Chat Popup */}
      {open && (
        <div
          className="fixed top-2 right-8 left-auto max-w-[98vw] w-[440px] sm:w-[440px] sm:right-8 sm:left-auto bg-white/95 shadow-2xl border border-blue-200 rounded-2xl p-0 z-50 flex flex-col h-[620px] max-h-[90vh] overflow-hidden transition-all duration-300"
          ref={chatRef}
          style={{ right: '2rem', left: 'auto' }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 rounded-t-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow">
            <h2 className="text-xl font-bold tracking-wide">AI Health Coach</h2>
            <button onClick={() => setOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 px-5 py-4 bg-blue-50/40">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">How can I help you today?</div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "bot" && (
                  <FaRobot className="text-cyan-500 text-xl flex-shrink-0 mb-1" />
                )}
                <div
                  className={`p-2 rounded-xl shadow-sm text-sm break-words max-w-[75%] flex items-center ${
                    msg.type === "user"
                      ? "bg-gradient-to-tr from-blue-200 to-cyan-100 text-blue-900 text-right"
                      : "bg-white text-gray-800 border border-blue-100 text-left"
                  }`}
                  style={{ minWidth: '40px', wordBreak: 'break-word' }}
                >
                  {msg.text}
                </div>
                {msg.type === "user" && (
                  <FaUserCircle className="text-blue-500 text-xl flex-shrink-0 mb-1" />
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 px-5 py-4 bg-white rounded-b-2xl border-t border-blue-100">
            <input
              className="flex-1 border border-blue-200 px-3 py-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder:text-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-gradient-to-tr from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg text-base font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
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
