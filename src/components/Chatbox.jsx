import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import botImg from "../assets/bot.jpg";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Kodivian Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const toggleChat = () => setIsOpen(!isOpen);

  const responses = [
    { key: ["hi", "hello", "hey"], reply: "Hello 👋 I’m Kodivian Assistant! How can I help you today?" },
    { key: ["scanify"], reply: "Scanify is an AI-powered automation platform that extracts and pushes document data into ERP systems." },
    { key: ["pricing"], reply: "For pricing details 📞 Contact +91 8870435343." },
    { key: ["demo"], reply: "You can schedule a free demo by calling 📞 +91 8870435343." },
    { key: ["job", "career"], reply: "We are hiring 🎉 Send your resume to WhatsApp 📞 +91 8870435343." },
    { key: ["admin"], reply: "" }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();

    if (lowerInput === "admin") {
      navigate("/admin");
      return;
    }

    const found = responses.find((r) =>
      r.key.some((keyword) => lowerInput.includes(keyword))
    );

    const botReply = found
      ? found.reply
      : "Please contact our sales team at 📞 +91 8870435343.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 400);

    setInput("");
  };

  return (
    <>
      {/* 🔵 Floating Chat Icon (Slightly Below Navbar) */}
      <div
        style={{
          position: "fixed",
          bottom: "80px",   // 👈 THIS CONTROLS HEIGHT (Adjust 100–140 if needed)
          right: "10px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={toggleChat}
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            border: "3px solid #6f42c1",
            backgroundColor: "#fff",
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            cursor: "pointer",
          }}
        >
          <img
            src={botImg}
            alt="Chatbot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </button>

        {/* 🟣 Chat Window */}
        {isOpen && (
          <div
            style={{
              marginTop: "15px",
              width: "340px",
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              overflow: "hidden",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #6f42c1, #9b5de5)",
                color: "white",
                padding: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>Kodivian Assistant</strong>
              <span
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={toggleChat}
              >
                ×
              </span>
            </div>

            {/* Messages */}
            <div
              style={{
                height: "300px",
                overflowY: "auto",
                padding: "15px",
                backgroundColor: "#f8f9fa",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: "15px",
                      backgroundColor:
                        msg.sender === "user" ? "#6f42c1" : "#e9ecef",
                      color: msg.sender === "user" ? "white" : "black",
                      maxWidth: "75%",
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                display: "flex",
                padding: "10px",
                borderTop: "1px solid #eee",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#6f42c1",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 15px",
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default Chatbox;
