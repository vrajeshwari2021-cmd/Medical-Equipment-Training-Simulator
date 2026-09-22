import { useEffect, useRef } from "react";

function RealECG() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 180;

    let offset = 0;

    function drawGrid() {
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function drawECG() {
      ctx.beginPath();
      ctx.strokeStyle = "#00ff66";
      ctx.lineWidth = 3;

      for (let x = 0; x < canvas.width; x++) {
        const t = (x + offset) % 180;

        let y = 90;

        if (t > 20 && t < 35) y = 90 - (t - 20) * 2;
        else if (t >= 35 && t < 45) y = 60 + (t - 35) * 6;
        else if (t >= 45 && t < 55) y = 120 - (t - 45) * 10;
        else if (t >= 55 && t < 65) y = 20 + (t - 55) * 7;
        else if (t >= 65 && t < 80) y = 90 - (80 - t);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
    }

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawECG();

      offset += 3;

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <canvas
        ref={canvasRef}
        className="rounded-xl border border-green-600 shadow-lg"
      />
    </div>
  );
}

export default RealECG;