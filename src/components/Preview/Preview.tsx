import React, { useRef, useEffect } from "react";
import "./preview.css";

interface Props {
  code: string;
  err: string;
}

const Preview: React.FC<Props> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="previw-error">{err}</div>}
    </div>
  );
};

const html = `<html>
    <head>
    <style> html {background-color: white} </style>
    </head>
    <body>
        <div id="root"></div>
    </body>
    <script>
    const handleError = (err) =>{
    const root = document.querySelector("#root");
    root.innerHTML =
      '<div style="color:red;"> <h4>Runtime Error </h4> ' + err + "</div>";
    console.error(err);
}
      window.addEventListener('error' , (event)=>{
        event.preventDefault()
        handleError(event.error)
      
      })

      window.addEventListener('message' , (event) => {
        try {
          eval(event.data)
        }catch (err) {
          handleError(err)
        }

    },false)
    </script>
  </html>`;

export default Preview;

// window.addEventListener('error' , (event)=>{console.log(event)})
