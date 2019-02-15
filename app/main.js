import TargetController from "./components/target.controller.js"


class App {
  constructor() {
    this.controllers = {
      targetController: new TargetController()
    }
  }
}

window['app'] = new App()