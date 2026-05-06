export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-serif italic text-lg">Coverly</span>
          <div className="flex items-center gap-4">
            <a
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/signin"
              className="text-sm font-medium hover:opacity-80 transition-opacity bg-foreground text-background px-4 py-1.5 rounded-md"
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
