function sleep(millis, callback) {
  setTimeout(function() { callback(); },
             millis);
}

function Agent() {
  this.events = {};

  this.listen();
}

Agent.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

Agent.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

Agent.prototype.run = function () {
  var self = this;

  // Up: 0
  // Right: 1
  // Down: 2
  // Left: 3

  var num = Math.floor(Math.random()*4);
  self.emit("move", num);// up for now
};

Agent.prototype.listen = function () {
  var self = this;

  // Respond to button presses
  this.bindButtonPress(".retry-button", this.restart);
  this.bindButtonPress(".restart-button", this.restart);
  this.bindButtonPress(".keep-playing-button", this.keepPlaying);

};

Agent.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

Agent.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};

Agent.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchend, fn.bind(this));
};
