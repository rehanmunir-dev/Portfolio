import { UIUXProjects } from "@/components/UIUXProjects";
import { DevelopmentProjects } from "@/components/DevelopmentProjects";
import { uiuxProjects, developmentProjects } from "@/components/projectData";

export function ProjectSection() {
  return (
    <div className="relative bg-[#071117]">
      {/* Dynamic light effects between sections */}
      <div className="absolute left-1/2 top-0 h-[1px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#14D5D0]/30 to-transparent" />
      
      {/* UI/UX Design Work Section */}
      <UIUXProjects projects={uiuxProjects} />

      <div className="relative py-12 bg-[#071117]">
        <div className="absolute left-1/2 top-1/2 h-[1px] w-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#14D5D0]/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#14D5D0]/20 bg-[#0C1E24] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#14D5D0]">
          Engineering Transition
        </div>
      </div>

      {/* Development Projects Section */}
      <DevelopmentProjects projects={developmentProjects} />
      
      <div className="absolute left-1/2 bottom-0 h-[1px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#14D5D0]/30 to-transparent" />
    </div>
  );
}
