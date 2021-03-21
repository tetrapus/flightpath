import React, { useEffect, useRef } from "react";
import { Node } from "./Node";

interface Coord {
  x: number;
  y: number;
}

type Line = [CanvasRenderingContext2D, Coord, Coord, string, number];

const lineRenderers = {
  curvy: (
    ctx: CanvasRenderingContext2D,
    from: Coord,
    to: Coord,
    color: string,
    stroke: number
  ) => {
    if (from.y > to.y) {
      var temp = from;
      from = to;
      to = temp;
    }

    const radius = 6;
    const tangentX = from.x > to.x ? -radius : radius;
    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    if (Math.abs(from.y - to.y) > 8 && Math.abs(from.x - to.x) > 8) {
      ctx.lineTo(from.x, (from.y + to.y) / 2 - radius);
      ctx.arcTo(
        from.x,
        (from.y + to.y) / 2,
        from.x + tangentX,
        (from.y + to.y) / 2,
        radius
      );
      ctx.lineTo(to.x - tangentX, (from.y + to.y) / 2);
      ctx.arcTo(
        to.x,
        (from.y + to.y) / 2,
        to.x,
        (from.y + to.y) / 2 + radius,
        radius
      );
      ctx.stroke();
    }
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  },
  angular: (
    ctx: CanvasRenderingContext2D,
    from: Coord,
    to: Coord,
    color: string,
    stroke: number
  ) => {
    if (from.y < to.y) {
      var temp = from;
      from = to;
      to = temp;
    }

    ctx.lineWidth = stroke;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(from.x, from.y + (1 * (to.y - from.y)) / 4);
    ctx.lineTo(to.x, from.y + (3 * (to.y - from.y)) / 4);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  },
};

const lineStyles = {
  pink: (ctx: CanvasRenderingContext2D, from: Coord, to: Coord): Line[] => {
    return [
      [ctx, from, to, "#270000", 10],
      [ctx, from, to, "#d90082", 3],
      [ctx, from, to, "white", 1.5],
    ];
  },
  grey: (ctx: CanvasRenderingContext2D, from: Coord, to: Coord): Line[] => {
    return [
      [ctx, from, to, "#080808", 10],
      [ctx, from, to, "#222", 3],
      [ctx, from, to, "#444", 1],
    ];
  },
  white: (ctx: CanvasRenderingContext2D, from: Coord, to: Coord): Line[] => {
    return [
      [ctx, from, to, "#111", 10],
      [ctx, from, to, "#666", 3],
      [ctx, from, to, "#fff", 1],
    ];
  },
};

function connectAll(lineSets: Line[][]) {
  let i = 0;
  while (true) {
    const lines = lineSets.map((lineSet) => lineSet[i]).filter((x) => x);
    if (!lines.length) {
      break;
    }
    lines.forEach((line) => lineRenderers.angular(...line));
    i += 1;
  }
}

var cumulativeOffset = function (element: HTMLElement) {
  return {
    x:
      element.getBoundingClientRect().left +
      document.documentElement.scrollLeft,
    y: element.getBoundingClientRect().top + document.documentElement.scrollTop,
  };
};

export function Connectors({
  nodes,
  dimensions,
}: {
  nodes: Node[];
  dimensions: Coord;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let lines: Line[][] = [];

        nodes.reverse().forEach((node) => {
          if (!node.requires) {
            return;
          }
          const elem = document.querySelector(
            `[data-id="${node.id}"]`
          ) as HTMLElement;
          const dependencies = node.requires.map(
            (dependency) =>
              document.querySelector(
                `[data-id="${dependency}"]`
              ) as HTMLElement | null
          );
          dependencies.forEach((dependency) => {
            if (elem && dependency) {
              const depCoords = cumulativeOffset(elem);
              depCoords.x = depCoords.x + dependency.offsetWidth / 2;
              depCoords.y = depCoords.y + dependency.offsetHeight / 2;
              const targetCoords = cumulativeOffset(dependency);
              targetCoords.x += elem.offsetWidth / 2;
              targetCoords.y += elem.offsetHeight / 2;
              if (dependency.getAttribute("data-active") === "true") {
                lines.push(lineStyles.pink(ctx, targetCoords, depCoords));
              } else if (
                elem.getAttribute("data-active") === "true" &&
                dependency.getAttribute("data-assigned") === "true"
              ) {
                lines.push(lineStyles.white(ctx, targetCoords, depCoords));
              } else {
                lines.push(lineStyles.grey(ctx, targetCoords, depCoords));
              }
            }
          });
        });
        connectAll(lines);
      }
    }
  }, [canvasRef, nodes]);

  return (
    <canvas
      ref={canvasRef}
      width={`${dimensions.x}px`}
      height={`${dimensions.y}px`}
    ></canvas>
  );
}
