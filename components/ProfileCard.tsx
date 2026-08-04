import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Circular frame with gradient border */}
      <div className="relative aspect-square">
        {/* Outer ring - gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red to-red/30 p-1">
          {/* Inner circle - bg color */}
          <div className="relative w-full h-full rounded-full bg-surface-2 overflow-hidden flex items-center justify-center">
            {/* Profile image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/profile.png"
                alt="Tamoghna Dhar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-surface px-4 py-2.5 rounded-full border border-border shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-red animate-pulse" />
          <span className="text-xs font-semibold text-cream">Open to work</span>
        </div>
      </div>
    </div>
  );
}
