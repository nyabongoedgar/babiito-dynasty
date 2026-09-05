import { createTheme } from "@mui/material/styles";

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#E2C96A";
const OBSIDIAN = "#0B0F19";
const NAVY = "#0F172A";
const NAVY_CARD = "#161D30";
const NAVY_ELEVATED = "#1E2A45";
const CREAM = "#F1F5F9";
const CREAM_MUTED = "#94A3B8";

export const royalTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: OBSIDIAN, paper: NAVY_CARD },
    primary: { main: GOLD, light: GOLD_LIGHT, dark: "#A8892B", contrastText: "#0B0F19" },
    secondary: { main: NAVY_ELEVATED, contrastText: CREAM },
    text: { primary: CREAM, secondary: CREAM_MUTED },
    divider: "rgba(212,175,55,0.18)",
    error: { main: "#EF4444" },
    success: { main: "#22C55E" },
  },
  typography: {
    fontFamily: "'EB Garamond', Georgia, serif",
    h1: { fontFamily: "'Cinzel', serif", fontWeight: 700, letterSpacing: "0.04em" },
    h2: { fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: "0.03em" },
    h3: { fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: "0.02em" },
    h4: { fontFamily: "'Cinzel', serif", fontWeight: 500 },
    h5: { fontFamily: "'Cinzel', serif", fontWeight: 500 },
    h6: { fontFamily: "'Cinzel', serif", fontWeight: 500 },
    subtitle1: { fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.05rem" },
    body1: { fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.05rem", lineHeight: 1.7 },
    body2: { fontFamily: "'EB Garamond', Georgia, serif", fontSize: "0.95rem", lineHeight: 1.6 },
    caption: { fontFamily: "'EB Garamond', Georgia, serif", letterSpacing: "0.08em", textTransform: "uppercase" as const },
    button: { fontFamily: "'Cinzel', serif", letterSpacing: "0.06em", fontWeight: 500 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: OBSIDIAN,
          scrollbarWidth: "thin",
          scrollbarColor: `${GOLD}33 transparent`,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: `${GOLD}44`, borderRadius: 3 },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid rgba(212,175,55,0.12)`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 2, textTransform: "none" as const },
        containedPrimary: {
          background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
          color: OBSIDIAN,
          fontWeight: 600,
          "&:hover": { background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)` },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "'EB Garamond', Georgia, serif", letterSpacing: "0.04em" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontFamily: "'EB Garamond', Georgia, serif" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: NAVY, borderLeft: `1px solid rgba(212,175,55,0.2)` },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundColor: NAVY, border: `1px solid rgba(212,175,55,0.25)` },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(212,175,55,0.25)" },
            "&:hover fieldset": { borderColor: "rgba(212,175,55,0.5)" },
            "&.Mui-focused fieldset": { borderColor: GOLD },
          },
          "& .MuiInputLabel-root.Mui-focused": { color: GOLD },
        },
      },
    },
  },
});

export const ERA_COLORS = {
  Foundational: { bg: "rgba(212,175,55,0.12)", text: "#D4AF37", border: "rgba(212,175,55,0.4)" },
  "Imperial Expansion": { bg: "rgba(99,102,241,0.12)", text: "#818CF8", border: "rgba(99,102,241,0.4)" },
  "Modern State": { bg: "rgba(34,197,94,0.1)", text: "#4ADE80", border: "rgba(34,197,94,0.3)" },
};
