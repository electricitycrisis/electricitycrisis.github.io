import { useEffect, useRef } from "react"

const TWO_PI = Math.PI * 2

const NexusLogo = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    canvas.width = 200
    canvas.height = 200
    const cx = 100
    const cy = 100
    const size = 70

    ctx.clearRect(0, 0, 200, 200)
    ctx.strokeStyle = "rgba(120,200,255,.7)"
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const a = (i * TWO_PI) / 6 - Math.PI / 2
      const x = cx + Math.cos(a) * size
      const y = cy + Math.sin(a) * size
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()

    const bolt = [
      { x: 0, y: -0.5 },
      { x: 0.25, y: -0.1 },
      { x: 0.05, y: -0.1 },
      { x: 0.18, y: 0.5 },
      { x: -0.15, y: 0.05 },
      { x: 0.02, y: 0.05 },
      { x: -0.12, y: -0.5 },
    ]
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.moveTo(cx + bolt[0].x * size, cy + bolt[0].y * size)
    for (let i = 1; i < bolt.length; i++) {
      ctx.lineTo(cx + bolt[i].x * size, cy + bolt[i].y * size)
    }
    ctx.closePath()
    ctx.fill()
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  )
}

export default NexusLogo
