const footerLinks = ["Privacy", "Terms", "Stockists", "Atelier"];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 py-16 text-center md:flex-row md:justify-between md:px-20 md:text-left">
        <span className="font-display text-h3 text-primary-black">
          LUMIÈRE
        </span>
        <p className="text-body-sm text-neutral-600">
          © 2024 Lumière Optical. Architectural Precision in Vision.
        </p>
        <div className="flex gap-8">
          {footerLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="text-caption font-medium uppercase tracking-[0.15em] text-neutral-600 transition-colors duration-300 hover:text-accent-gold"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
