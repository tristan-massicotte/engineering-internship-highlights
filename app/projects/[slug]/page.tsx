import ProjectExperience from "../../../components/ProjectExperience";

const projectSlugs = [
  "mrp-automation",
  "inventory-reduction",
  "automatic-quotation",
  "order-follow-up",
  "executive-kpi-dashboard",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectExperience slug={slug} />;
}
