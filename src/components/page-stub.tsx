/** Temporary placeholder until the page is built. */
export function PageStub({ title }: { title: string }) {
  return (
    <section className="container-x py-32">
      <h1 className="t-h1">{title}</h1>
      <p className="t-lead mt-4 text-text-soft">Page en construction.</p>
    </section>
  );
}
