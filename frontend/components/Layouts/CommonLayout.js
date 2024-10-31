export default function ({ children, backgroundImage = true }) {
  return (
    <section
      className="py-44 bg-neutral-1000"
      {...(backgroundImage && {
        style: {
          backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDINARY_MEDIA_SERVER}/patterns/horizontal)`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        },
      })}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
