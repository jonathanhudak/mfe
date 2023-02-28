import * as React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        fontSize: "2rem",
        backgroundColor: "limegreen",
        padding: "1rem",
      }}
    >
      {children}
    </button>
  );
}
