import Target from "../models/target.js"

let _state = {
  target: new Target({
    health: 100,
    hits: 0,
    progress: 100,
    img: 'assets/img/panda-start.png',
    attacks: {
      slap: 1,
      punch: 5,
      kick: 10
    },
    items: {
      firework: 3,
      ninjaStar: 5,
      noodles: 10
    }
  })
}

let _subscribers = {
  target: []
}

function setState(dataName, val) {
  _state[dataName] = val
  _subscribers[dataName].forEach(fn => fn())
}

let _itemModifier = []


//Public/////////////////////////////////////////
export default class TargetService {
  constructor() {}

  get Target() {
    return JSON.parse(JSON.stringify(_state.target))
  }

  addSubscriber(dataName, fn) {
    _subscribers[dataName].push(fn)
  }

  attack(type) {
    //add modifier items if any
    let modDamage = 0
    if (_itemModifier.length != 0) {
      modDamage = _itemModifier.shift()
    }

    //attack buttons enabled/disabled and attack
    let damage = 0
    if (_state.target.attacks[type]) {
      damage = _state.target.attacks[type]
      let updatedTarget = {
        ..._state.target
      }
      updatedTarget.health -= damage + modDamage
      updatedTarget.progress -= damage + modDamage
      updatedTarget.hits++
      setState('target', updatedTarget)
    }
  }

  item(type) {
    let change = 0
    if (_state.target.items[type]) {
      change = _state.target.items[type]
      _itemModifier.push(change)
      //disable item buttons when one is selected
      document.getElementById('firework').disabled = true
      document.getElementById('ninjaStar').disabled = true
    }
    //disable attack buttons depending on which modifier item selected
    if (type == 'firework') {
      if (_state.target.health < 13) {
        document.getElementById('kick10').disabled = true;
      }
      if (_state.target.health < 8) {
        document.getElementById('punch5').disabled = true;
      }
    }
    if (type == 'ninjaStar') {
      if (_state.target.health < 15) {
        document.getElementById('kick10').disabled = true;
      }
      if (_state.target.health < 10) {
        document.getElementById('punch5').disabled = true;
      }
    }
  }

  eat(type) {
    let feedNoodles = 0
    if (_state.target.items[type]) {
      feedNoodles = _state.target.items[type]
      let updatedTarget = {
        ..._state.target
      }
      updatedTarget.health += feedNoodles
      updatedTarget.progress += feedNoodles
      setState('target', updatedTarget)
    }
  }

  reset() {
    let newTarget = new Target({
      health: 100,
      hits: 0,
      progress: 100,
      img: 'assets/img/panda-start.png',
      attacks: {
        slap: 1,
        punch: 5,
        kick: 10
      },
      items: {
        firework: 3,
        ninjaStar: 5,
        noodles: 10
      }
    })
    setState('target', newTarget)
    $('#gameOver').modal('hide')
  }
}