"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import PhaseTabs from "../components/PhaseTabs";

const TEMPLATES = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}\n`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}\n`,
};

export default function Home() {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState(TEMPLATES.c);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phases, setPhases] = useState(null);

  function changeLanguage(lang) {
    setLanguage(lang);
    setCode(TEMPLATES[lang]);
  }

  async function run() {
    setLoading(true);
    setOutput("Running...");

    // Dummy data: porer step gulote real data diye replace korbo
    setPhases({
      lexical: "Token list ekhane ashbe",
      syntax: "Parse tree ekhane ashbe",
      semantic: "Symbol table ekhane ashbe",
      tac: "Three Address Code ekhane ashbe",
      optimize: "Optimized code ekhane ashbe",
      codegen: "Generated code ekhane ashbe",
    });

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, stdin }),
      });
      const d = await res.json();
      if (d.error) setOutput(d.error);
      else setOutput(d.compileOutput || d.stderr || d.stdout || `(${d.status})`);
    } catch {
      setOutput("Request fail hoyeche");
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button onClick={run} disabled={loading}>
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      <Editor
        height="50vh"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(v) => setCode(v || "")}
      />

      <h4>Input (stdin)</h4>
      <textarea
        rows={3}
        style={{ width: "100%" }}
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
      />

      <h4>Output</h4>
      <pre style={{ background: "#111", color: "#0f0", padding: 12, minHeight: 80 }}>
        {output}
      </pre>

      <h4>Compiler Phases</h4>
      <PhaseTabs phases={phases} />
    </main>
  );
}