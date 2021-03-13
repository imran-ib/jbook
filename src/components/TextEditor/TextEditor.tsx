import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";
import { Cell } from "../state";
import { useActions } from "../Hooks/useActions";

interface Props {
  cell: Cell;
}

const TextEditor: React.FC<Props> = ({ cell }) => {
  const [edeting, setEditing] = useState(false);
  const editorRef = useRef(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const Listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        //@ts-ignore
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", Listener, { capture: true });

    return () => {
      document.removeEventListener("click", Listener, { capture: true });
    };
  }, []);

  if (edeting) {
    return (
      <div ref={editorRef} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "click To Edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
