# React AI Chatbot Widget

This repository contains the `react-aichatbot-widget` npm package and a platform for local development and testing.

## Project Structure

```
/
├── packages/react-aichatbot-widget/    # NPM package source code
└── /                                   # Test workspace for development
```

## Getting Started

### For Local Development & Testing

If you want to test the package locally, follow these steps:

1. **Install dependencies for the package**
   ```bash
   cd packages
   cd react-aichatbot-widget
   npm install
   ```

2. **Link the package globally**
   ```bash
   npm link
   ```

3. **Go to your testing platform (or root folder)**
   ```bash
   cd ../
   ```

4. **Link the package to your test project**
   ```bash
   npm link react-aichatbot-widget
   ```

5. **Start developing!**
   
   ```bash
   npm install
   ```

### For Production Use

If you want to use this package in your own project:

1. **Install the package from npm**
   ```bash
   npm install react-aichatbot-widget
   ```

2. **Import and use in your project**
   ```javascript
   import { ChatWidget } from 'react-aichatbot-widget';
   
   function App() {
     return (
       <div>
         <ChatWidget 
             //custom attributes
         />
       </div>
     );
   }
   ```

### Unlinking (when done testing)

To unlink the package:

    ```bash
    # In your test project
    npm unlink react-aichatbot-widget

## For production use:

For more information about version requirements, usage examples, visit:

**NPM Package:** [https://www.npmjs.com/package/react-aichatbot-widget](https://www.npmjs.com/package/react-aichatbot-widget)
