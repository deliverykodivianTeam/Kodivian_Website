import React, { useEffect, useRef, useState, useMemo } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------------------------------------------------
   Token system
   bg:      #FAFAFC   ink base
   panel:   #F3EEFC   lilac panel
   ink:     #1A1225   near-black violet
   brand:   #5B21B6   Kodivian violet
   brandSoft:#7C6FF2  secondary violet
   accent:  #00C48C   signal green ("task complete")
   amber:   #FFB020   scan / warmth
--------------------------------------------------------- */

const STAGES = ["enter", "sales", "closing", "closed", "redirect"];
const DURATIONS = { enter: 300, sales: 1200, closing: 600, closed: 1200 };

const MESSAGES = {
  thanks: { title: "Thank you!", body: "Your Scanify AI demo is booked." },
  sales: { title: "We're on it", body: "Our sales team will reach out to you shortly." },
  email: { title: "Check your inbox", body: "A confirmation email is on its way to you." },
};

export default function ThankYouDemo({ formData }) {
  const [stage, setStage] = useState("enter");
  const [playId, setPlayId] = useState(0);
  const timeouts = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    let elapsed = 0;
    for (let i = 1; i < STAGES.length; i++) {
      elapsed += DURATIONS[STAGES[i - 1]] || 0;
      const key = STAGES[i];
      const t = setTimeout(() => setStage(key), elapsed);
      timeouts.current.push(t);
    }
    return () => timeouts.current.forEach(clearTimeout);
  }, [playId]);

  useEffect(() => {
    if (stage === "redirect") {
      navigate("/");
    }
  }, [stage, navigate]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 1.3,
        size: 5 + Math.random() * 7,
        color: ["#5B21B6", "#00C48C", "#FFB020", "#7C6FF2"][i % 4],
        rotate: Math.random() * 360,
      })),
    [playId]
  );

  const modalOpen = stage !== "closed" && stage !== "redirect";
  const msgKey = "sales";
  const showConfetti = stage === "sales";
  const showEnvelope = false;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '600px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
        background: "linear-gradient(135deg,#FAFAFC 0%,#F3EEFC 100%)",
        borderRadius: '16px'
      }}
    >
      <style>{`
        @keyframes bounceIn {
          0% { transform: translateY(40px) scale(0.6); opacity: 0; }
          55% { transform: translateY(-8px) scale(1.05); opacity: 1; }
          75% { transform: translateY(4px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes waveArm {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-24deg); }
          50% { transform: rotate(-4deg); }
          75% { transform: rotate(-20deg); }
        }
        @keyframes scanEye {
          0%, 100% { top: 28%; opacity: .55; }
          50% { top: 62%; opacity: 1; }
        }
        @keyframes blinkDot {
          0%, 100% { opacity: 1; }
          50% { opacity: .25; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.85) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.85) translateY(12px); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(220px) rotate(360deg); opacity: 0; }
        }
        @keyframes flyEnvelope {
          0% { transform: translate(-14px, 10px) scale(0.6) rotate(-8deg); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translate(0,0) scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shrinkBar {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes ringPulseThanks {
          0% { box-shadow: 0 0 0 0 rgba(91,33,182,0.25); }
          100% { box-shadow: 0 0 0 16px rgba(91,33,182,0); }
        }
      `}</style>

      {/* mock page behind the modal, to sell the "popup" framing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '96px',
          paddingLeft: '24px',
          paddingRight: '24px',
          transition: 'all 0.3s',
          filter: modalOpen ? "blur(2px)" : "none",
          opacity: modalOpen ? 0.55 : 1
        }}
      >
        <div style={{ width: '100%', maxWidth: '448px', borderRadius: '16px', background: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #EDE7FB', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: "#00C48C" }} />
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: "#7C6FF2", letterSpacing: "0.08em" }}>
              Booking status
            </span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: "#1A1225" }}>
            Demo booked with Scanify AI
          </h2>
          <p style={{ fontSize: '14px', color: "#6B647E", margin: 0 }}>
            {formData?.company || "Company"} · {formData?.designation || "Designation"} · Confirmation sent to {formData?.email || "email"}
          </p>
        </div>

        {!modalOpen && (
          <div
            style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px', borderRadius: '9999px', background: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #EDE7FB', animation: "fadeSlide .5s ease" }}
          >
            <CheckCircle2 size={16} color="#00C48C" />
            <span style={{ color: "#1A1225" }}>All set — see you at the demo</span>
          </div>
        )}
      </div>

      {/* backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transition: 'opacity 0.3s',
          background: "rgba(26,18,37,0.35)",
          backdropFilter: "blur(1px)",
          opacity: modalOpen ? 1 : 0,
          pointerEvents: modalOpen ? "auto" : "none",
        }}
      />

      {/* modal */}
      {modalOpen && (
        <div
          key={playId}
          style={{
            position: 'relative',
            width: '92%',
            maxWidth: '384px',
            borderRadius: '24px',
            background: '#ffffff',
            padding: '40px 28px 28px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: "0 24px 60px -12px rgba(26,18,37,0.35)",
            animation: `${stage === "closing" ? "cardOut" : "cardIn"} 0.3s cubic-bezier(.22,1,.36,1) forwards`,
          }}
        >
          {/* confetti */}
          {showConfetti &&
            confetti.map((c) => (
              <span
                key={c.id + "-" + playId}
                style={{
                  position: 'absolute',
                  top: '8px',
                  borderRadius: '2px',
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size,
                  background: c.color,
                  animation: `fall ${c.duration}s ease-in ${c.delay}s infinite`,
                  transform: `rotate(${c.rotate}deg)`,
                }}
              />
            ))}

          {/* mascot */}
          <div style={{ position: 'relative', width: '112px', height: '112px', marginBottom: '8px', animation: "bounceIn 0.4s cubic-bezier(.22,1,.36,1) both" }}>
            <div style={{ position: 'absolute', inset: 0, animation: "floatBob 2s ease-in-out infinite" }}>
              {/* shadow */}
              <div
                style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', width: 60, height: 10, background: "rgba(91,33,182,0.15)", filter: "blur(2px)" }}
              />
              {/* body */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: "linear-gradient(160deg,#7C6FF2,#5B21B6)",
                  borderRadius: "42% 58% 55% 45% / 55% 45% 55% 45%",
                  boxShadow: "inset 0 -8px 14px rgba(0,0,0,0.12)",
                }}
              />
              {/* antenna */}
              <div
                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: -10, width: 3, height: 16, background: "#5B21B6", borderRadius: 2 }}
              />
              <div
                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', top: -16, width: 8, height: 8, background: "#00C48C", animation: "blinkDot 1.4s ease-in-out infinite" }}
              />
              {/* left eye (normal) */}
              <div
                style={{ position: 'absolute', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', top: "38%", left: "26%", width: 22, height: 22 }}
              >
                <div style={{ borderRadius: '50%', width: 9, height: 9, background: "#1A1225" }} />
              </div>
              {/* right eye (scanner visor) */}
              <div
                style={{ position: 'absolute', borderRadius: '6px', overflow: 'hidden', background: '#ffffff', top: "34%", right: "22%", width: 26, height: 26, border: "2px solid #1A1225" }}
              >
                <div
                  style={{ position: 'absolute', left: 0, right: 0, height: 3, background: "#00C48C", animation: "scanEye 1.3s ease-in-out infinite" }}
                />
              </div>
              {/* waving arm */}
              <div
                style={{
                  position: 'absolute',
                  transformOrigin: 'top right',
                  borderRadius: '50%',
                  top: "48%",
                  right: -6,
                  width: 9,
                  height: 26,
                  background: "#7C6FF2",
                  animation: stage === "thanks" ? "waveArm 0.9s ease-in-out infinite" : "none",
                }}
              />
            </div>
          </div>

          {/* speech content */}
          <div key={msgKey} style={{ animation: "fadeSlide .3s ease both" }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', color: "#1A1225", fontFamily: "'Outfit', sans-serif" }}>
              {MESSAGES[msgKey].title}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: "#6B647E", margin: 0 }}>
              {MESSAGES[msgKey].body}
            </p>
          </div>

          {/* envelope flourish for the email stage */}
          {showEnvelope && (
            <div
              style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', background: "#F3EEFC", animation: "flyEnvelope .5s cubic-bezier(.22,1,.36,1) both" }}
            >
              <Mail size={16} color="#5B21B6" />
              <span style={{ fontSize: '12px', fontWeight: '500', color: "#5B21B6" }}>
                sent to your email
              </span>
            </div>
          )}

          {/* progress dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '24px' }}>
            {["thanks", "sales", "email"].map((k) => (
              <span
                key={k}
                style={{
                  borderRadius: '9999px',
                  transition: 'all 0.3s',
                  width: msgKey === k ? 18 : 6,
                  height: 6,
                  background: STAGES.indexOf(stage) >= STAGES.indexOf(k) ? "#5B21B6" : "#E4DEF6",
                }}
              />
            ))}
          </div>

          {/* closing progress bar */}
          {stage === "closing" && (
            <div style={{ width: '100%', marginTop: '20px', height: '4px', borderRadius: '9999px', overflow: 'hidden', background: "#F3EEFC" }}>
              <div style={{ height: '100%', borderRadius: '9999px', background: "#00C48C", animation: "shrinkBar 0.6s linear forwards" }} />
            </div>
          )}
          {stage === "closing" && (
            <p style={{ marginTop: '8px', fontSize: '11px', letterSpacing: '0.025em', color: "#A79FC2", margin: '8px 0 0 0' }}>
              closing automatically…
            </p>
          )}
        </div>
      )}
    </div>
  );
}
