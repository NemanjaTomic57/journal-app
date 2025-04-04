import Heading, { style } from "@/shared/ui/heading";
import clsx from "clsx";

export default function Page() {
  return (
    <form>
      <div className="mb-4">
        <label htmlFor="title" className="mb-6 block">
          <Heading type="h1">Create a new entry</Heading>
        </label>
        <input
          name="title"
          className={clsx(
            "input input-title w-full max-w-[700px]",
            style["h2"]
          )}
          placeholder="Title"
        />
      </div>

      <textarea className="w-full input" rows={15} placeholder="Write something ..." />

    </form>
  );
}
