// Used to provide the context for daily mood tracking
import { createContext } from "react";

const dailyContext = createContext({
  done: false,
  setDone: (d) => {},
});

export default dailyContext;
