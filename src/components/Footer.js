import { useEffect, useState, useContext } from "react";
import UserContext from "../lib/UserContext.js";

function Footer() {
  return (
 <div className="flex flex-row text-gray-600 justify-center items-center bg-purple-300 shadow-md">
   Edito @copyright
 </div>
  );
}
export default Footer;
export { Footer };
