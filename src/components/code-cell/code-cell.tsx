import { useEffect } from "react";
import CodeEditor from "../../components/code-editor";
import Preview from "../../components/Preview/Preview";
import Resizable from "../utils/resizable";
import { Cell } from "../state/cell";
import { useActions } from "../Hooks/useActions";
import { useTypedSelector } from "../Hooks/useTypedSelector";
import "./codeCell.css";
// start from 19 -> 12

interface Props {
  cell: Cell;
}

const CodeCell: React.FC<Props> = ({ cell }) => {
  const { updateCell, CreateBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundle) {
      CreateBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      CreateBundle(cell.id, cell.content);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, CreateBundle]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle?.code} err={bundle?.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
