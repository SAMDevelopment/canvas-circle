import Echo from './Echo'
export default class Particle {
  ctx = null
  x = null
  y = null
  radius = null
  color = null
  radians = Math.random() * Math.PI * 2
  velocity = 0.07
  echos = null
  delayFactor = 0.2
  lastMousePosition = {
    x: null,
    y: null
  }

  distanceFromCenter = null
  clockwise = null

  constructor (ctx, x, y, radius, color, distanceFromCenter, clockwise = true) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.lastMousePosition = {x, y}
    this.distanceFromCenter = distanceFromCenter
    this.clockwise = clockwise
    this.echoes = []
  }

  update (newMousePosition) {
    const lastPoint = {
      x: this.x,
      y: this.y
    }

    this.lastMousePosition.x += (newMousePosition.x - this.lastMousePosition.x) * this.delayFactor
    this.lastMousePosition.y += (newMousePosition.y - this.lastMousePosition.y) * this.delayFactor
    
    // move points over time
    this.radians += this.velocity
    if (this.clockwise === true) {
      this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.distanceFromCenter
      this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.distanceFromCenter
    } else {
      this.x = this.lastMousePosition.x + Math.sin(this.radians) * this.distanceFromCenter
      this.y = this.lastMousePosition.y + Math.cos(this.radians) * this.distanceFromCenter
    }

    // Generate particle echo
    this.echoes.push(
      new Echo(
        this.ctx, 
        lastPoint.x, 
        lastPoint.y, 
        this.x, 
        this.y, 
        this.color, 
        this.radius
      )
    )
    
    this.echoes.forEach(echo => {
      echo.update()
    })
    
    // Cleans up echos
    this.echoes = this.echoes.filter(echo => echo.lifetimeLeft > 1)

    this.draw(lastPoint)
  }

  draw (lastPoint) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.radius
    this.ctx.moveTo(lastPoint.x, lastPoint.y)
    this.ctx.lineTo(this.x, this.y)
    this.ctx.stroke()
    this.ctx.closePath()
  }
}
