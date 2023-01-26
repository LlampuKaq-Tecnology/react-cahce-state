# React Cache State

This component adding cache for you app

# How Work?

Add Cache Provider in App Initail

```js
import React from "react";

export default function Index() {
  return (
    <CacheProvider>
      <App />
    </CacheProvider>
  );
}
```

After use hooks for using cache

```js
import React from "react";

export default function Index() {
  const getData = async () => {
    const res = await fetch(api);
    return await res.json();
  };
  const [data, triggerData] = useCache("key", getData);
  return (
    <div>
      {data.map((x) => (
        <div>{x}</div>
      ))}
      <button onClick={triggerData}>update data</button>
      {
        //  or
      }
      <button
        onClick={() => {
          triggerData(data);
        }}
      >
        updatedata
      </button>
    </div>
  );
}
```

When triggerData work two form

1.- When the function is executed without passing parameters it is updated with the function that is sent to useCache
2.- When passing parameters you can send data or a function that returns the data you want to update
