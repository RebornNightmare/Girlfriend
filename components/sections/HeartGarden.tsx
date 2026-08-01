"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getParticleBudget, isLowPowerDevice, isTouchDevice } from "@/lib/performance";

const COLORS = ["#FF4D8D", "#FF7EB3", "#6A1B9A", "#F4C869"];

type Kind = "heart" | "flower" | "sparkle" | "butterfly";

interface Particle {
  kind: Kind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  life: number;
  maxLife: number;
  color: string;
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  size: number,
  color: string
) {
  ctx.beginPath();

  ctx.moveTo(0, size * 0.3);
  ctx.bezierCurveTo(
    -size,
    -size * 0.5,
    -size * 1.6,
    size * 0.5,
    0,
    size * 1.4
  );

  ctx.bezierCurveTo(
    size * 1.6,
    size * 0.5,
    size,
    -size * 0.5,
    0,
    size * 0.3
  );

  ctx.fillStyle = color;
  ctx.fill();
}

function drawFlower(
  ctx: CanvasRenderingContext2D,
  size: number,
  color: string
) {
  for (let i = 0; i < 5; i++) {
    ctx.save();

    ctx.rotate((i * Math.PI * 2) / 5);

    ctx.beginPath();
    ctx.ellipse(
      0,
      -size * 0.6,
      size * 0.4,
      size * 0.6,
      0,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = "#F4C869";
  ctx.fill();
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  size: number,
  color: string
) {
  ctx.beginPath();

  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.25, -size * 0.25);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.25, size * 0.25);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.25, size * 0.25);
  ctx.lineTo(-size, 0);
  ctx.lineTo(-size * 0.25, -size * 0.25);

  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
}

function drawButterfly(
  ctx: CanvasRenderingContext2D,
  size: number,
  color: string,
  phase: number
) {
  const flap = Math.sin(phase) * 0.3 + 0.7;

  ctx.fillStyle = color;

  ctx.save();
  ctx.scale(flap, 1);

  ctx.beginPath();
  ctx.ellipse(
    -size * 0.5,
    0,
    size * 0.5,
    size * 0.7,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();


  ctx.save();
  ctx.scale(flap, 1);

  ctx.beginPath();
  ctx.ellipse(
    size * 0.5,
    0,
    size * 0.5,
    size * 0.7,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}


export function HeartGarden() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const particlesRef = useRef<Particle[]>([]);

  const [hint,setHint] = useState(true);


  useEffect(()=>{

    const canvasElement = canvasRef.current;

    if (!canvasElement) return;

    const canvas: HTMLCanvasElement = canvasElement;


    const context = canvas.getContext("2d");

    if (!context) return;

    const ctx: CanvasRenderingContext2D = context;


    const lowPower = isLowPowerDevice();
    const touch = isTouchDevice();

    const maxParticles = getParticleBudget(220);

    const spawnCount = lowPower ? 2 : touch ? 3 : 5;


    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1,2);


    let rectCache:DOMRect | null = null;


    function resize(){

      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      rectCache = rect;


      canvas.width = Math.floor(width*dpr);
      canvas.height = Math.floor(height*dpr);


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    }


    requestAnimationFrame(resize);


    window.addEventListener(
      "resize",
      resize
    );


    function spawn(x: number, y: number) {
      const kinds: Kind[] = [
        "heart",
        "flower",
        "sparkle",
        "butterfly",
      ];

      const kind: Kind =
        kinds[Math.floor(Math.random() * kinds.length)] ?? "heart";

      const color: string =
        COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#FF4D8D";


      const particle: Particle = {
        kind,

        x,
        y,

        vx: (Math.random() - 0.5) * 1.5,

        vy: -(0.8 + Math.random() * 1.2),

        size: 20 + Math.random() * 25,

        rotation: Math.random() * Math.PI * 2,

        spin: (Math.random() - 0.5) * 0.08,

        life: 0,

        maxLife: 120 + Math.random() * 80,

        color,
      };


      particlesRef.current.push(particle);


      if (particlesRef.current.length > maxParticles) {
        particlesRef.current.splice(
          0,
          particlesRef.current.length - maxParticles
        );
      }
    }



    function clickHandler(e:PointerEvent){

      const rect =
        rectCache ??
        canvas.getBoundingClientRect();


      const x =
        e.clientX -
        rect.left;


      const y =
        e.clientY -
        rect.top;


      for(
        let i=0;
        i<spawnCount;
        i++
      ){

        spawn(x,y);

      }


      setHint(false);

    }



    canvas.addEventListener(
      "pointerdown",
      clickHandler
    );


    let frame:number;


    function animate(){

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      particlesRef.current =
        particlesRef.current.filter(
          p=>p.life<p.maxLife
        );


      particlesRef.current.forEach(p=>{


        p.life++;

        p.x+=p.vx;
        p.y+=p.vy;

        p.rotation+=p.spin;


        const alpha =
          1-(p.life/p.maxLife);


        ctx.save();


        ctx.translate(
          p.x,
          p.y
        );


        ctx.rotate(
          p.rotation
        );


        ctx.globalAlpha =
          Math.max(
            alpha,
            0
          );


        switch(p.kind){

          case "heart":
            drawHeart(
              ctx,
              p.size,
              p.color
            );
            break;


          case "flower":
            drawFlower(
              ctx,
              p.size,
              p.color
            );
            break;


          case "sparkle":
            drawSparkle(
              ctx,
              p.size,
              p.color
            );
            break;


          case "butterfly":
            drawButterfly(
              ctx,
              p.size,
              p.color,
              p.life*0.2
            );
            break;

        }


        ctx.restore();


      });


      frame =
        requestAnimationFrame(
          animate
        );

    }


    // test particle
    spawn(
      200,
      200
    );


    animate();



    return()=>{

      cancelAnimationFrame(frame);

      window.removeEventListener(
        "resize",
        resize
      );

      canvas.removeEventListener(
        "pointerdown",
        clickHandler
      );

    };


  },[]);



  return (

    <section
      id="garden"
      className="relative py-24 sm:py-32"
    >

      <Container>

        <SectionHeading

          eyebrow="Plant something"

          title="Our little garden"

          subtitle="Tap or click anywhere below — watch what grows."

        />

      </Container>



      <div
        className="
        relative mx-auto mt-12
        h-[420px] w-full
        max-w-5xl px-4
        sm:h-[520px]
        "
      >

        <div
          className="
          absolute inset-0
          rounded-[2.5rem]
          bg-gradient-to-b
          from-secondary/15
          to-primary/10
          pointer-events-none
          "
        />


        <canvas

          ref={canvasRef}

          className="
          relative z-10
          h-full w-full
          cursor-pointer
          touch-none
          rounded-[2.5rem]
          "

        />


        {
          hint &&
          <p
            className="
            pointer-events-none
            absolute inset-0
            flex items-center
            justify-center
            font-script
            text-2xl
            text-accent/50
            "
          >
            tap anywhere to plant a little love
          </p>
        }


      </div>


    </section>

  );
}