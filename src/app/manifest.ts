import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const iconSizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512];

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Walter Nascimento Barroso",
    short_name: "<W/>",
    start_url: "/",
    display: "standalone",
    background_color: "#f3dfe5",
    theme_color: "#441122",
    icons: [
      ...iconSizes.map((size) => ({
        src: `/icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "any" as const,
      })),
      ...[192, 512].map((size) => ({
        src: `/maskable-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "maskable" as const,
      })),
    ],
  };
}
