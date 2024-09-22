function App() {
  const handleClick = () => {
    // Sending message to content script to insert button
    chrome.runtime.sendMessage({ command: "insertButton" });
  };

  return (
    <div className="relative ">
      <div className="hidden absolute top-10 z-50 right-10 bg-green-500 px-4 py-1 text-white"></div>
      <h1>LinkedIn Button Inserter</h1>
      <button onClick={handleClick}>Insert Button</button>
    </div>
  );
}

export default App;
