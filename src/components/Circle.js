import Particle from './Particle'
import { randomArrayItem, numberBetween } from './Utilities'

export default class Circle {
  canvas = {
    ctx: null,
    width: null,
    height: null
  }
  mousePosition = {
    x: null,
    y: null
  }
  colors = [
    '#00bdff',
    '#4d39ce',
    '#088eff'
  ]
  particles = []

  constructor (ctx, initialWidth, initialHeight) {
    this.canvas.ctx = ctx
    this.mousePosition.x = initialWidth / 2
    this.mousePosition.y = initialHeight / 2

    this.updateCanvasWidth(initialWidth, initialHeight)
    this.registerEventListeners()

    this.init()
    this.animate()
  }

  init () {
    this.generate(30, 50, 100, false)
    this.generate(30, 100, 150, true)
    this.generate(30, 150, 200, false)
  }

  generate (parts, ringIn, ringOut, clockwise) {
    for (let i = 0; i < parts; i++) {
      const radius = (Math.random() * 3) + 1
      const x = this.canvas.width / 2
      const y = this.canvas.height / 2
      const color = randomArrayItem(this.colors)
      const dfc = numberBetween(ringIn, ringOut)

      this.particles.push(
        new Particle(this.canvas.ctx, x, y, radius, color, dfc, clockwise)
      )
    }
  }

  animate () {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach(particle => {
      particle.update(this.mousePosition)
    })

    requestAnimationFrame(this.animate.bind(this))
  }

  updateCanvasWidth (width, height) {
    this.canvas.width = width
    this.canvas.height = height
  }

  registerEventListeners () {
    addEventListener('mousemove', event => {
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY
    })
  }
}
