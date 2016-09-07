var screenHandler = new ScreenHandler(document.getElementById("game-canvas"), new ClickActionHandler());


screenHandler.addScreen("mainMenu", MainMenu);
screenHandler.addScreen("game", Game);
screenHandler.addScreen("victoryScreen", VictoryScreen);
screenHandler.loadScreen("mainMenu", 3);
