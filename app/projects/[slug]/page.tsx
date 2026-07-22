import ProjectExperience from "../../../components/ProjectExperience";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectExperience slug={slug} />;
}
