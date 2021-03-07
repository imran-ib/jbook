import { useState, useEffect } from "react";
import CodeEditor from "../../components/code-editor";
import Preview from "../../components/Preview/Preview";
import bundel from "../../components/bundler/index";
import Resizable from "../utils/resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundel(input);
      setCode(output.code);
      setErr(output.error);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            InitialValue="const Greet = () => `Hello World`;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;
