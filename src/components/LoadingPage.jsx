import React, { useEffect, useState } from "react";

const BAR_COLORS = [
  "#F2A93B", "#F6C453", "#B7B9BC", "#5B85E0", 
  "#2FB4A6", "#E23FA0", "#7A5FC7", "#79D0E8",
];

const BG_RIBBON_COLORS = [
  ...BAR_COLORS,
  "#E85D3E", "#3EC1D3", "#C05FE0", "#F4D35E", "#5AD69B", "#EE6C9B",
];

const BAR_HEIGHTS = [230, 195, 175, 250, 215, 190, 170, 210];
const BAR_OFFSETS = [20, 45, 65, 5, 25, 50, 70, 30];

const BARS = BAR_COLORS.map((color, i) => ({
  x: 12 + i * 20,
  w: 15,
  h: BAR_HEIGHTS[i],
  y: BAR_OFFSETS[i],
  color,
  from: i % 2 === 0 ? -260 : 260,
  delay: i * 40, // sped up
}));

const VIOLET = "#7A5FC7";

export default function LoadingPage() {
  const [showBars, setShowBars] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowBars(true), 50);
    const t2 = setTimeout(() => setShowText(true), 600); // sped up
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div id="loading-screen" style={styles.page}>
      <div style={styles.bgRibbons} aria-hidden="true">
        {BG_RIBBON_COLORS.map((c, i) => (
          <span
            key={i}
            style={{
              ...styles.bgRibbon,
              background: c,
              left: `${(i * 97) % 100}%`,
              top: `${(i * 53) % 100}%`,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (14 + i * 5)}deg)`,
            }}
          />
        ))}
      </div>

      <div style={styles.stage}>
        <div style={styles.logoWrap}>
          <img
            src="/kodivian-icon.png"
            alt="Kodivian Logo"
            style={{
              height: "220px",
              flexShrink: 0,
              marginRight: "10px", // adjusted for more space between K and o
              opacity: showBars ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          <div
            style={{
              ...styles.textBlock,
              opacity: showText ? 1 : 0,
              transform: showText ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div style={styles.wordmark}>
              {"odivian".split("").map((ch, i) => (
                <span key={i} style={ch === "i" ? { color: VIOLET } : undefined}>
                  {ch}
                </span>
              ))}
            </div>
            <div style={styles.subRow}>
              <span style={styles.techWord}>technologies</span>
              <span style={styles.llp}>LLP</span>
            </div>
            <div style={styles.footRow}>
              <span>ISO 27001</span>
              <span>a 5S GROUP</span>
              <span>www.kodivian.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 99999,
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #FDFDFB 0%, #F6F5F1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  bgRibbons: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  bgRibbon: {
    position: "absolute",
    width: "13px",
    height: "240px",
    borderRadius: "6px",
    opacity: 0.16,
  },
  stage: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    padding: "40px",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "36px 44px",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "260px",
  },
  wordmark: {
    fontSize: "54px",
    fontWeight: 300,
    color: "#1a1a1a",
    letterSpacing: "9px",
    lineHeight: 1,
  },
  subRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "14px",
    marginTop: "2px",
  },
  techWord: {
    fontSize: "16px",
    letterSpacing: "6px",
    color: "#2a2a2a",
    fontWeight: 400,
  },
  llp: {
    fontSize: "13px",
    letterSpacing: "2px",
    color: "#2a2a2a",
    fontWeight: 600,
  },
  footRow: {
    display: "flex",
    gap: "22px",
    marginTop: "10px",
    fontSize: "9px",
    letterSpacing: "0.5px",
    color: "#6b6b6b",
  },
};
