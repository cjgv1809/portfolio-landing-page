import { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "../Magnetic/Magnetic";
import styles from "./style.module.scss";

function RoundedButton({
  children,
  backgroundColor,
  className,
  download,
  ...rest
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  className?: string;
  download?: boolean;
}) {
  const circle = useRef(null);
  let timeoutId: NodeJS.Timeout | null = null;
  let timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current?.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <a
        className={styles.roundedButton}
        style={{
          overflow: "hidden",
          backgroundColor: backgroundColor ? "#455CE9" : "transparent",
        }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        href={download ? "/resume.pdf" : ""}
        download={download ? "resume.pdf" : undefined}
        {...rest}
      >
        {children}
        <span
          ref={circle}
          style={{
            backgroundColor: "#455CE9",
          }}
          className={styles.circle}
        ></span>
      </a>
    </Magnetic>
  );
}

export default RoundedButton;
