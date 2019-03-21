namespace game {
  @ut.executeAfter(ut.Shared.UserCodeStart)
  @ut.executeBefore(ut.Shared.UserCodeEnd)
  export class GameManagerSystem extends ut.ComponentSystem {
    static firstEnterGame: boolean = true;
    OnUpdate(): void {
      var config = this.world.getConfigData(game.GameConfig);

      // state machine to manage the global game state

      switch (config.state) {
        case game.GameState.Initialize:
          {
            game.GameService.initialize(this.world);
          }
          break;

        case game.GameState.Menu:
          {
          }
          break;

        case game.GameState.Tutorial:
          {
            if (GameManagerSystem.firstEnterGame) {
              if (
                window["GameAppOperationClass"] &&
                window["GameAppOperationClass"].gameLoadFinish
              ) {
                window["GameAppOperationClass"].gameLoadFinish();
              }
              GameManagerSystem.firstEnterGame = false;
            }
            // if the user clicks at any point during the tutorial, we end the tutorial and transition to gameplay
            if (ut.Runtime.Input.getMouseButtonDown(0)) {
              game.GameService.endTutorial(this.world);
            }
          }
          break;

        case game.GameState.Play:
          {
          }
          break;

        case game.GameState.Die:
          {
          }
          break;

        case game.GameState.GameOver:
          {
            if (ut.Runtime.Input.getMouseButtonDown(0)) {
              game.GameService.startTutorial(this.world);
              //TODO: call ad
              if (window["GameAppOperationClass"]) {
                window["GameAppOperationClass"].fullScreenAd();
              }
            }
          }
          break;
      }
    }
  }
}
