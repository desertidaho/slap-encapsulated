export default class Target {
  constructor(data) {
    this.health = data.health
    this.hits = data.hits
    this.progress = data.progress
    this.img = data.img
    this.attacks = data.attacks
    this.items = data.items
  }
}