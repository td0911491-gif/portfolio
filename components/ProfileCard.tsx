import Image from "next/image";
export default function ProfileCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Rectangular frame */}
      <div className="relative aspect-[3/4]">
        {/* Inner rectangle */}
        <div className="relative w-full h-full bg-surface-2 overflow-hidden flex items-center justify-center rounded-lg">
          {/* Profile image */}
          <Image
            src="/profile.jpeg"
            alt="Tamoghna Dhar"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority
          />
        </div>
        {/* Status indicator - overlapping bottom */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-red to-red/80 px-6 py-3 rounded-full border-2 border-red shadow-lg z-10">
          <span className="w-3 h-3 rounded-full bg-cream animate-pulse" />
          <span className="text-sm font-bold text-cream tracking-wide">Open to work</span>
        </div>
      </div>
    </div>
  );
}
