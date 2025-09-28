import { QuoteForm } from "@/components/QuoteForm";

export default function Home() {
  return (
    <div className="py-16">
      <section id="quote" className="mx-auto max-w-5xl">
        <header className="mb-8 space-y-3 text-center">
          <h1 className="text-4xl font-semibold text-[#174091]">Calculate your pricing for content</h1>
          <p className="text-sm text-slate-600">
            Choose a service, estimate your word count, and preview pricing instantly before you confirm payment.
          </p>
        </header>
        <QuoteForm />
      </section>
    </div>
  );
}
