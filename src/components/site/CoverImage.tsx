import { ImageOff } from "lucide-react";
import { useState } from "react";

export function CoverImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-secondary ${className ?? ""}`}
        aria-hidden="true"
      >
        <ImageOff className="size-6 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`size-full object-cover ${className ?? ""}`}
    />
  );
}
