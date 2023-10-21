import { Inter } from "next/font/google";
import { InferGetServerSidePropsType } from "next";
import { Card, Container, Map } from "@/components";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
interface Validator {
  stake?: number;
  country?: string;
  latitude?: number;
  id?: string;
  longitude?: number;
}
interface DataList {
  countriesCount?: number;
  count?: number;
  items?: Validator[];
  totalStake?: number;
}

interface Node {
  count: number;
  latitude: number;
  longitude: number;
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://wtfomotydwju2q6x6zjjhlswmi0cczub.lambda-url.eu-central-1.on.aws/"
  );
  const data: DataList = await res.json();
  const count = data?.count;
  const countries = data?.countriesCount;
  const validators: Record<string, Node> = {};
  const totalStake = data?.totalStake;
  if (data.items) {
    data.items.forEach((node) => {
      if (!node.latitude || !node.longitude) {
        return;
      }
      validators[`${node.latitude}-${node.longitude}`] = {
        count:
          (validators[`${node.latitude}-${node.longitude}`]?.count || 0) + 1,
        latitude: node.latitude,
        longitude: node.longitude,
      };
    });
  }

  return {
    props: {
      validators: Object.values(validators),
      totalStake,
      count,
      countries,
    },
  };
};

const formatStake = (value: number) =>
  Math.round(value).toLocaleString("RU-ru").replace(",", " ");
const formatter = Intl.NumberFormat("en", { notation: "compact" });
export default function Home({
  validators,
  totalStake,
  count,
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className={inter.className}>
      <div className={styles.wrapper}>
        <span className={styles.title}>
          Validator nodes are distributed all around the world
        </span>
        <Container className={styles.map}>
          <Map nodes={validators} />
        </Container>
        <div className={styles.cards}>
          <Card
            title="Total stake"
            value={`${formatStake((totalStake || 0) / 1_000_000_000)} TON`}
            className={styles.stake}
          />
          <Card
            title="Total stake"
            value={`${formatter.format((totalStake || 0) / 1_000_000_000)}+`}
            className={styles.stakeMobile}
          />
          <Card title="Nodes" value={`${count || 0}+`} />
          <Card title="Countries" value={`${countries || 0}+`} />
        </div>
      </div>
    </main>
  );
}
