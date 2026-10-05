/** Guideline section header: mono index + condensed caps title + hairline. */
export function SectionHead({
  n,
  title,
  dark = false,
  id,
}: {
  n: string;
  title: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div
      className={`reveal flex items-baseline gap-4 border-b pb-3.5 ${dark ? "border-night-line" : "border-line"}`}
    >
      <span className={`font-mono text-[13px] font-medium ${dark ? "text-sun-400" : "text-blue-600"}`}>{n}</span>
      <h2 id={id} className="font-display text-3xl font-bold uppercase md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
