// Judge0 language IDs: C = 50, C++ = 54, Java = 62
const LANG_IDS = { c: 50, cpp: 54, java: 62 };

export async function POST(req) {
  const { language, code, stdin } = await req.json();
  const languageId = LANG_IDS[language];

  if (!languageId) {
    return Response.json({ error: "Unsupported language" }, { status: 400 });
  }

  try {
    const res = await fetch(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: stdin || "",
        }),
      }
    );
    const data = await res.json();
    return Response.json({
      stdout: data.stdout,
      stderr: data.stderr,
      compileOutput: data.compile_output,
      status: data.status?.description,
      time: data.time,
    });
  } catch (e) {
    return Response.json({ error: "Judge0 server e connect kora gelo na" }, { status: 500 });
  }
}