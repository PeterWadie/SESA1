import CommonButton from "../General/CommonButton";
import CommonTitle from "../General/CommonTitle";

export default function ({
  children,
  titles,
  backgroundImage = true,
  projects = false,
}) {
  return (
    <section
      className="pt-36 bg-neutral-1000"
      {...(backgroundImage && {
        style: {
          backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDINARY_MEDIA_SERVER}/patterns/horizontal)`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        },
      })}
    >
      <div className="container mx-auto px-4">
        <CommonTitle titles={titles} projects={projects} />
        {children}
        <CommonButton />
      </div>
    </section>
  );
}
