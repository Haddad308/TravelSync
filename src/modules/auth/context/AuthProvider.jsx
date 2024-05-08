/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

export let auth = createContext();

export default function AuthProvider({ children }) {
  let token = useState(null);
  return <auth.Provider value={token}>{children}</auth.Provider>;
}
