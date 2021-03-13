import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
// import CodeCell from "./components/code-cell/code-cell";
import TextEditor from "./components/TextEditor/TextEditor";
import { Provider } from "react-redux";
import { store } from "./components/state";
import CellList from "./components/Cell/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
