// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  manager = new GameManager(4, Agent, HTMLActuator, LocalStorageManager);

  var processor = setInterval(function()
      {
            manager.inputManager.run();
      }, 100);
});
