import TargetService from "./target.service.js";

let _ts = new TargetService()

function draw() {
  let update = _ts.Target
  document.getElementById('health').innerText = update.health
  document.getElementById('hits').innerText = update.hits
  document.getElementById('progress').style.width = update.progress + '%';
}

//Public
export default class TargetController {
  constructor() {
    _ts.addSubscriber('target', draw)
    draw()
  }

  attack(type) {
    _ts.attack(type)
  }

  item(type) {
    _ts.item(type)
  }

  eat(type) {
    _ts.eat(type)
  }

  reset() {
    _ts.reset()
  }

}