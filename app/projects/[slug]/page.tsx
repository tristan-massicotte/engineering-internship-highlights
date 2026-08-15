import ProjectExperience from "../../../components/ProjectExperience";

// "inventory-reduction" is intentionally omitted so its page is no longer
// built or reachable on the live site. The page code is preserved in
// components/ProjectExperience.tsx (InventoryPage). Re-add the slug here to
// restore it.
const projectSlugs = [
  "mrp-automation",
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
