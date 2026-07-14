"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { Container } from "@/components/ui/Container";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type FeaturedProjectData = Homepage["featuredProject"];

type FeaturedProjectProps = {
  data?: FeaturedProjectData;
  className?: string;
};

const PROJECTS_PER_PAGE = 5;

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
        <p className="font-inter text-xl font-medium uppercase leading-6 text-gray-500 md:text-2xl md:leading-7">
          {data.sectionLabel}
        </p>
      ) : null}

      <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        {data?.title ? (
          <h2 className="font-inter w-full text-3xl font-normal leading-10 text-black md:max-w-[461px] md:text-5xl md:leading-[61.6px]">
            {data.title}
          </h2>
        ) : null}

        {data?.description ? (
          <p className="font-inter w-full text-base font-normal leading-6 text-gray-500 md:max-w-[571px] md:text-lg md:leading-7">
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
        <span className="font-inter text-xs font-medium uppercase tracking-[0.08em] text-gray-400">
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
      <p className="font-inter text-2xl font-normal leading-8 text-black">
        {project.year}
      </p>

      <div className="flex min-w-0 items-center gap-6">
        <ProjectImage project={project} variant="desktop" />

        {project.title ? (
          <p className="font-inter line-clamp-1 min-w-0 flex-1 text-2xl font-normal leading-8 text-black">
            {project.title}
          </p>
        ) : null}
      </div>

      {project.role ? (
        <p className="font-inter text-2xl font-normal leading-8 text-black">
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
        <p className="font-inter w-full text-xl font-normal leading-[140%] text-black md:text-2xl md:leading-8">
          {project.year}
        </p>
      ) : null}

      <ProjectImage project={project} variant="responsive" />

      {project.title ? (
        <p className="font-inter w-full text-xl font-normal leading-[140%] text-black md:text-2xl md:leading-8">
          {project.title}
        </p>
      ) : null}

      {project.role ? (
        <p className="font-inter w-full text-xl font-normal leading-[140%] text-[var(--color-gray-600)] md:text-2xl md:leading-8">
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

  if (!project.url) {
    return content;
  }

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

type FeaturedProjectControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function FeaturedProjectControls({
  currentPage,
  totalPages,
  onPageChange,
}: FeaturedProjectControlsProps) {
  const isFirstPage = currentPage === 0;

  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2" aria-label="Project pages">
        {Array.from({ length: totalPages }, (_, page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 md:h-2",
                isActive
                  ? "w-10 bg-[var(--color-primary-500)]"
                  : "w-1.5 bg-[var(--color-gray-100)] md:w-2",
              )}
              aria-label={`Go to project page ${page + 1}`}
              aria-current={isActive ? "page" : undefined}
            />
          );
        })}
      </div>

      <div className="flex items-start">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors md:h-14 md:w-14",
            isFirstPage
              ? "cursor-pointer text-[var(--color-gray-500)]"
              : "cursor-pointer text-black",
          )}
          aria-label="Show previous projects"
        >
          <MdArrowBack className="h-5 w-5 md:h-8 md:w-8" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-colors md:h-14 md:w-14",
            isLastPage
              ? "cursor-pointer text-[var(--color-gray-500)]"
              : "cursor-pointer text-black",
          )}
          aria-label="Show next projects"
        >
          <MdArrowForward className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export function FeaturedProject({ data, className }: FeaturedProjectProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
  });

  const projects = data?.projects?.filter(hasProjectContent) ?? [];

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages - 1, 0));

  const firstProjectIndex = safeCurrentPage * PROJECTS_PER_PAGE;

  const visibleProjects = projects.slice(
    firstProjectIndex,
    firstProjectIndex + PROJECTS_PER_PAGE,
  );

  if (!hasFeaturedProjectContent(data)) {
    return null;
  }

  function handlePageChange(page: number) {
    if (page < 0 || page >= totalPages) {
      return;
    }

    setCurrentPage(page);
  }

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "w-full overflow-hidden bg-white py-10 md:py-14 lg:py-[60px]",
        className,
      )}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <Container>
        <div className="flex w-full flex-col items-start gap-10 md:gap-14">
          <motion.div className="w-full" variants={fadeUp}>
            <FeaturedProjectHeader data={data} />
          </motion.div>

          {visibleProjects.length ? (
            <motion.div
              key={safeCurrentPage}
              className="flex w-full flex-col items-start gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              aria-live="polite"
              aria-label={`Project page ${safeCurrentPage + 1} of ${totalPages}`}
            >
              {visibleProjects.map((project) => (
                <motion.div
                  key={project._key}
                  className="w-full"
                  variants={fadeUp}
                >
                  <ProjectRow project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          {totalPages > 0 ? (
            <motion.div className="w-full" variants={fadeIn}>
              <FeaturedProjectControls
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </motion.section>
  );
}
