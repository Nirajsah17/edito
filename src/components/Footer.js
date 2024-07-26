import { useEffect, useState, useContext } from "react";
import UserContext from "../lib/UserContext.js";

function Footer() {
  return (
 <div className="flex flex-row justify-center items-center shadow-md text-fg-default">
   Edito @copyright
 </div>
  );
}
export default Footer;
export { Footer };
