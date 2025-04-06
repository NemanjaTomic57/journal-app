import { IconType } from "react-icons";
import { BsFillKanbanFill } from "react-icons/bs";
import { FaBold, FaCalendarAlt, FaCode, FaHighlighter, FaItalic, FaLink, FaNewspaper, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { FiChevronsLeft } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

const icons: { [key: string]: IconType } = {
  chevsLeft: FiChevronsLeft,
  newEntry: FaNewspaper,
  calendar: FaCalendarAlt,
  kanban: BsFillKanbanFill,
  profile: MdAccountBox,
  logout: RiLogoutBoxFill,

  bold: FaBold,
  italic: FaItalic,
  underline: FaUnderline,
  highlight: FaHighlighter,
  strikethrough: FaStrikethrough,
  link: FaLink,
  code: FaCode,
};

interface Props {
  name: keyof typeof icons;
  size?: string;
  sizeComputed?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function Icon({ name, size, sizeComputed, color, className, onClick }: Props) {
  const SelectedIcon = icons[name];

  if (!SelectedIcon) console.warn("Icon not found: " + { name });

  if (!sizeComputed) {
    switch (size) {
      case "xs":
        sizeComputed = 16;
        break;

      case "sm":
        sizeComputed = 20;
        break;

      case "base":
        sizeComputed = 24;
        break;

      case "lg":
        sizeComputed = 30;
        break;

      case "xl":
        sizeComputed = 38;
        break;

      default:
        break;
    }
  }

  return <SelectedIcon size={sizeComputed} color={color} className={className} onClick={onClick} />;
}
