import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import RoundedButton from "../../lib/RoundedButton";
import styles from "./style.module.scss";

function Description() {
  const phrase =
    "I'm a skilled Frontend/UI Developer with over 2 years of experience and a strong track record of creating visually impressive websites, apps and React Native projects.";
  const phrase2 =
    "I'm currently expanding my expertise to encompass the MERN stack while remaining dedicated to producing exceptional user experiences. Open to new challenges, I'm actively seeking opportunities to contribute my skills and collaborate effectively in innovative projects.";
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div ref={description} className={styles.description}>
      <div data-scroll data-scroll-speed={0.1}>
        <RoundedButton className={styles.button}>
          <span>About me</span>
        </RoundedButton>
      </div>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>

        <hr className={styles.separator} />

        <p>
          {phrase2.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>

        <hr className={styles.separator} />
        
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          The combination of my passion for design, code & interaction positions
          me in a unique place in the web design world.
        </motion.p>
      </div>
    </div>
  );
}

export default Description;
