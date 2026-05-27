import BackgroundLayers from "@/components/effects/BackgroundLayers";
import PageTransition from "@/components/ui/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundLayers />
      <SmoothScroll>
        <PageTransition>
          {children}
        </PageTransition>
      </SmoothScroll>
    </>
  );
}
