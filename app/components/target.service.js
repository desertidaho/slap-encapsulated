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

let itemModifier = []


//Public
export default class TargetService {
  constructor() {}

  get Target() {
    return JSON.parse(JSON.stringify(_state.target))
  }

  addSubscriber(dataName, fn) {
    _subscribers[dataName].push(fn)
  }

  attack(type) {
    let modDamage = 0
    if (itemModifier.length != 0) {
      modDamage = itemModifier.shift()
    }
    let damage = 0
    if (_state.target.attacks[type]) {
      damage = _state.target.attacks[type]
      let updatedTarget = {
        ..._state.target
      }
      updatedTarget.health -= damage + modDamage
      updatedTarget.hits++
      setState('target', updatedTarget)
    }
  }

  item(type) {
    let change
    if (change = _state.target.items[type]) {
      itemModifier.push(change)
    }
  }

  eat(type) {
    let feedNoodles
    if (_state.target.items[type]) {
      feedNoodles = _state.target.items[type]
      let updatedTarget = {
        ..._state.target
      }
      updatedTarget.health += feedNoodles
      setState('target', feedNoodles)
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