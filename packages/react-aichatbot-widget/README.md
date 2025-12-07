# React AI Chatbot Widget

A React chatbot widget using **React**, **Axios**, and **Lucide Icons**.

---

## Installation

### Step 1: Install the Widget

```bash
npm install react-aichatbot-widget
```

> `axios` is included with the widget and does not need to be installed separately.

### Step 2: Install Peer Dependencies

```bash
npm install react react-dom tailwindcss lucide-react
```

> Ensure versions match your project.

| Package        | Version  |   |         |
| -------------- | -------- | - | ------- |
| `react`        | ^18.0.0  |   | ^19.0.0 |
| `react-dom`    | ^18.0.0  |   | ^19.0.0 |
| `tailwindcss`  | ^4.1.17  |   |         |
| `lucide-react` | ^0.554.0 |   |         |
| `axios`        | ^1.6.0   |   |         |

---

## Usage Example

```jsx
import React from "react";
import ChatBotWidget from "react-aichatbot-widget";

function App() {
  return (
    <div className="App">
    {/*add a namespace for chatbot and chatbot url*/}
      <ChatBotWidget 
        pineconeNamespace=''
        url=''
        chatMessageUrl=''
        primaryColor=""       // hex color code
        secondaryColor=""     // hex color code
        fontColor=""          // hex color code
        backgroundColor=""    // hex color code
        position=""           // left or right
        name=""               // any name
        subTitle=""           // any subtitle
        welcomeText=""        // any welcome text 
      />
    </div>
  );
}

export default App;
```

---

## Notes

* `axios` is bundled; no extra installation required.
* TailwindCSS is required if you want to customize styles.
* React and ReactDOM must match the versions listed above.
