import ReactDOM from "react-dom";
import Payment from "./Payment";

const modelRoot = document.getElementById("portalModel");

const PopupPotal = () => {
  if (true){
    return ReactDOM.createPortal(<Payment />, modelRoot);
  }
  return false
};

export default PopupPotal;
