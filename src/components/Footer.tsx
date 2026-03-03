const Footer = () => {
  return (
    <footer className="border-t border-border bg-navy py-16 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <span className="font-display text-lg font-bold text-accent-foreground">I</span>
              </div>
              <span className="font-display text-xl font-bold">InvesTrack</span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              The leading business intelligence platform for the Lao PDR market.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">Products</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-accent transition-colors">Company Search</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Investor Database</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Funding Tracker</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Industry Reports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">API</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
          © 2026 InvesTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
