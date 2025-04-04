"use client";

import { routes } from "@/routes";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function SideNav() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-4 bg-stone sticky! left-0 top-0 h-screen">
      <div className="grid gap-2">
        <div className="flex justify-between items-center text-primary mb-12">
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ width: 0, opacity: 0, marginInline: 0 }}
                animate={{ width: "auto", opacity: 1, marginInline: "12px" }}
                exit={{
                  width: 0,
                  paddingInline: "0",
                  opacity: 0,
                  marginInline: 0,
                }}
                className="overflow-hidden"
              >
                <Heading type="h3" className={clsx("font-semibold")}>
                  Dashboard
                </Heading>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            onClick={() => setShow(!show)}
            className="hover:bg-stone-shade rounded-lg transition m-auto p-2 cursor-pointer"
          >
            <Icon
              name="chevsLeft"
              size="lg"
              className={clsx(!show && "rotate-180")}
            />
          </div>
        </div>

        {sections.map((section, index) => (
          <Button
            key={index}
            href={section.link}
            className="flex items-center text-primary hover:bg-stone-shade p-3"
          >
            <Icon name={section.icon} size="lg" />

            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ width: 0, opacity: 0, marginLeft: "0px" }}
                  animate={{ width: "auto", opacity: 1, marginLeft: "12px" }}
                  exit={{ width: 0, opacity: 0, marginLeft: "0px" }}
                  className="overflow-hidden text-nowrap"
                >
                  <Heading type="h4">{section.text}</Heading>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        ))}

        <Button className="flex items-center text-primary hover:bg-stone-shade p-3" href={routes.login}>
          <Icon name="logout" size="lg" />

          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ width: 0, opacity: 0, marginLeft: "0px" }}
                animate={{ width: "auto", opacity: 1, marginLeft: "12px" }}
                exit={{ width: 0, opacity: 0, marginLeft: "0px" }}
                className="overflow-hidden text-nowrap"
              >
                <Heading type="h4">Logout</Heading>
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
