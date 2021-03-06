import React, { useEffect } from "react";
import Editor, { OnChange, useMonaco } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
// monaco-jsx-highlighter depends on it
import j from "jscodeshift";
import MonacoJSXHighlighter, { JSXTypes } from "monaco-jsx-highlighter";

//css
import "./editor.css";
import "./syntax.css";

interface EditorProps {
  InitialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<EditorProps> = ({ InitialValue, onChange }) => {
  const monaco = useMonaco();

  const handleEditorChange: OnChange = (value, event) => {
    onChange(value!);
  };

  useEffect(() => {
    monaco?.editor.getModels()[0]?.updateOptions({ tabSize: 2 });
  }, [monaco]);

  const onclickFormat = () => {
    // get the current Value
    const unformated = monaco?.editor.getModels()[0].getValue();
    // format that value
    const formated = prettier
      .format(unformated!, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    // set the formated value back in editor
    monaco?.editor.getModels()[0].setValue(formated);
  };
  const DidMount = (editor: any, monoca: any) => {
    // Instantiate the highlighter
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      //@ts-ignore
      window.monaco,
      j,
      editor
    );
    // Enable highlighting
    const highlighterDisposeFunc = monacoJSXHighlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
    // Optional: Disable highlighting when needed (e.g. toggling, unmounting, pausing)
    highlighterDisposeFunc();

    const commentDisposeFunc = monacoJSXHighlighter.addJSXCommentCommand();
    // Optional: Disable JSX commenting when needed (e.g. toggling, unmounting, pausing)
    commentDisposeFunc();
  };

  return (
    <div className="editor-wraper">
      <button
        className="button button-format is-primary is-small"
        onClick={onclickFormat}
      >
        Format
      </button>
      <Editor
        onMount={DidMount}
        onChange={handleEditorChange}
        height="100%"
        value={InitialValue}
        defaultLanguage="javascript"
        defaultValue="// () => `Hello World` "
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
