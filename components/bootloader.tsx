"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const bootMessages = [
      "[ OK ] Initializing system...",
      "[ OK ] Loading kernel modules...",
      "[ OK ] Checking file system...",
      "[ OK ] Mounting file systems...",
      "[ OK ] Starting networking service...",
      "[ OK ] Starting display manager...",
      "[ OK ] System ready! Booting into terminal..."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, bootMessages[index]]);
      index++;
      if (index === bootMessages.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    gsap.fromTo(
      ".boot-line",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.3 }
    );
  }, [messages]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-5 flex justify-center items-center">
    <div className="p-1 pt-2 rounded flex flex-col justify-center gap-0.5 items-center bg-gray-500">
       <span className="text-xl text-white font-mono"> OSS International ©2025</span>
       <div className="lg:w-[900px] lg:h-[600px] md:w-full md:h-auto md:max-h-screen mx-auto bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        {messages.map((msg, index) => (
          <p key={index} className="boot-line">{msg}</p>
        ))}
        </div>
    </div>
    </div>
  );
};

export default BootLoader;
