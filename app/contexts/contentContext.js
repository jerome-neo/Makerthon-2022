// Used to provide the context for daily mood tracking
import { createContext } from "react";

const contentContext = createContext({
  content: [],
  setContent: (d) => {},
});

export default contentContext;
