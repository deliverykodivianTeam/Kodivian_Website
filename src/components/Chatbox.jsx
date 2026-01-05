import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // <-- ADDED
import "bootstrap/dist/css/bootstrap.min.css";
import botImg from "../assets/bot.jpg";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Kodivian Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const navigate = useNavigate(); // <-- ADDED

  const toggleChat = () => setIsOpen(!isOpen);
const responses = [
  { key: ["hi", "hello", "hey", "hai", "hii", "hola","oii","oi"], reply: "Hello 👋 I’m Kodivian Assistant! How can I help you today?" },

  { key: ["what is scanify", "scanify", "about scanify", "explain scanify", "tell me about scanify"], 
    reply: "Scanify is an AI-powered automation platform that scans, extracts, validates, and pushes document data into ERP systems using AI, OCR, and Machine Learning."
  },

  { key: ["accuracy", "accurate", "ocr accuracy", "scanify accuracy"], 
    reply: "Scanify achieves 98%+ extraction accuracy with AI-based validation and continuous machine learning improvement."
  },

  { key: ["cloud", "platform", "aws", "azure", "gcp", "cloud platform", "cloud hosting"], 
    reply: "Scanify runs securely on Google Cloud, Azure, and AWS — offering high availability, scalability, and enterprise-grade security."
  },

  { key: ["how does scanify work", "process", "workflow", "how it works"], 
    reply: "Simply upload any document. Scanify extracts data using AI+OCR, validates fields, and pushes the final data to your ERP automatically."
  },

  { key: ["benefits", "advantages", "why scanify", "what are benefits"], 
    reply: "🔥 Benefits of Scanify: No manual entry, 98% accuracy, faster processing, ERP automation, global access, and improved operational efficiency."
  },

  { key: ["no code", "nocode", "platform", "app builder", "no code builder"], 
    reply: "Our No-Code Platform lets you build business apps visually with drag-and-drop components — no programming required."
  },

  { key: ["features", "capabilities", "functions", "what can scanify do"], 
    reply: "Scanify includes OCR-AI extraction, workflow automation, no-code app builder, ERP/Google Sheets integration, dashboards, and real-time monitoring."
  },

  { key: ["pricing", "cost", "rate", "plans", "fees", "subscription"], 
    reply: "Pricing varies based on features and document volume. Contact 📞 +91 8870435343 for a personalized quote."
  },

  { key: ["contact", "sales", "call", "help", "support", "reach", "speak"], 
    reply: "You can call or WhatsApp our support team anytime: 📞 +91 8870435343."
  },

  { key: ["documents", "supported documents", "what documents", "file types"], 
    reply: "Scanify supports invoices, purchase orders, receipts, challans, bills, ID proofs, forms, PDFs, JPEG/PNG images, and more."
  },

  { key: ["erp", "tally", "sap", "oracle", "netsuite", "zoho"], 
    reply: "Scanify integrates with major ERPs like SAP, Oracle, Tally, Zoho, NetSuite, and custom ERP systems via API."
  },

  { key: ["security", "secure", "data protection", "safe"], 
    reply: "Your data is protected with encryption, secure cloud storage, access control, and GDPR-compliant security policies."
  },

  { key: ["demo", "show demo", "demo request", "want demo"], 
    reply: "Sure! You can request a live demo by calling or messaging: 📞 +91 8870435343."
  },

  { key: ["integration", "api", "connect", "third party"], 
    reply: "Scanify supports API integration for ERPs, CRMs, databases, Google Sheets, email, and custom platforms."
  },

  { key: ["time", "processing time", "speed", "fast"], 
    reply: "Scanify processes documents in seconds with high accuracy using optimized AI models."
  },

  /* 🔥🔥 NEW — Job Vacancy Section 🔥🔥 */
  { 
    key: [
      "job", "jobs", "vacancy", "job vacancy", "careers", "career", 
      "hiring", "hire", "opening", "openings", "job openings", 
      "apply", "apply job", "internship", "join team", "work with you", 
      "recruitment", "hr", "want job", "job available?"
    ],
    reply: "Yes! We are hiring 🎉. You can send your resume to 📧 WhatsApp: +91 8870435343. Our HR team will contact you if there's a match."
  },

{
  key: [
    "internship", "intern", "intern openings", "student internship",
    "apply internship", "internship available", "looking for internship"
  ],
  reply: "Yes! We offer internships to students and freshers 🙌. Please note: **This is an unpaid internship (no payment)**. Send your resume to WhatsApp 📧 +91 8870435343 and our HR team will contact you."
},
  { key: ["what is support forge", "support forge", "about support forge", "ticketing system", "ticketing tool"], 
    reply: "Support Forge is an intelligent Ticketing Management System designed to manage service requests, approvals, escalations, and task resolutions efficiently."
  },
  {
  key: [
    "thank", "thanks", "thank you", "thankyou",
    "nice", "good", "great", "awesome", "cool", "perfect"
  ],
  reply: "You're welcome! 😊 Happy to help!"
},

  { key: ["admin", "Admin"], reply: "" }, // handled separately
];


  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const lowerInput = input.toLowerCase();

    // 🚀 **ADMIN REDIRECT**
    if (lowerInput === "admin") {
      navigate("/admin");
      return;
    }

    // Normal replies
    const found = responses.find((r) =>
      r.key.some((keyword) => lowerInput.includes(keyword))
    );

    const botReply = found
      ? found.reply
      : "please contact our sales team at 📞 +91 8870435343.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 400);

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="btn btn-lg rounded-circle shadow position-fixed p-0 border-0"
        style={{
          bottom: "20px",
          right: "20px",
          width: "65px",
          height: "65px",
          backgroundColor: "transparent",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1050,
        }}
        onClick={toggleChat}
      >
        <img
          src={botImg}
          alt="Chatbot"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #6f42c1",
            backgroundColor: "white",
          }}
        />
      </button>

      {/* Chatbox Window */}
      {isOpen && (
        <div
          className="card position-fixed shadow-lg border-0"
          style={{
            bottom: "90px",
            right: "20px",
            width: "320px",
            borderRadius: "20px",
            zIndex: 1050,
          }}
        >
          {/* Header */}
          <div
            className="card-header d-flex align-items-center justify-content-between text-white"
            style={{ backgroundColor: "#6f42c1", borderRadius: "20px 20px 0 0" }}
          >
            <div className="d-flex align-items-center">
              <img
                src={botImg}
                alt="Bot"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              <strong>Kodivian Assistant</strong>
            </div>

            <button
              onClick={toggleChat}
              className="btn btn-sm text-white border-0"
              style={{ background: "transparent", fontSize: "20px" }}
            >
              ×
            </button>
          </div>

          {/* Chat Body */}
          <div
            className="card-body"
            style={{ maxHeight: "300px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={botImg}
                    alt="Bot"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                )}
                <div
                  className={`p-2 rounded-3 ${
                    msg.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="card-footer d-flex bg-white border-top">
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