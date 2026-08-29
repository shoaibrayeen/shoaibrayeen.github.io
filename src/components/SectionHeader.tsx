import { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

// Sticky left rail shared by every section's split layout: eyebrow, gradient
// title, optional lead line, plus any extra rail content (e.g. About's stats).
const SectionHeader = ({ eyebrow, title, lead, children }: SectionHeaderProps) => (
  <div className="lg:sticky lg:top-28 text-center lg:text-left">
    <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300 mb-4">
      {eyebrow}
    </p>
    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
      {title}
    </h2>
    <div
      className="h-1 w-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 mb-6 mx-auto lg:mx-0"
      aria-hidden="true"
    ></div>
    {lead && (
      <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
        {lead}
      </p>
    )}
    {children}
  </div>
);

export default SectionHeader;
