import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import RoundedButton from "../../lib/RoundedButton";
import Magnetic from "../../lib/Magnetic";
import styles from "./style.module.scss";

function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  const [date, setDate] = useState(new Date());
  const intervalRef = useRef<NodeJS.Timeout>();

  const updateDate = () => {
    intervalRef.current = setInterval(() => {
      setDate(new Date());
    }, 1000);
  };

  useEffect(() => {
    updateDate();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/background.jpg`} />
            </div>
            <h2>Let&apos;s work</h2>
          </span>
          <h2>together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <RoundedButton
              backgroundColor={"#334BD3"}
              className={styles.button}
            >
              <span>Get in touch</span>
            </RoundedButton>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <RoundedButton>
            <span>carlos_gomes1809@hotmail.com</span>
          </RoundedButton>
          <RoundedButton>
            <span>+54 9 11 2386 6593</span>
          </RoundedButton>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>{date.getFullYear()} © Edition</p>
            </span>
            {/* <span>
              <p>{date.toLocaleTimeString()} GMT-3</p>
            </span> */}
          </div>
          <div>
            <span>
              <h3>Socials</h3>
              <Magnetic>
                <p>Linkedin</p>
              </Magnetic>
            </span>
            <Magnetic>
              <p>Github</p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
