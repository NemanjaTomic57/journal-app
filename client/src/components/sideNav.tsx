"use client";

import { routes } from "@/routes";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const motionProps = {
  transition: { duration: 0.8, ease: "easeInOut" },
  transitionSpring: { type: "spring", duration: 0.7, bounce: 0.5 },
};

export default function SideNav() {
  const [show, setShow] = useState(false);
  const path = usePathname().split("/").pop() || "";

  return (
    <div className="p-4 bg-stone sticky left-0 top-0 h-screen">
      <div className="grid">
        <div className="flex justify-between items-center text-primary my-6">
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1,  }}
                exit={{
                  width: 0,
                  opacity: 0,
                }}
                transition={motionProps.transition}
                className="overflow-hidden"
              >
                <Heading type="h3">Dashboard</Heading>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ rotate: show ? "0deg" : "-180deg" }}
            transition={motionProps.transitionSpring}
            onClick={() => setShow(!show)}
            className="hover:bg-stone-shade rounded-lg m-auto p-2 cursor-pointer"
          >
            <Icon name="chevsLeft" size="lg" />
          </motion.div>
        </div>

        {sections.map((section, index) => (
          <Button
            key={index}
            href={section.link}
            className={clsx(
              "flex items-center text-primary hover:bg-stone-shade p-2",
              section.link.includes(path) && "bg-stone-tone"
            )}
          >
            <Icon name={section.icon} size="lg" />

            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "300px", opacity: 1,  }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={motionProps.transition}
                  className="overflow-hidden text-nowrap"
                >
                  <Heading type="h5">{section.text}</Heading>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        ))}

        <Button
          className="flex items-center text-primary hover:bg-stone-shade p-2"
          href={routes.login}
        >
          <Icon name="logout" size="lg" />

          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1,  }}
                exit={{ width: 0, opacity: 0 }}
                transition={motionProps.transition}
                className="overflow-hidden text-nowrap"
              >
                <Heading type="h5">Logout</Heading>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}

const sections = [
  {
    text: "New Entry",
    link: routes.newEntry,
    icon: "newEntry",
  },
  {
    text: "Calendar",
    link: routes.calendar,
    icon: "calendar",
  },
  {
    text: "Kanban",
    link: routes.kanban,
    icon: "kanban",
  },
  {
    text: "Profile",
    link: routes.profile,
    icon: "profile",
  },
];
