"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "../../components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
}
