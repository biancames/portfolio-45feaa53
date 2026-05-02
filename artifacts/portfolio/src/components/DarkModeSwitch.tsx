interface Props {
  dark: boolean;
  onToggle: () => void;
}

export default function DarkModeSwitch({ dark, onToggle }: Props) {
  return (
    <button
      data-testid="button-dark-mode-toggle"
      onClick={onToggle}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 9998,
        background: "none",
        border: "none",
        cursor: "none",
        padding: 0,
      }}
      aria-label="Toggle dark mode"
    >
      <svg width="48" height="58" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="2" width="28" height="52" rx="8" fill={dark ? "#2C2A1E" : "#FBF7EE"} stroke="#3D4A1E" strokeWidth="2.5"/>
        <rect x="16" y="10" width="16" height="36" rx="5" fill={dark ? "#1A1A14" : "#EDE8DC"} stroke="#3D4A1E" strokeWidth="2"/>
        <rect
          x="18"
          y={dark ? "28" : "12"}
          width="12"
          height="16"
          rx="4"
          fill={dark ? "#3D4A1E" : "#A8CC2C"}
          stroke="#3D4A1E"
          strokeWidth="1.5"
          style={{ transition: "y 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      </svg>
    </button>
  );
}
