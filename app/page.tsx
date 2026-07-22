import ContactButton from "../components/ContactButton";

const outcomes = [
  {
    number: "01",
    slug: "mrp-automation",
    value: "90%",
    label: "Faster order processing",
    project: "MRP Automation",
    size: "major",
  },
  {
    number: "02",
    slug: "inventory-reduction",
    value: "21%",
    label: "Inventory reduction",
    project: "Inventory Reduction",
    size: "major",
  },
  {
    number: "03",
    slug: "automatic-quotation",
    value: "0",
    label: "Manual RFQ steps",
    project: "Automatic Quotation",
    size: "minor",
  },
  {
    number: "04",
    slug: "order-follow-up",
    value: "30 / 14",
    label: "Day early-warning flags",
    project: "Order Follow-Up",
    size: "minor",
  },
  {
    number: "05",
    slug: "executive-kpi-dashboard",
    value: "LIVE",
    label: "KPI visibility",
    project: "Executive Dashboard",
    size: "minor",
  },
];

type HomeProps = {
  searchParams?: Promise<{ skipIntro?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = searchParams ? await searchParams : {};
  const skipIntro = params.skipIntro === "1";

  return (
    <main className={`home-shell${skipIntro ? " skip-intro" : ""}`}>
      <div className="intro-screen" aria-hidden="true">
        <span className="intro-kicker">Operations · Systems · Impact</span>
        <h1>Engineering<br />Internship Highlights</h1>
        <div className="intro-rule" />
      </div>

      <section className="executive-index" aria-labelledby="portfolio-title">
        <header className="executive-header">
          <p className="executive-eyebrow"><i /> Engineering Internship Highlights / 2026</p>
          <ContactButton />
        </header>

        <div className="executive-title">
          <h1 id="portfolio-title">Operational <em>results</em></h1>
        </div>

        <div className="outcome-grid" id="outcomes">
          {outcomes.map((outcome, index) => (
            <a
              className={`outcome-card ${outcome.size} outcome-${index + 1}`}
              href={`/projects/${outcome.slug}`}
              key={outcome.slug}
              aria-label={`${outcome.project}: ${outcome.value} ${outcome.label}`}
            >
              <div className="outcome-meta">
                <span>{outcome.number}</span>
                <span>{outcome.project}</span>
              </div>
              <div className="outcome-copy">
                <strong>{outcome.value}</strong>
                <h2>{outcome.label}</h2>
              </div>
              <span className="outcome-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <footer className="executive-footer">
          <span>Process engineering</span>
          <span>Automation</span>
          <span>Supply chain</span>
          <span>Decision intelligence</span>
        </footer>
      </section>
    </main>
  );
}
