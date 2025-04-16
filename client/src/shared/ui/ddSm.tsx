"use client";

import clsx from "clsx";
import Button from "./button";
import Icon from "./icon";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../libs/useOnClickOutside";

const ddButton = "p-2 cursor-pointer hover:bg-stone flex items-center gap-2";

export interface DropdownItem {
  text: string;
  icon?: string;
}

interface Props {
  items: DropdownItem[];
  onSelect: (text: DropdownItem) => void;
  className: string;
  buttonText: React.ReactNode;
}

export default function DdSm({
  items,
  onSelect,
  className,
  buttonText,
}: Props) {
  const [showDd, setShowDd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShowDd(false));

  const handleClick = (item: DropdownItem) => {
    onSelect(item);
    setShowDd(false);
  };

  return (
    <div ref={ref} className="relative">
      <Button
        onClick={() => setShowDd(!showDd)}
        className={clsx("flex items-center gap-1 btn-sm", className)}
      >
        {buttonText} <Icon name="chevLeft" className="rotate-270" size="sm" />
      </Button>

      {showDd && (
        <div className="absolute bg-white border-1 text-primary w-full translate-y-1 rounded-sm overflow-hidden z-30 shadow-md">
          {items.map((item) => (
            <div
              key={item.text}
              onClick={() => handleClick(item)}
              className={clsx(
                ddButton,
                buttonText === item.text && "bg-stone",
                "not-last:border-b"
              )}
            >
              {item.icon && <Icon name={item.icon} size="sm" />} {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
