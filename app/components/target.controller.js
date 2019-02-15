import TargetService from "./target.service.js";

let _ts = new TargetService()

function draw() {
  let update = _ts.Target
  document.getElementById('health').innerText = update.health
  document.getElementById('hits').innerText = update.hits
  document.getElementById('progress').style.width = update.progress + '%';

  //button logic
  document.getElementById('firework').disabled = false
  document.getElementById('ninjaStar').disabled = false
  if (update.health <= 90) {
    document.getElementById('noodles').disabled = false
  }
  if (update.health > 90) {
    document.getElementById('noodles').disabled = true
  }
  if (update.health < 10) {
    document.getElementById('kick10').disabled = true
  } else {
    document.getElementById('kick10').disabled = false
  }
  if (update.health < 5) {
    document.getElementById('punch5').disabled = true
  } else {
    document.getElementById('punch5').disabled = false
  }
  if (update.health < 1) {
    document.getElementById('slap1').disabled = true
  } else {
    document.getElementById('slap1').disabled = false
  }
  if (update.health == 0) {
    document.getElementById('noodles').disabled = true
  }
  if (update.health < 6) {
    document.getElementById('ninjaStar').disabled = true
  }
  if (update.health < 4) {
    document.getElementById('firework').disabled = true
  }

  //change panda picture depending on health
  if (update.health == 100) {
    document.getElementById('pandaTarget').setAttribute("src", "assets/img/panda-start.png")
  }
  if (update.health < 100) {
    document.getElementById('pandaTarget').setAttribute("src", "assets/img/panda-healthy.png")
  }
  if (update.health < 70) {
    document.getElementById('pandaTarget').setAttribute("src", "assets/img/panda-block1.png")
  }
  if (update.health < 30) {
    document.getElementById('pandaTarget').setAttribute("src", "assets/img/panda-block2.png")
    document.getElementById('pandaTarget').setAttribute("style", "width: 240px")
  }
  if (update.health < 1) {
    document.getElementById('pandaTarget').setAttribute("src", "assets/img/panda-defeated.png")
    document.getElementById('pandaTarget').setAttribute("style", "margin-top: 2vh")
  }
}

//Public///////////////////////////////////////////////
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