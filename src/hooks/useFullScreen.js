import React, { useState } from "react";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          console.log(isFullscreen);
        })
        .catch((err) => {
          console.log("error entering full screen");
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
      console.log(isFullscreen)
    }
  };

  // Listen for fullscreen change events to update the state
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  React.useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    toggleFullscreen();
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return { toggleFullscreen, isFullscreen };
};

export default FullscreenButton;
