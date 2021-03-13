import { useState, useEffect } from "react";
import CodeEditor from "../../components/code-editor";
import Preview from "../../components/Preview/Preview";
import bundel from "../../components/bundler/index";
import Resizable from "../utils/resizable";
import { Cell } from "../state/cell";
import { useActions } from "../Hooks/useActions";

interface Props {
  cell: Cell;
}

const CodeCell: React.FC<Props> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundel(cell.content);
      setCode(output.code);
      setErr(output.error);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            InitialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
