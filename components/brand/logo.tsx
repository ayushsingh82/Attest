export function Logo({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <mask id="attest-m">
        <rect width="32" height="32" fill="#fff" />
        <g fill="none" stroke="#000">
          <path d="M9.6 22.8 16 8.6l6.4 14.2" strokeWidth="3.1" strokeLinejoin="miter" strokeLinecap="butt" />
          <path d="M12.3 18.6h7.4" strokeWidth="2.3" />
        </g>
      </mask>
      <path d="M16 1.6 29.4 9.3v13.4L16 30.4 2.6 22.7V9.3z" fill="none" className="stroke-primary" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M16 5.2 26.3 11.1v9.8L16 26.8 5.7 20.9v-9.8z" className="fill-primary stroke-primary" strokeWidth="1.6" strokeLinejoin="round" mask="url(#attest-m)" />
    </svg>
  );
}
