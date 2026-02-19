import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
}

export default function OnboardingSlide({
  title,
  description,
  image,
  imageWidth = 300,
  imageHeight = 300,
  priority = false,
}: Props) {
  return (
    <div className="min-w-full snap-center flex flex-col items-center text-center">
      <div className="px-6 w-full flex flex-col items-center">
        <h1 className="text-primary-dark text-h1_sb mb-4">{title}</h1>

        <p className="text-primary-dark text-h3_m mb-24">{description}</p>

        <div className="w-full flex justify-center">
          <Image
            src={image}
            alt="slide"
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            className="max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
