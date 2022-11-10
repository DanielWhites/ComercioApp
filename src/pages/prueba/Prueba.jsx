import React, { useState, useEffect, useLayoutEffect } from "react";

export const Prueba = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`Prueba ${count}`)
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
