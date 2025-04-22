"use client";

import { useRef } from "react";
import { useOnClickOutside } from "../libs/useOnClickOutside";
import Overlay from "./overlay";
import Icon from "./icon";
import Button from "./button";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup5xl({ children, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => onClose());
  return (
    <>
      <Overlay />

      <Button className="p-1 bg-white absolute top-5 right-5 rounded-full! hover:bg-stone cursor-pointer z-100">
        <Icon name="close" size="lg" color="var(--primary)" />
      </Button>

      <div
        ref={ref}
        className="fixed w-4xl h-fit inset-0 m-auto bg-background rounded-md shadow-xl overflow-auto z-100"
      >
        {children}
      </div>
    </>
  );
}
