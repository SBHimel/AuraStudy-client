// components/landing/background-glows.tsx
export function BackgroundGlows() {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none" />
    </>
  );
}