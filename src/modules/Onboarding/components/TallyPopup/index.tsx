/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import styles from "./styles.module.scss";

const options = {
  formId: "w8rXxo",
  popup: {
    width: 900,
    emoji: {
      text: "👋",
      animation: "wave",
    },
    layout: "modal",
  },
};
export const TallyPopup = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    (window as any).TallyConfig = options;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.OnboardingScreen}>
      <button
        onClick={() =>
          (window as any).Tally.openPopup("w8rXxo", {
            width: 900,
            layout: "modal",
            emoji: {
              text: "👋",
              animation: "wave",
            },
          })
        }
      >
        Finish onboarding
      </button>
    </div>
  );
};
