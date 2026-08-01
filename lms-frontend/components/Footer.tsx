import { INK, PAPER, RULE, MUTE, BODY, SIGNAL } from "@/lib/theme";

const PLATFORM_LINKS = [
  "Structured courses",
  "Past papers",
  "Quizzes",
  "Video tutorials",
  "Performance analytics",
  "Student ranking",
];

const COMPANY_LINKS = [
  "About us",
  "Careers",
  "Blog",
  "Press",
  "Contact",
];

const LEGAL_LINKS = [
  "Privacy policy",
  "Terms of service",
  "Cookie policy",
];

const SOCIAL_ICONS = [
  {
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "X",
    path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-0.034-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.9-1.637 1.85-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0.003 22.222 0h.003z",
  },
];

function FooterLinkGroup({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="font-data text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: MUTE }}
      >
        {heading}
      </h3>

      {items.map((item) => (
        <a
          key={item}
          href="#"
          className="text-sm transition-colors hover:text-[var(--signal)]"
          style={
            {
              color: BODY,
              "--signal": SIGNAL,
            } as React.CSSProperties
          }
        >
          {item}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full border-t px-6 py-12 lg:px-12"
      style={{
        background: "#F6F4EE",
        borderColor: RULE,
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-display text-xl font-bold"
              style={{ color: INK }}
            >
              EduLearn
            </h2>

            <p
              className="text-sm leading-relaxed"
              style={{ color: BODY }}
            >
              The smarter way to learn anything. Structured courses, live
              lessons, and adaptive progress tracking.
            </p>

            <div className="mt-1 flex gap-3">
              {SOCIAL_ICONS.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:brightness-95"
                  style={{
                    background: "#EAF2ED",
                    color: SIGNAL,
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <FooterLinkGroup
            heading="Platform"
            items={PLATFORM_LINKS}
          />

          {/* Company */}
          <FooterLinkGroup
            heading="Company"
            items={COMPANY_LINKS}
          />

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-data text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: MUTE }}
            >
              Stay updated
            </h3>

            <p
              className="text-sm"
              style={{ color: BODY }}
            >
              Get the latest study tips and platform updates.
            </p>

            <div className="mt-1 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-2"
                style={{
                  borderColor: RULE,
                  background: "#FFFFFF",
                  color: INK,
                }}
              />

              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: INK,
                  color: PAPER,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row"
          style={{ borderColor: RULE }}
        >
          <p
            className="text-xs"
            style={{ color: MUTE }}
          >
            © {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>

          <div className="flex gap-6">
            {LEGAL_LINKS.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors hover:text-[var(--signal)]"
                style={
                  {
                    color: MUTE,
                    "--signal": SIGNAL,
                  } as React.CSSProperties
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}