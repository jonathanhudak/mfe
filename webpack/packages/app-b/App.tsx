import * as React from "react";
const Button = React.lazy(() => import("app_a/Button"));

export default function App() {
  return (
    <div>
      <h1>Hello B</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Button>Click me</Button>
      </React.Suspense>
    </div>
  );
}
