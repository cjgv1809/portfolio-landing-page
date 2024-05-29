import { JSX, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./style.module.scss";
import RoundedButton from "@/lib/RoundedButton";

const phrase =
  "I'm Carlos Gomes, a skilled Frontend/UI Developer with over 2 and a half years of experience";

function IntroText() {
  const refs = useRef<HTMLSpanElement[]>([]);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    if (!container.current) return;

    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: "top 65%",
        end: "top 95%",
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  };

  const splitWords = (phrase: string) => {
    return phrase.split(" ").map((word, i) => (
      <span key={word + "_" + i}>
        {splitLetters(word)}
        &nbsp;
      </span>
    ));
  };

  const splitLetters = (word: string) => {
    return word.split("").map((letter, i) => (
      <span
        key={letter + "_" + i}
        ref={(el) => {
          if (el) refs.current.push(el);
        }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div ref={container} className={styles.main}>
      <p className={styles.body}>{splitWords(phrase)}</p>
      <div className={styles.btnContainer}>
        <RoundedButton backgroundColor="#334BD3">
          <span>Contact me</span>
        </RoundedButton>
        <RoundedButton download>
          <span>Download CV</span>
        </RoundedButton>
      </div>
    </div>
  );
}

export default IntroText;
