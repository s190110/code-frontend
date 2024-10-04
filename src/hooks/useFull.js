import React, { useEffect, useState } from "react";

const useFull = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("error entering full screen");
      });
    } else {
      document.exitFullscreen();
    }
  };
  const handleFullscreenChange = () => {
    console.log(document.fullscreenElement);
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    toggleFullscreen();
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  return { toggleFullscreen, isFullscreen };
};

export default useFull;

// useEffect(() => {
//   const handleFullscreen = () => {
//     if (document.fullscreenElement) setIsFullscreen(true);
//     else setIsFullscreen(false);
//   };
//   window.addEventListener("fullscreenchange", handleFullscreen);
//   return () =>
//     window.removeEventListener("fullscreenchange", handleFullscreen);
// }, []);
// useEffect(() => {

// }, [isFullscreen]);
