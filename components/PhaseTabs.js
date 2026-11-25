"use client";
import { useState } from "react";

const PHASES = [
  { id: "lexical", label: "1. Lexical" },
  { id: "syntax", label: "2. Syntax" },
  { id: "semantic", label: "3. Semantic" },
  { id: "tac", label: "4. Intermediate" },
  { id: "optimize", label: "5. Optimization" },
  { id: "codegen", label: "6. Code Gen" },
];

export default function PhaseTabs({ phases }) {
  const [active, setActive] = useState("lexical");
  const content = phases ? phases[active] : null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {PHASES.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            style={{
              padding: "8px 12px",
              border: "1px solid #444",
              background: active === p.id ? "#2563eb" : "#222",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <pre
        style={{
          background: "#111",
          color: "#ddd",
          padding: 12,
          minHeight: 150,
          overflow: "auto",
          border: "1px solid #444",
          margin: 0,
        }}
      >
        {content || "Run chalale ekhane result dekhabe"}
      </pre>
    </div>
  );
}