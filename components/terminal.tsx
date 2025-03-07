"use client";

import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Neofetch from "./neofetch";
import BootLoader from "./bootloader";
import WhoAmI from "./whoami";
import Socials from "./socials";

const commands: Record<string, string | JSX.Element> = {
    help: "Available commands: whoami, projects, contact, socials, clear, neofetch",
    whoami: <WhoAmI/>,
    projects: "Check out my GitHub: github.com/VinitGurjar",
    contact: "Reach me at: vinitfagna@gmail.com",
    socials: <Socials />, 
    clear: "clear",
    neofetch: <Neofetch />
  };

export default function Terminal() {
  const [history, setHistory] = useState<{ command: string; output: string | JSX.Element }[]>([]);
  const [input, setInput] = useState("");
  const [bootComplete, setBootComplete] = useState(false);
  const cursorRef = useRef(null);
  const inputRef = useRef(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(cursorRef.current, { opacity: 0, repeat: -1, yoyo: true, duration: 0.6 });
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") {
      setHistory([]);
    } else {
      setHistory([
        ...history,
        { command: cmd, output: commands[cmd] ?? "Command not found!" }
      ]);
    }
    setInput("");
  };
  
  if (!bootComplete) {
    return <BootLoader onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-5 flex justify-center md:items-center sm:items-start">
    <div className="p-1 lg:pt-2 sm:pt-0 rounded flex flex-col justify-center gap-0.5 items-center bg-gray-500">
       <span className="text-xl text-white font-mono"> OSS International ©2025</span>
      <div className="lg:w-[900px] lg:h-[600px] md:w-full md:h-auto md:max-h-screen mx-auto bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 overflow-hidden scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black/50">
        <p className="text-lg">Welcome to My Terminal Portfolio!</p>
        <p>Type `help` to see available commands.</p>

        <div
          ref={terminalRef}
          className="mt-2 h-[500px] overflow-y-auto flex flex-col"
        >
        
          {history.map((item, index) => (
            <div key={index}>
              <p className="text-green-300">[VinitGurjar@Portfolio~] $ {item.command}</p>
              {item.output}
            </div>
          ))}
        <div className="flex mt-2">
          <span className="text-green-300 flex gap-2">[VinitGurjar@Portfolio~] <span>$</span></span>
          <input
            ref={inputRef}
            className="bg-transparent border-none focus:outline-none text-green-400 ml-2 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
            autoFocus
          />
          <span ref={cursorRef} className="ml-1 w-0.5 bg-green-300"></span>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}
