import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../Header/animation";
import styles from "./style.module.scss";

type LinkProps = {
  data: {
    title: string;
    href: string;
    index: number;
  };
};

function LinkComponent({ data }: { data: LinkProps["data"] }) {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={{ scale: 0 }}
        className={styles.indicator}
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}

export default LinkComponent;
