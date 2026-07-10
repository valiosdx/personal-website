import Image from "next/image";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { Container } from "@/components/ui/Container";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type FeaturedProjectData = Homepage["featuredProject"];

type FeaturedProjectProps = {
  data?: FeaturedProjectData;
  className?: string;
};

type ProjectItem = NonNullable<
  NonNullable<FeaturedProjectData>["projects"]
>[number];

type ProjectItemWithContent = ProjectItem & {
  _key: string;
};

function hasProjectContent(
  project: ProjectItem,
): project is ProjectItemWithContent {
  return Boolean(
    project?._key &&
    (project.year || project.title || project.role || project.thumbnail),
  );
}

function hasFeaturedProjectContent(data?: FeaturedProjectData) {
  return Boolean(
    data?.sectionLabel ||
    data?.title ||
    data?.description ||
    data?.projects?.some(hasProjectContent),
  );
}

function FeaturedProjectHeader({ data }: { data?: FeaturedProjectData }) {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      {data?.sectionLabel ? (
        <p className="text-xl font-medium uppercase leading-6 text-gray-500 font-inter md:text-2xl md:leading-7">
          {data.sectionLabel}
        </p>
      ) : null}

      <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        {data?.title ? (
          <h2 className="w-full text-3xl font-normal leading-10 text-black font-inter md:max-w-[461px] md:text-5xl md:leading-[61.6px]">
            {data.title}
          </h2>
        ) : null}

        {data?.description ? (
          <p className="w-full text-base font-normal leading-6 text-gray-500 font-inter md:max-w-[571px] md:text-lg md:leading-7">
            {data.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ProjectImage({
  project,
  variant = "desktop",
}: {
  project: ProjectItemWithContent;
  variant?: "desktop" | "responsive";
}) {
  if (!project.thumbnail) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50",
          variant === "desktop" ? "h-16 w-28" : "h-44 w-full md:h-[361px]",
        )}
      >
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400 font-inter">
          Project
        </span>
      </div>
    );
  }

  const imageUrl =
    variant === "desktop"
      ? urlFor(project.thumbnail)
          .width(230)
          .height(128)
          .fit("crop")
          .auto("format")
          .url()
      : urlFor(project.thumbnail)
          .width(1296)
          .height(722)
          .fit("crop")
          .auto("format")
          .url();

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50",
        variant === "desktop" ? "h-16 w-28" : "h-44 w-full md:h-[361px]",
      )}
    >
      <Image
        src={imageUrl}
        alt={project.title || "Project thumbnail"}
        fill
        sizes={
          variant === "desktop"
            ? "112px"
            : "(min-width: 768px) 648px, calc(100vw - 48px)"
        }
        className="object-cover"
      />
    </div>
  );
}

function ProjectRowDesktop({ project }: { project: ProjectItemWithContent }) {
  return (
    <div className="hidden w-full grid-cols-[56px_minmax(0,500px)_96px] items-center justify-between gap-10 border-t border-zinc-200 py-5 lg:grid">
      <p className="text-2xl font-normal leading-8 text-black font-inter">
        {project.year}
      </p>

      <div className="flex min-w-0 items-center gap-6">
        <ProjectImage project={project} variant="desktop" />

        {project.title ? (
          <p className="min-w-0 flex-1 line-clamp-1 text-2xl font-normal leading-8 text-black font-inter">
            {project.title}
          </p>
        ) : null}
      </div>

      {project.role ? (
        <p className="text-2xl font-normal leading-8 text-black font-inter">
          {project.role}
        </p>
      ) : null}
    </div>
  );
}

function ProjectRowResponsive({
  project,
}: {
  project: ProjectItemWithContent;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-5 border-t border-zinc-200 py-5 lg:hidden">
      {project.year ? (
        <p className="w-full text-xl font-normal leading-[140%] text-black font-inter md:text-2xl md:leading-8">
          {project.year}
        </p>
      ) : null}

      <ProjectImage project={project} variant="responsive" />

      {project.title ? (
        <p className="w-full text-xl font-normal leading-[140%] text-black font-inter md:text-2xl md:leading-8">
          {project.title}
        </p>
      ) : null}

      {project.role ? (
        <p className="w-full text-xl font-normal leading-[140%] text-[var(--color-gray-600)] font-inter md:text-2xl md:leading-8">
          {project.role}
        </p>
      ) : null}
    </div>
  );
}

function ProjectRow({ project }: { project: ProjectItemWithContent }) {
  const content = (
    <>
      <ProjectRowDesktop project={project} />
      <ProjectRowResponsive project={project} />
    </>
  );

  if (!project.url) return content;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-4"
      aria-label={`Open ${project.title ?? "project"}`}
    >
      <div className="transition-opacity group-hover:opacity-70">{content}</div>
    </a>
  );
}

function FeaturedProjectControls() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-start gap-2" aria-hidden="true">
        <span className="h-1.5 w-10 rounded-full bg-[var(--color-primary-500)] md:h-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gray-100)] md:h-2 md:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gray-100)] md:h-2 md:w-2" />
      </div>

      <div className="flex items-start" aria-hidden="true">
        <span className="flex h-10 w-10 items-center justify-center text-[var(--color-gray-500)] md:h-14 md:w-14">
          <MdArrowBack className="h-5 w-5 md:h-8 md:w-8" />
        </span>

        <span className="flex h-10 w-10 items-center justify-center text-black md:h-14 md:w-14">
          <MdArrowForward className="h-5 w-5 md:h-8 md:w-8" />
        </span>
      </div>
    </div>
  );
}

export function FeaturedProject({ data, className }: FeaturedProjectProps) {
  if (!hasFeaturedProjectContent(data)) return null;

  const projects = data?.projects?.filter(hasProjectContent) ?? [];

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-white py-10 md:py-14",
        className,
      )}
    >
      <Container>
        <div className="flex w-full flex-col items-start gap-10 md:gap-14">
          <FeaturedProjectHeader data={data} />

          {projects.length ? (
            <div className="flex w-full flex-col items-start gap-5">
              {projects.map((project) => (
                <ProjectRow key={project._key} project={project} />
              ))}
            </div>
          ) : null}

          {projects.length ? <FeaturedProjectControls /> : null}
        </div>
      </Container>
    </section>
  );
}
