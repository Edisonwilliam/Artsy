"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
];

export default function ImageStack() {
  const [stack, setStack] = useState(images);

  const bringToFront = (index: number) => {
    const newStack = [...stack];
    const clicked = newStack.splice(index, 1)[0];
    newStack.unshift(clicked);
    setStack(newStack);
  };

  return (
    <div className="relative w-100 h-100">
      {stack.map((img, index) => (
        <div
          key={img}
          onClick={() => bringToFront(index)}
          className="absolute cursor-pointer transition-all duration-500"
          style={{
            zIndex: stack.length - index,
            transform: `translateX(${index * 20}px) rotate(${index * 3}deg)`
          }}
        >
          <Image
            src={img}
            alt="stack image"
            width={300}
            height={300}
            className="rounded-xl shadow-lg"
          />
        </div>
      ))}
    </div>
  );
}