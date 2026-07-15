export default function Home() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-8">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-accent">
          RITWIK OS
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          Engineering Intelligence into Production.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Foundation in progress.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This is not the final homepage.
        </p>
      </section>
    </main>
  );
}
