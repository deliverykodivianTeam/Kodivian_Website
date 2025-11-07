import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Kodivian Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const responses = [
    { key: ["hi", "hello", "hey"], reply: "Hello 👋 I’m Kodivian Assistant! How can I help you today?" },
    { key: ["what is scanify","scanify" , "about scanify"], reply: "Scanify is an AI-powered automation platform that scans, extracts, validates, and pushes data into ERP systems using AI, OCR, and Machine Learning." },
    { key: ["accuracy", "accurate"], reply: "Scanify achieves 98%+ extraction accuracy using OCR + AI validation, and continuously improves with Machine Learning." },
    { key: ["cloud", "platform", "aws", "azure", "gcp"], reply: "Scanify runs on Google Cloud, Azure, and AWS for AI hosting, secure storage, and scalability." },
    { key: ["how does scanify work", "process"], reply: "Upload any document — Scanify scans, extracts data with AI, validates, and pushes it to your ERP automatically." },
    { key: ["benefits"], reply: "No manual data entry, real-time ERP sync, AI accuracy, global access, and full automation." },
    { key: ["no code", "nocode", "platform"], reply: "Our No-Code Platform lets you build business apps visually without coding — automate workflows and analytics easily." },
    { key: ["features", "capabilities"], reply: "Key features: drag-drop builder, workflow automation, Google Sheets & ERP integration, and real-time dashboards." },
    { key: ["pricing", "cost", "rate"], reply: "Pricing depends on your needs. Please contact our sales team at 📞 +91 8870435343 or WhatsApp the same number." },
    { key: ["contact", "sales", "call"], reply: "You can call or WhatsApp our sales team at 📞 +91 8870435343 for quick assistance!" },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const lowerInput = input.toLowerCase();
    const found = responses.find((r) =>
      r.key.some((keyword) => lowerInput.includes(keyword))
    );

    const botReply = found
      ? found.reply
      : "please contact our sales team at 📞 +91 8870435343.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      <button
        className="btn btn-lg rounded-circle shadow position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          backgroundColor: "#6f42c1",
          color: "white",
          zIndex: 1050,
        }}
        onClick={toggleChat}
      >
        💬
      </button>

      {isOpen && (
        <div
          className="card position-fixed shadow-lg"
          style={{
            bottom: "90px",
            right: "20px",
            width: "320px",
            borderRadius: "20px",
            zIndex: 1050,
          }}
        >
          <div
            className="card-header text-white text-center"
            style={{ backgroundColor: "#6f42c1", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
          >
            Kodivian Assistant
          </div>
          <div
            className="card-body"
            style={{ maxHeight: "300px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-2 rounded-3 ${msg.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={input}
              placeholder="Type your question..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="btn btn-success" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
