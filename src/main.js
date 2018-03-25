import Circle from './components/Circle'

// Setup canvas.
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Set canvas dimensions.
let canvasWidth = window.innerWidth
let canvasHeight = window.innerHeight

canvas.width = canvasWidth
canvas.height = canvasHeight

addEventListener('resize', () => {
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  circle.updateCanvasWidth(canvasWidth, canvasHeight)
})

// Start app.
const circle = new Circle(
  ctx,
  canvasWidth,
  canvasHeight
)
