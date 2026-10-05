/** Visible marker for unconfirmed content. Remove before launch (see CLAUDE.md demo register). */
export function DemoBadge({ children = "Exemple · à confirmer" }: { children?: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-input bg-sun-50 px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-sun-900">
      {children}
    </span>
  );
}
