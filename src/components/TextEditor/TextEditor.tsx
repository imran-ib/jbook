import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.css";

interface Props {}

const TextEditor: React.FC<Props> = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  const [edeting, setEditing] = useState(false);
  const editorRef = useRef(null);

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
        <MDEditor value={value} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor">
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default TextEditor;
