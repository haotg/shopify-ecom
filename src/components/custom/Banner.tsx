import Image from "next/image";

interface BannerProps {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export default function Banner({ src, alt, title, subtitle }: BannerProps) {
  return (
    <div className="relative w-full mb-8">
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-2 drop-shadow-lg">
              {title}
            </h1>
            <p className="text-lg md:text-xl drop-shadow-lg">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
