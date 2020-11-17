console.info("Background script online");

let contentPort;

// Listen for content script connection requests
browser.runtime.onConnect.addListener((port) => {
  contentPort = port;

  console.info("Established connection with:", port.sender.tab.id);

  contentPort.onMessage.addListener((message) => {
    console.debug("Recieved message", message, "from content port:", contentPort.sender.tab.id);
  });

});

// TODO: integrate with toggle command
const injectListener = () => {
  browser.tabs.executeScript({
    allFrames: true,
    file: "./listener.js"
  }).then(
    (result) => {console.debug("Content script executed with result:", result)},
    (err) => {console.error("Error injecting content script", err)}
  );
};


// Listen for toggle commands
var listenerEnabled = false;

browser.commands.onCommand.addListener((cmd) => {

  console.debug("Command fired:", cmd); 
  
  injectListener();

  if (cmd == "toggle_listener") {
    // Stop recording events
    if (listenerEnabled) {
      console.info("Disabling listener");
      listenerEnabled = false;
    }
    // Start recording events
    else {
      console.info("Enabling listener");
       listenerEnabled = true;
    }
  }

});
