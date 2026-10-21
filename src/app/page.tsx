import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { MenuSection } from "@/components/menu-section";
import { OrderCta } from "@/components/order-cta";
import { Reviews } from "@/components/reviews";
import { Signatures } from "@/components/signatures";
import { Visit } from "@/components/visit";

export default function Home() {
  return (
    <main id="content">
      <Hero />
      <Marquee />
      <Signatures />
      <MenuSection />
      <Reviews />
      <About />
      <Gallery />
      <Visit />
      <OrderCta />
    </main>
  );
}
