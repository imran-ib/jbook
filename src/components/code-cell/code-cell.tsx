import { useState } from "react";
import CodeEditor from "../../components/code-editor";
import Preview from "../../components/Preview/Preview";
import bundel from "../../components/bundler/index";
import Resizable from "../utils/resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const OnClick = async () => {
    const output = await bundel(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <CodeEditor
          InitialValue="const Greet = () => `Hello World`"
          onChange={(value) => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
