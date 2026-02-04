"use client";
import { useState, useRef } from "react";

import Introloading from "./Components/Introloading";
import HomePage from "./Pages/HomePage";
import SkillsPage from "./Pages/Skills";
import ProjectsPage from "./Pages/ProjectPage";
import Footer from "./Components/Footer";
import About from "./Components/About";
import ProcessSection from "./Components/ProcessSection";

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);
  const doneOnce = useRef(false);

  const handleFinish = () => {
    if (doneOnce.current) return;
    doneOnce.current = true;
    setShowIntro(false);
  };

  return (
    <>
      {showIntro ? (
        <Introloading onFinish={handleFinish} />
      ) : (
        <>
          <HomePage />
          <About/>
          <SkillsPage />
          <ProcessSection/>
          <ProjectsPage/>
          <Footer/>
        </>
      )}
    </>
  );
}
