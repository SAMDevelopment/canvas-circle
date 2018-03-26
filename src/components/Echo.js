export default class Echo {
  ctx = null
  x = null
  y = null
  time = null
  color = null
  radius = null
  opacity = null

  constructor (ctx, x, y, x2, y2, color, radius) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.radius = radius
    this.color = color
    this.time = 30
    this.opacity = 1

  }

  update() {
    this.time -= 1
    this.opacity -= 1 / 30
    this.draw()
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.radius
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(this.x2, this.y2)
    this.ctx.stroke()
    this.ctx.restore();
    this.ctx.closePath()
  }
}