import ReactDOM from "react-dom";
import Payment from "./Payment";
const modelRoot = document.getElementById("portalModel");

const PopupPotal = () => {
    return ReactDOM.createPortal(<Payment />, modelRoot);
};

export default PopupPotal;
