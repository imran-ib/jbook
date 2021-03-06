import React, { useRef, useEffect } from "react";

interface Props {
  code: string;
}

const Preview: React.FC<Props> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      style={{ backgroundColor: "white" }}
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

const html = `<html>
    <head></head>
    <body>
        <div id="root"></div>
    </body>
    <script>
      window.addEventListener('message' , (event) => {
        try {
          eval(event.data)

        }catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color:red;"> <h4>Runtime Error </h4> ' + err + '</div>' 
          console.error(err);
        }

    },false)
    </script>
  </html>`;

export default Preview;
