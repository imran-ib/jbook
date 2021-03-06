import { ResizableBox } from "react-resizable";
import "./resizable.css";

interface Props {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<Props> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};
export default Resizable;
