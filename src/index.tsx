import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
// import CodeCell from "./components/code-cell/code-cell";
import TextEditor from "./components/TextEditor/TextEditor";
import { Provider } from "react-redux";
import { store } from "./components/state";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
