import { JSX, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./style.module.scss";
import RoundedButton from "@/lib/RoundedButton";

const phrase =
  "I'm Carlos Gomes, a skilled Frontend/UI Developer with over 2 and a half years of experience";

function IntroText() {
  const refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);
  const refsSpan = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: `top 85%`,
        end: `top 75%`,
      },
      opacity: 1,
      ease: "none",
      stagger: 5,
    });
  };

  const splitWords = (phrase: string) => {
    let body: JSX.Element[] = [];

    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(<span key={word + "_" + i}>{letters}</span>);
    });

    return body;
  };

  const splitLetters = (word: string) => {
    let letters: JSX.Element[] = [];

    word.split("").forEach((letter: string, i: number) => {
      letters.push(
        <span
          key={letter + "_" + i}
          ref={(el) => {
            refsSpan.current.push(el!);
          }}
        >
          {letter}
        </span>
      );
    });

    return letters;
  };

  return (
    <div ref={container} className={styles.main}>
      <p ref={body} className={styles.body}>
        {splitWords(phrase)}
      </p>
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
