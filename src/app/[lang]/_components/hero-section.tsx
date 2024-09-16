import { HomeHeroSectionProps } from "@/lib/contentful/hero-section-api";
import { cn } from "@/lib/utils";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import HeroForm from "./hero-form";
// import { BLOCKS } from "@contentful/rich-text-types";
// import Link from "next/link";

export default function HeroSection({
  layout,
  heading,
  description,
  formSubmitButton,
  // formNoticeText,
  mediaSection,
}: HomeHeroSectionProps) {
  // const options = {
  //   renderNode: {
  //     [BLOCKS.PARAGRAPH]: (children: any) => {
  //       return (
  //         <p className="mb-2 text-[10px]">
  //           {children?.content[0].value}
  //           <Link href={children?.content[1].data.uri}>
  //             {children?.content[1].content[0].value}
  //           </Link>
  //         </p>
  //       );
  //     },
  //   },
  // };

  return (
    <section
      className={cn(
        "container mx-auto grid grid-cols-1 p-6 lg:grid-cols-2 lg:items-center",
        { "grid-cols-1": layout === "No Image" },
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 lg:col-span-1 lg:mb-0 lg:items-start lg:p-10 xl:p-20",
          {
            "order-2 mt-6": layout === "Left Image and Right Text",
          },
          {
            "order-1 mb-6": layout === "Right Image and Left Text",
          },
        )}
      >
        <h1 className="text-center font-sans text-4xl font-bold leading-none lg:text-left lg:text-5xl lg:leading-tight">
          {heading}
        </h1>
        <p className="mb-6 text-center font-sans text-base lg:text-left lg:text-lg">
          {description}
        </p>
        <HeroForm submitBtnText={formSubmitButton} />
        {/*{documentToReactComponents(formNoticeText, options)}*/}
      </div>
      <Image
        src={mediaSection?.url}
        alt={heading}
        width={800}
        height={480}
        quality={100}
        priority={true}
        className={cn(
          "rounded-2xl object-contain lg:col-span-1 lg:p-10 xl:p-20",
          {
            "order-1": layout === "Left Image and Right Text",
          },
          {
            "order-2": layout === "Right Image and Left Text",
          },
          {
            hidden: layout === "No Image",
          },
        )}
      />
    </section>
  );
}
