
// TODO: Make event whistelist run-time configurable

const events = [
  // Form events
  "reset",
  "submit",
  // Keyboard events
  "keydown",
  "keypress",
  "keyup",
  // Mouse events
  "click",
  // Storage
  "storage",
  // Value change events
  "input",
  "RadioStateChange",
  "CheckboxStateChange",
  // Add "change" event?
];

// Establish connection to background script
var bgPort = browser.runtime.connect({name: "content-port"});

bgPort.postMessage({debug: "Connection established"});

// Listen for messages send from background script
bgPort.onMessage.addListener((message) => {
  console.debug("Content script recieved message:", message);
});

document.body.addEventListener("click", function(e) {
  bgPort.postMessage({greeting: JSON.stringify(e)});
});

const eventHandler = (e) => {
  console.debug("Event occured:", "dum");
  bgPort.postMessage(JSON.stringify(e));
};

// Enable event listeners
/*events.forEach(
  (event_type) => {
    document.body.addEventListener(
      event_type,
      eventHandler)});*/
/*
const deregisterListeners = () => {
  events.forEach((event_type) => {
    document.removeEventListener(event_type, console.log);
  });
};*/
