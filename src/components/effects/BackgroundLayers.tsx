import ThreeBackground from "./ThreeBackground";
import CursorRimLight from "./CursorRimLight";

export default function BackgroundLayers() {
  return (
    <>
      <ThreeBackground />
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute -bottom-[40vh] -left-[20vw] w-[80vw] h-[80vh] bg-[var(--color-red-dim)] blur-[200px] opacity-30 rounded-full mix-blend-screen pointer-events-none"></div>
      </div>
      <CursorRimLight />
    </>
  );
}
