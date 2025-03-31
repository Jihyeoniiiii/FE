"use client";
import PawPrints from "./PawPrints";
export default function Paw() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      <div className="w-full max-w-2xl h-[400px] relative">
        <PawPrints />
      </div>
    </main>
  );
}
