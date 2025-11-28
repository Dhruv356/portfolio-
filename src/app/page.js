"use client";
import { useState } from "react";
import HomePage from "./Pages/HomePage";


export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
   const [fadeIn, setFadeIn] = useState(false);

  return (
    <>
      <HomePage/>
    </>
  );
}
