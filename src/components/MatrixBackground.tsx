import { useEffect, useRef } from "react";

export const TerminalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = canvas.width = parent.offsetWidth;
    let height = canvas.height = parent.offsetHeight;

    const terminalLines = [
      "ermeson@portfolio:~$ sudo apt update",
      "Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease",
      "Get:2 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]",
      "ermeson@portfolio:~$ node server.js",
      "Server running on port 3000...",
      "Connected to database: production_db",
      "ermeson@portfolio:~$ git push origin main",
      "Enumerating objects: 24, done.",
      "Counting objects: 100% (24/24), done.",
      "Delta compression using up to 8 threads",
      "Compressing objects: 100% (14/14), done.",
      "Writing objects: 100% (16/16), 2.45 KiB | 2.45 MiB/s, done.",
      "Total 16 (delta 10), reused 0 (delta 0), pack-reused 0",
      "To github.com:ermeson/portfolio.git",
      "   a1b2c3d..e5f6g7h  main -> main",
      "ermeson@portfolio:~$ docker-compose up -d",
      "Creating network 'portfolio_default' with the default driver",
      "Creating portfolio_db_1 ... done",
      "Creating portfolio_app_1 ... done",
      "ermeson@portfolio:~$ tail -f /var/log/syslog",
      "Apr 04 12:09:09 portfolio systemd[1]: Started Portfolio Service.",
      "Apr 04 12:09:10 portfolio app[1234]: [INFO] User connected from 192.168.1.1",
      "Apr 04 12:09:11 portfolio app[1234]: [DEBUG] Cache hit for key: 'hero_section'",
      "Apr 04 12:09:12 portfolio app[1234]: [WARN] High memory usage detected: 85%",
      "ermeson@portfolio:~$ ls -la",
      "drwxr-xr-x  5 ermeson ermeson  4096 Apr  4 12:00 .",
      "drwxr-xr-x 20 ermeson ermeson  4096 Apr  4 11:30 ..",
      "-rw-r--r--  1 ermeson ermeson   220 Apr  4 11:30 .bash_logout",
      "-rw-r--r--  1 ermeson ermeson  3771 Apr  4 11:30 .bashrc",
      "drwxr-xr-x  8 ermeson ermeson  4096 Apr  4 12:05 .git",
      "drwxr-xr-x  2 ermeson ermeson  4096 Apr  4 12:00 src",
      "-rw-r--r--  1 ermeson ermeson  1024 Apr  4 12:00 package.json",
      "ermeson@portfolio:~$ cat README.md",
      "# Ermeson Silva Portfolio",
      "Full-stack developer and researcher.",
      "ermeson@portfolio:~$ npm run build",
      "> portfolio@1.0.0 build",
      "> vite build",
      "vite v5.0.0 building for production...",
      "✓ 45 modules transformed.",
      "dist/index.html                  0.45 kB │ gzip: 0.28 kB",
      "dist/assets/index-D1B2C3D4.css   12.45 kB │ gzip: 3.12 kB",
      "dist/assets/index-A1B2C3D4.js   145.20 kB │ gzip: 45.12 kB",
      "ermeson@portfolio:~$ whoami",
      "ermeson",
      "ermeson@portfolio:~$ date",
      "Sat Apr 04 12:09:09 UTC 2026",
      "ermeson@portfolio:~$ ping google.com",
      "PING google.com (142.250.190.46) 56(84) bytes of data.",
      "64 bytes from 142.250.190.46: icmp_seq=1 ttl=115 time=12.4 ms",
      "64 bytes from 142.250.190.46: icmp_seq=2 ttl=115 time=11.8 ms",
      "ermeson@portfolio:~$ top",
      "Tasks: 120 total,   1 running, 119 sleeping,   0 stopped,   0 zombie",
      "%Cpu(s):  2.5 us,  1.0 sy,  0.0 ni, 96.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st",
      "MiB Mem :   7962.4 total,   2451.2 free,   3124.8 used,   2386.4 buff/cache",
      "MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   4512.2 avail Mem"
    ];

    const fontSize = 14;
    const lineHeight = 22;
    const activeLines: { text: string; y: number; targetY: number; opacity: number }[] = [];
    let lastLineTime = 0;
    let lineIndex = 0;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;

      // Determine delay based on line content
      const currentLine = terminalLines[lineIndex];
      const isCommand = currentLine.startsWith("ermeson@portfolio:~$");
      const isOutput = currentLine.startsWith("✓") || currentLine.startsWith("dist/");
      
      let delay = 100; // Default fast output
      if (isCommand) {
        delay = 1200 + Math.random() * 800; // Commands have a "thinking" pause
      } else if (isOutput) {
        delay = 50; // Build output is very fast
      } else if (Math.random() > 0.7) {
        delay = 400 + Math.random() * 400; // Random pauses in execution
      }

      // Add new line
      if (time - lastLineTime > delay) {
        const startY = height - 20;
        
        activeLines.push({
          text: currentLine,
          y: startY + lineHeight,
          targetY: startY,
          opacity: 0.4
        });

        // Shift all existing lines up
        activeLines.forEach((line, idx) => {
          if (idx < activeLines.length - 1) {
            line.targetY -= lineHeight;
          }
        });

        lineIndex = (lineIndex + 1) % terminalLines.length;
        lastLineTime = time;
      }

      // Draw and update lines
      for (let i = activeLines.length - 1; i >= 0; i--) {
        const line = activeLines[i];
        
        // Mechanical scroll: move quickly towards targetY
        line.y += (line.targetY - line.y) * 0.15;

        // Fade out at the top
        const fadeStart = height * 0.25;
        let currentOpacity = line.opacity;
        if (line.y < fadeStart) {
          currentOpacity = Math.max(0, (line.y / fadeStart) * line.opacity);
        }

        if (currentOpacity > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fillText(line.text, 20, line.y);
        }
        
        // Remove if off screen
        if (line.y < -fontSize) {
          activeLines.splice(i, 1);
        }
      }
    };

    let animationId: number;
    const animate = (time: number) => {
      draw(time);
      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      width = canvas.width = parent.offsetWidth;
      height = canvas.height = parent.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[-1]"
    />
  );
};
