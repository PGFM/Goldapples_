"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconSwatch } from "@/components/ui/IconSwatch";
import { PhysicsOfCommunicationDiagram } from "@/components/diagrams/PhysicsOfCommunicationDiagram";
import { MeaningFrameworkDiagram } from "@/components/diagrams/MeaningFrameworkDiagram";
import { LeadershipAlignmentDiagram } from "@/components/diagrams/LeadershipAlignmentDiagram";
import { LeadershipCommunicationLabDiagram } from "@/components/diagrams/LeadershipCommunicationLabDiagram";
import { IconMeaning, IconClarify, IconAlignment, IconLab } from "@/components/icons";

type Framework = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  closing?: string;
};

const diagrams: Record<string, React.ReactNode> = {
  "physics-of-communication": <PhysicsOfCommunicationDiagram />,
  "meaning-framework": <MeaningFrameworkDiagram />,
  "leadership-alignment-framework": <LeadershipAlignmentDiagram />,
  "leadership-communication-lab": <LeadershipCommunicationLabDiagram />,
};

const icons = [IconMeaning, IconClarify, IconAlignment, IconLab];

export function FrameworksShowcase({ frameworks }: { frameworks: Framework[] }) {
  const [activeId, setActiveId] = useState(frameworks[0]?.id);

  const activeIndex = frameworks.findIndex((fw) => fw.id === activeId);
  const activeFw = frameworks[activeIndex] || frameworks[0];
  const ActiveDiagram = diagrams[activeFw.id];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Left Column: Vertical tab list (2-col on tablet, stacked on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3 lg:col-span-4">
        {frameworks.map((fw, i) => {
          const Icon = icons[i];
          const isActive = activeId === fw.id;

          return (
            <button
              key={fw.id}
              onClick={() => setActiveId(fw.id)}
              className={`w-full flex items-start gap-4 p-5 rounded-[4px] text-left transition-all duration-300 border ${
                isActive
                  ? "bg-champagne/45 border-gold-deep shadow-[0_4px_16px_rgba(185,143,62,0.06)] text-ink"
                  : "bg-white border-graphite/10 text-steel hover:text-ink hover:border-graphite/20 hover:shadow-sm"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <IconSwatch icon={Icon} tone={isActive ? "gold" : "outline-dark"} />
              </div>
              <div>
                <span className={`block font-serif text-lg leading-snug transition-colors duration-200 ${
                  isActive ? "text-ink font-semibold" : "text-graphite/90"
                }`}>
                  {fw.title}
                </span>
                <span className="block mt-1 font-mono text-[10px] uppercase tracking-wider text-steel opacity-80">
                  Framework {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Detailed visual card */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFw.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-between h-full border border-graphite/12 bg-white p-6 sm:p-8 lg:p-10 rounded-[4px] shadow-xs"
          >
            <div className="mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold leading-snug mb-6">
                {activeFw.title}
              </h2>
              
              <div className="text-steel text-[15.5px] sm:text-[16.5px] leading-relaxed max-w-[65ch] space-y-4">
                {activeFw.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                
                {activeFw.bullets && activeFw.bullets.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-steel/90 marker:text-gold">
                    {activeFw.bullets.map((b, idx) => (
                      <li key={idx} className="pl-1">{b}</li>
                    ))}
                  </ul>
                )}
                
                {activeFw.closing && (
                  <p className="mt-4 font-medium text-ink/80">{activeFw.closing}</p>
                )}
              </div>
            </div>
            
            <div className="w-full border border-graphite/10 bg-[#FAFAFA] py-8 sm:p-10 rounded-[2px] overflow-x-auto">
              <div className="w-full px-6 sm:px-0 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px]">
                {ActiveDiagram}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
