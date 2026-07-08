import Link from "next/link";
import { AlertCircle, Lightbulb, AlertTriangle, Info } from "lucide-react";

// Helper components for MDX
const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        href={href}
        {...props}
        className="text-accent underline font-medium hover:text-accent-hover focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
      />
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="text-accent underline font-medium hover:text-accent-hover focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
    />
  );
};

// Elegant headers with auto-ids for table of contents
const createHeader = (Level: "h2" | "h3" | "h4") => {
  const HeaderComponent = ({ children, ...props }: any) => {
    // Generate anchor-friendly ID from children text
    const text = typeof children === "string" ? children : "";
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const levelClasses = {
      h2: "text-2xl md:text-3xl font-bold mt-10 mb-4 border-b border-border/40 pb-2",
      h3: "text-xl md:text-2xl font-semibold mt-8 mb-3",
      h4: "text-lg md:text-xl font-medium mt-6 mb-2",
    };

    return (
      <Level id={id} className={`font-serif text-foreground ${levelClasses[Level]}`} {...props}>
        <a href={`#${id}`} className="hover:underline focus:outline-none focus:ring-1 focus:ring-accent">
          {children}
        </a>
      </Level>
    );
  };
  HeaderComponent.displayName = `MDX${Level.toUpperCase()}`;
  return HeaderComponent;
};

// Luxury Table styling
const Table = ({ children }: any) => (
  <div className="my-8 overflow-x-auto border border-border/60 rounded-lg luxury-shadow">
    <table className="min-w-full divide-y divide-border/60 font-sans text-sm text-left">
      {children}
    </table>
  </div>
);

const THead = ({ children }: any) => (
  <thead className="bg-stone-50  text-xs font-sans uppercase tracking-widest text-muted-light">
    {children}
  </thead>
);

const TBody = ({ children }: any) => (
  <tbody className="divide-y divide-border/40 bg-white ">
    {children}
  </tbody>
);

const TH = ({ children }: any) => (
  <th className="px-4 py-3 font-semibold text-foreground">
    {children}
  </th>
);

const TD = ({ children }: any) => (
  <td className="px-4 py-3 text-muted ">
    {children}
  </td>
);

// Fenced Callouts (Alerts)
const Callout = ({ type = "note", children }: { type?: "note" | "tip" | "warning" | "caution"; children: React.ReactNode }) => {
  const styles = {
    note: {
      border: "border-blue-200/80 ",
      bg: "bg-blue-50/50 ",
      text: "text-blue-900 ",
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
    },
    tip: {
      border: "border-emerald-200/80 ",
      bg: "bg-emerald-50/50 ",
      text: "text-emerald-900 ",
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
    },
    warning: {
      border: "border-amber-200/80 ",
      bg: "bg-amber-50/50 ",
      text: "text-amber-900 ",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
    },
    caution: {
      border: "border-rose-200/80 ",
      bg: "bg-rose-50/50 ",
      text: "text-rose-900 ",
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
    }
  };

  const selected = styles[type] || styles.note;

  return (
    <div className={`my-6 p-5 border rounded-lg flex gap-4 ${selected.border} ${selected.bg} ${selected.text}`}>
      {selected.icon}
      <div className="text-sm font-sans leading-relaxed flex-1">
        {children}
      </div>
    </div>
  );
};

export const mdxComponents = {
  a: CustomLink,
  h2: createHeader("h2"),
  h3: createHeader("h3"),
  h4: createHeader("h4"),
  table: Table,
  thead: THead,
  tbody: TBody,
  th: TH,
  td: TD,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-accent pl-5 my-6 italic font-serif text-lg text-muted/90 leading-relaxed">
      {children}
    </blockquote>
  ),
  p: ({ children }: any) => (
    <p className="font-sans text-base leading-relaxed text-muted  mb-6 antialiased">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-muted  font-sans text-base">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-muted  font-sans text-base">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-stone-100  text-accent font-mono text-sm px-1.5 py-0.5 rounded border border-border/40" {...props}>
      {children}
    </code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-stone-900 text-stone-100 p-4 rounded-lg overflow-x-auto my-6 border border-stone-800 font-mono text-sm leading-relaxed luxury-shadow">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-border/60" />,
  Callout,
};
