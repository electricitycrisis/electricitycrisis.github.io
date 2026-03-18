import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary font-mono-code">
          404
        </h1>
        <p className="mb-2 font-mono-code text-sm text-muted-foreground tracking-widest">
          // ROUTE_NOT_FOUND
        </p>
        <p className="mb-8 text-xs text-muted-foreground/60">
          The requested path <code className="text-primary/60">{location.pathname}</code> does not exist.
        </p>
        <a
          href="/"
          className="inline-block font-mono-code text-xs text-primary hover:text-primary/80 border border-primary/30 px-4 py-2 clip-industrial transition-colors hover:bg-primary/10"
        >
          ← RETURN TO HOME
        </a>
      </div>
    </div>
  );
};

export default NotFound;
