"use client";

import React, { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId: number;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    // Shader source definitions
    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float time = u_time * 0.2;
          
          // Base dark background
          vec3 color = vec3(0.039, 0.043, 0.059); // #0A0B0F
          
          // Animated Mesh Gradients using Sine/Cos waves
          vec2 p1 = vec2(0.5 + 0.3 * sin(time * 0.7), 0.5 + 0.2 * cos(time * 0.5));
          float d1 = length(uv - p1);
          vec3 c1 = vec3(0.427, 0.365, 0.988); // #6D5DFC
          color += c1 * (0.4 / (1.0 + d1 * 4.0)) * 0.5;
          
          vec2 p2 = vec2(0.2 + 0.4 * cos(time * 0.3), 0.8 + 0.1 * sin(time * 0.8));
          float d2 = length(uv - p2);
          vec3 c2 = vec3(0.0, 0.831, 0.667); // #00D4AA
          color += c2 * (0.3 / (1.0 + d2 * 5.0)) * 0.4;
          
          vec2 p3 = vec2(0.8 + 0.2 * sin(time * 0.4), 0.3 + 0.3 * cos(time * 0.6));
          float d3 = length(uv - p3);
          vec3 c3 = vec3(0.494, 0.906, 1.0); // #7EE7FF
          color += c3 * (0.3 / (1.0 + d3 * 4.5)) * 0.3;

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Helper to compile shaders
    function compileShader(type: number, src: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compilation failed:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Sync buffer size
    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    // Render loop
    const render = (t: number) => {
      if (!resizeObserver) syncSize();
      gl!.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      // Cleanup GL resources
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
        className="absolute inset-0 w-full h-full opacity-60"
      />
      {/* Dark overlay to ensure contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0F]/40 via-[#0A0B0F]/60 to-[#0A0B0F]" />
    </div>
  );
}
