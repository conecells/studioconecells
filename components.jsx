/* Conecells UI kit components — vanilla React, no JSX scope sharing magic.
   Everything attaches to window at the end. */

const { useState, useRef, useEffect } = React;

/* -------------------- Atoms -------------------- */

function CCButton({ children, variant = "primary", size, onClick, className = "" }) {
  const cls = `cc-btn cc-btn-${variant} ${size === "sm" ? "cc-btn-sm" : ""} ${className}`;
  return <button className={cls} onClick={onClick}>{children}</button>;
}

function CCIcon({ name, size = 24, invert }) {
  const src = `https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/${name}.svg`;
  const style = { width: size, height: size, ...(invert ? { filter: "brightness(0) invert(1)" } : null) };
  return <img className="cc-icon" src={src} alt="" style={style} />;
}

function CCLogo({ light }) {
  // there's only one logo file; on dark schemes we filter to white
  return (
    <img
      className="cc-logo"
      src="assets/logo-light.png"
      alt="Conecells"
      style={light ? { filter: "brightness(0) invert(1)" } : null}
    />
  );
}

/* -------------------- Navbar -------------------- */

function CCNavbar({ onContact, current }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Design",   href: "design.html" },
    { label: "Strategy", href: "strategy.html" },
    { label: "Marketing", href: "marketing.html" },
  ];
  return (
    <header className="cc-nav scheme-2">
      <a className="cc-nav-brand" href="index.html"><CCLogo /></a>
      <div className="cc-nav-right">
        <CCButton size="sm" onClick={onContact}>Contact</CCButton>
        <button className={`cc-burger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span></span><span></span><span></span><span></span>
        </button>
      </div>
      {open && (
        <nav className="cc-menu">
          {links.map(l => (
            <a key={l.label} href={l.href} className={current === l.label ? "is-active" : ""}>{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* -------------------- Page hero (sub-pages) -------------------- */
function CCPageHero({ eyebrow, title, body, scheme = "scheme-2" }) {
  return (
    <section className={`cc-section cc-page-hero ${scheme}`}>
      <div className="cc-container">
        {eyebrow && <p className="cc-eyebrow">{eyebrow}</p>}
        <h1 className="cc-h2" style={{ maxWidth: "16ch" }}>{title}</h1>
        {body && <p className="cc-text-medium" style={{ marginTop: 22, maxWidth: "56ch" }}>{body}</p>}
      </div>
    </section>
  );
}

/* -------------------- Service detail grid -------------------- */
function CCServiceGrid({ eyebrow, title, items, scheme = "scheme-1" }) {
  return (
    <section className={`cc-section ${scheme}`}>
      <div className="cc-container">
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          {eyebrow && <p className="cc-eyebrow">{eyebrow}</p>}
          <h2 className="cc-h2">{title}</h2>
        </div>
        <div className="cc-service-grid">
          {items.map(it => (
            <div key={it.title} className="cc-service-card">
              <CCIcon name={it.icon} size={40} />
              <h6 className="cc-h6" style={{ marginTop: 16 }}>{it.title}</h6>
              <p style={{ marginTop: 10, color: "var(--fg-2)" }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Process steps -------------------- */
function CCProcess({ eyebrow, title, steps, scheme = "scheme-2" }) {
  return (
    <section className={`cc-section ${scheme}`}>
      <div className="cc-container">
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          {eyebrow && <p className="cc-eyebrow">{eyebrow}</p>}
          <h2 className="cc-h2">{title}</h2>
        </div>
        <div className="cc-process-grid">
          {steps.map((s, i) => (
            <div key={s.title} className="cc-process-step">
              <div className="cc-process-num">{String(i+1).padStart(2,"0")}</div>
              <h6 className="cc-h6" style={{ marginTop: 18 }}>{s.title}</h6>
              <p style={{ marginTop: 10, color: "var(--fg-2)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Stats bar (about) -------------------- */
function CCStats({ items, scheme = "scheme-4" }) {
  return (
    <section className={`cc-section ${scheme}`}>
      <div className="cc-container cc-stats-grid">
        {items.map(s => (
          <div key={s.label}>
            <div className="cc-stat-num">{s.value}</div>
            <p style={{ marginTop: 8, opacity: 0.85 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Team grid -------------------- */
function CCTeam({ eyebrow, title, members, scheme = "scheme-1" }) {
  return (
    <section className={`cc-section ${scheme}`}>
      <div className="cc-container">
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          {eyebrow && <p className="cc-eyebrow">{eyebrow}</p>}
          <h2 className="cc-h2">{title}</h2>
        </div>
        <div className="cc-team-grid">
          {members.map(m => (
            <div key={m.name} className="cc-team-card">
              <div className="cc-team-avatar" style={{ background: m.color }}>{m.initials}</div>
              <h6 className="cc-h6" style={{ marginTop: 18 }}>{m.name}</h6>
              <p style={{ color: "var(--fg-3)", fontSize: 14 }}>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Hero -------------------- */

function CCHero({ onCta }) {
  return (
    <section className="cc-section scheme-1">
      <div className="cc-container">
        <div className="cc-hero-card">
          <img className="cc-hero-img" src="assets/home-hero-header-section.jpg" alt="" />
          <div className="cc-hero-scrim"></div>
          <div className="cc-hero-body">
            <h1 className="cc-h1">Design, strategy, and marketing that works</h1>
            <p className="cc-text-medium">We build brands for businesses ready to grow. Small and medium companies trust us to turn their vision into reality.</p>
            <div style={{ marginTop: 28 }}>
              <CCButton variant="alternate" onClick={onCta}>Contact Us</CCButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Logo wall -------------------- */

function CCLogoWall() {
  const items = [0,1,2,3,4,5];
  return (
    <section className="cc-section scheme-1">
      <div className="cc-container" style={{ textAlign: "center" }}>
        <h6 className="cc-h6" style={{ marginBottom: 36 }}>Trusted by growing businesses everywhere</h6>
        <div className="cc-logo-grid">
          {items.map(i => (
            <div key={i} className="cc-logo-cell">
              <img src={`assets/home-logo-list-section-${i}.png`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Features -------------------- */

function CCFeatureRow({ icon, title, body }) {
  return (
    <div className="cc-feature">
      <div className="cc-feature-icon"><CCIcon name={icon} size={48} invert /></div>
      <div>
        <h6 className="cc-h6" style={{ marginBottom: 14 }}>{title}</h6>
        <p>{body}</p>
      </div>
    </div>
  );
}

function CCFeatures() {
  return (
    <section className="cc-section scheme-4">
      <div className="cc-container cc-features-grid">
        <div>
          <p className="cc-eyebrow">Services</p>
          <h2 className="cc-h2">What we do best</h2>
        </div>
        <div className="cc-feature-list">
          <div className="cc-feature-rail"></div>
          <CCFeatureRow icon="key_visualizer" title="Design that catches the eye"
            body="Visual identity and digital experiences built with intentional design and strategic purpose, crafted right from the very start." />
          <CCFeatureRow icon="strategy" title="Strategy that points the way"
            body="Clear direction and competitive advantage for sustainable growth and market expansion." />
          <CCFeatureRow icon="custom_typography" title="Visual identity"
            body="We craft brands that stand out and stick with your customers long after they see them." />
          <CCFeatureRow icon="campaign" title="Marketing that reaches people"
            body="Building meaningful campaigns demands a genuine understanding of who your audience truly is." />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Benefits -------------------- */

function CCBenefit({ index, eyebrow, title, body, active, onActivate }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) onActivate(index); });
    }, { rootMargin: "-30% 0px -50% 0px", threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActivate]);
  return (
    <div ref={ref} className="cc-benefit">
      <div className="cc-benefit-bar"><div className="cc-benefit-fill" style={{ width: active ? "100%" : "0%" }}></div></div>
      <p className="cc-eyebrow">{eyebrow}</p>
      <h2 className="cc-h2">{title}</h2>
      <p className="cc-text-medium">{body}</p>
    </div>
  );
}

function CCBenefits() {
  const [active, setActive] = useState(0);
  return (
    <section className="cc-section scheme-2">
      <div className="cc-container cc-benefits-grid">
        <div className="cc-benefit-num-col">
          <div className="cc-benefit-num">{String(active + 1).padStart(2, "0")}</div>
        </div>
        <div className="cc-benefit-stack">
          <CCBenefit index={0} active={active >= 0} onActivate={setActive}
            eyebrow="Why" title="Why choose Conecells"
            body="We deeply understand the unique challenges and diverse needs that small business owners and entrepreneurs face every day. From managing cash flow to scaling operations, we recognize the complexities involved in running a successful small business." />
          <CCBenefit index={1} active={active >= 1} onActivate={setActive}
            eyebrow="Results" title="Measurable outcomes, not empty promises"
            body="We've spent years creating designs for brands that actually move the needle and create meaningful impact in competitive markets. Your success is measured in real growth—increased revenue, expanded market share, and sustainable business outcomes—not vanity metrics." />
          <CCBenefit index={2} active={active >= 2} onActivate={setActive}
            eyebrow="Expertise" title="Years of work across industries"
            body="Every business operates within its own unique context. We don't rely on templates or one-size-fits-all solutions. Our strategy is carefully crafted and thoughtfully adapted to bend and flex, ensuring it fits seamlessly with your reality." />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Testimonial -------------------- */

function CCTestimonial() {
  return (
    <section className="cc-section scheme-1">
      <div className="cc-container" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div className="cc-stars">
          {[0,1,2,3,4].map(i => <span key={i} className="cc-star"></span>)}
        </div>
        <h5 className="cc-h5" style={{ marginTop: 24 }}>
          Working with Conecells was one of the best decisions we made for our business.
          Their approach to branding and strategy gave us clarity and confidence, and the
          final design work elevated our entire presence online. Everything felt polished,
          modern, and thoughtfully executed.
        </h5>
        <div className="cc-attribution">
          <div>
            <div style={{ fontWeight: 500 }}>Chukwuemeka Patrick</div>
            <div style={{ color: "var(--fg-3)" }}>Founder, Myfastmeds</div>
          </div>
          <div className="cc-vrule"></div>
          <img src="assets/home-testimonial-section.png" alt="MyFastMed" style={{ maxHeight: 48 }} />
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */

function CCFaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`cc-faq-item ${open ? "is-open" : ""}`}>
      <button className="cc-faq-trigger" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="cc-faq-chev"><CCIcon name="keyboard_arrow_down" size={22} invert /></span>
      </button>
      {open && <div className="cc-faq-answer">{a}</div>}
    </div>
  );
}

function CCFaq({ onContact, items }) {
  const defaults = [
    { q: "What's your process like?", a: "We start by listening. Strategy comes first, then design, then execution. You're involved at every stage. No surprises, no hidden steps, just clear progress toward your goals.", defaultOpen: true },
    { q: "Do you work with small budgets?", a: "We work with businesses at every stage. Small budgets don't mean small thinking. We prioritize impact and help you spend smart on what matters most." },
    { q: "Can you handle all three services?", a: "Yes. Design, strategy, and marketing work best together. We handle all three so nothing gets lost in translation between teams or vendors." },
    { q: "What if we need ongoing support?", a: "We offer retainer partnerships for businesses that want continuous support. Think of us as part of your team, not just a vendor you hire once." },
    { q: "How long does a project take?", a: "Most projects run between six to twelve weeks depending on scope. We move fast but never rush the work. Your timeline matters, and we build schedules that fit your business needs." },
  ];
  const list = items || defaults;
  return (
    <section className="cc-section scheme-4">
      <div className="cc-container" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className="cc-h2">Questions</h2>
          <p className="cc-text-medium" style={{ marginTop: 18 }}>Everything you need to know about working with Conecells</p>
        </div>
        <div>
          {list.map((f, i) => (
            <CCFaqItem key={i} q={f.q} a={f.a} defaultOpen={f.defaultOpen} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <h4 className="cc-h4" style={{ marginBottom: 14 }}>Ready to talk?</h4>
          <p className="cc-text-medium">Get in touch and let's discuss what's possible</p>
          <div style={{ marginTop: 24 }}>
            <CCButton variant="secondary" onClick={onContact}>Contact</CCButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- CTA -------------------- */

function CCCta({ onContact }) {
  return (
    <section className="cc-section scheme-2">
      <div className="cc-container cc-cta-grid">
        <div>
          <h2 className="cc-h2">Let's build something real</h2>
          <p className="cc-text-medium" style={{ marginTop: 18 }}>Schedule a conversation with our team about your next move</p>
          <div style={{ marginTop: 28 }}><CCButton onClick={onContact}>Contact</CCButton></div>
        </div>
        <div className="cc-cta-image">
          <img src="assets/home-cta-section.png" alt="" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */

function CCFooter() {
  return (
    <footer className="cc-section cc-footer scheme-1">
      <div className="cc-container">
        <div className="cc-footer-top">
          <a href="#" className="cc-footer-brand"><CCLogo /></a>
          <ul className="cc-footer-links">
            <li><a href="design.html">Design</a></li>
            <li><a href="strategy.html">Strategy</a></li>
            <li><a href="marketing.html">Marketing</a></li>
          </ul>
        </div>
        <div className="cc-footer-rule"></div>
        <div className="cc-footer-bottom">
          <p>© 2025 Conecells. All rights reserved.</p>
          <ul className="cc-footer-legal">
            <li><a href="privacy.html">Privacy policy</a></li>
            <li><a href="terms.html">Terms of service</a></li>
            <li><a href="cookies.html">Cookie settings</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Contact modal -------------------- */

function CCContactModal({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mojrnpjb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;
  return (
    <div className="cc-modal-overlay" onClick={onClose}>
      <div className="cc-modal" onClick={e => e.stopPropagation()}>
        <button className="cc-modal-close" onClick={onClose}>✕</button>
        {status === "success" ? (
          <div className="cc-modal-success">
            <h3 className="cc-h4">Thanks! We'll be in touch soon.</h3>
            <p style={{ color: "var(--fg-2)" }}>We typically respond within one business day.</p>
          </div>
        ) : (
          <>
            <h2 className="cc-h4">Tell us about your project</h2>
            <p style={{ color: "var(--fg-2)", marginBottom: 24 }}>We'll get back to you within one business day.</p>
            <label className="cc-label">Name<input className="cc-input" name="name" value={form.name} onChange={handleChange} /></label>
            <label className="cc-label">Email<input className="cc-input" name="email" type="email" value={form.email} onChange={handleChange} /></label>
            <label className="cc-label">Company<input className="cc-input" name="company" value={form.company} onChange={handleChange} /></label>
            <label className="cc-label">What can we help with?<textarea className="cc-input cc-textarea" name="message" value={form.message} onChange={handleChange} /></label>
            {status === "error" && <p style={{ color: "red", marginBottom: 12 }}>Something went wrong. Please try again.</p>}
            <CCButton onClick={handleSubmit} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </CCButton>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------- Legal / long-form text page -------------------- */
function CCLegal({ title, updated, sections }) {
  return (
    <section className="cc-section scheme-1 cc-legal">
      <div className="cc-container cc-legal-grid">
        <aside className="cc-legal-toc">
          <p className="cc-eyebrow" style={{ marginBottom: 16 }}>On this page</p>
          <ul>
            {sections.map((s, i) => (
              <li key={i}><a href={`#s-${i}`}>{s.heading}</a></li>
            ))}
          </ul>
        </aside>
        <div className="cc-legal-body">
          <p className="cc-eyebrow">Legal</p>
          <h1 className="cc-h2">{title}</h1>
          <p className="cc-text-medium" style={{ marginTop: 16, color: "var(--fg-2)" }}>
            Last updated {updated}
          </p>
          <div className="cc-legal-rule"></div>
          {sections.map((s, i) => (
            <div key={i} className="cc-legal-section" id={`s-${i}`}>
              <h3 className="cc-h4">{s.heading}</h3>
              {s.body.map((p, j) => <p key={j} className="cc-legal-p">{p}</p>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Cookie settings (interactive) -------------------- */
function CCCookieSettings() {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [saved, setSaved] = useState(false);
  const Toggle = ({ on, onChange, label, description, required }) => (
    <div className="cc-cookie-row">
      <div>
        <h6 className="cc-h6">{label}{required && <span className="cc-cookie-required"> Required</span>}</h6>
        <p style={{ marginTop: 8, color: "var(--fg-2)" }}>{description}</p>
      </div>
      <button
        className={`cc-toggle ${on ? "is-on" : ""} ${required ? "is-locked" : ""}`}
        disabled={required}
        onClick={() => !required && onChange(!on)}
        aria-pressed={on}
      >
        <span></span>
      </button>
    </div>
  );
  return (
    <section className="cc-section scheme-1">
      <div className="cc-container cc-legal-grid">
        <aside className="cc-legal-toc">
          <p className="cc-eyebrow" style={{ marginBottom: 16 }}>Quick actions</p>
          <ul>
            <li><a onClick={() => { setAnalytics(true); setMarketing(true); setPreferences(true); }}>Accept all</a></li>
            <li><a onClick={() => { setAnalytics(false); setMarketing(false); setPreferences(false); }}>Reject all</a></li>
          </ul>
        </aside>
        <div className="cc-legal-body">
          <p className="cc-eyebrow">Legal</p>
          <h1 className="cc-h2">Cookie settings</h1>
          <p className="cc-text-medium" style={{ marginTop: 16, color: "var(--fg-2)", maxWidth: "60ch" }}>
            We use cookies to make this site work, to understand how it's used, and — with your permission — to make our marketing more relevant. Choose what you're comfortable with.
          </p>
          <div className="cc-legal-rule"></div>
          <div className="cc-cookie-list">
            <Toggle on={true} onChange={() => {}} required
              label="Strictly necessary"
              description="Required for the site to function — page navigation, form submissions, and security. These cannot be turned off." />
            <Toggle on={preferences} onChange={setPreferences}
              label="Preferences"
              description="Remember choices you make on the site, like your preferred page or recently viewed work, so you don't have to set them again." />
            <Toggle on={analytics} onChange={setAnalytics}
              label="Analytics"
              description="Anonymous, aggregated data on which pages people visit and where they get stuck. Helps us improve the site over time." />
            <Toggle on={marketing} onChange={setMarketing}
              label="Marketing"
              description="Allow us and our partners to show more relevant advertising on other sites you visit. We never sell your data." />
          </div>
          <div className="cc-cookie-actions">
            <CCButton onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2400); }}>
              Save preferences
            </CCButton>
            {saved && <span className="cc-cookie-saved">Saved.</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  CCButton, CCIcon, CCLogo,
  CCNavbar, CCHero, CCLogoWall, CCFeatures, CCBenefits,
  CCTestimonial, CCFaq, CCCta, CCFooter, CCContactModal,
  CCPageHero, CCServiceGrid, CCProcess, CCStats, CCTeam,
  CCLegal, CCCookieSettings,
});
