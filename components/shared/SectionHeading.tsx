interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-100">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
