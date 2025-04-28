import * as React from "react";
import { cn } from "@/lib/utils";

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TerminalComponent extends React.FC<TerminalProps> {
  Line: typeof TerminalLine;
}

interface TerminalLineProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const TerminalLine = ({ className, children, ...props }: TerminalLineProps) => {
  return (
    <p 
      className={cn("terminal-prefix font-vt323 text-xl", className)} 
      {...props}
    >
      {children}
    </p>
  );
};

const Terminal: TerminalComponent = ({ className, children, ...props }) => {
  return (
    <div className={cn("terminal-container", className)} {...props}>
      {children}
    </div>
  );
};

Terminal.Line = TerminalLine;

export { Terminal };
