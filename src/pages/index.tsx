import { Inter } from "next/font/google";
import country from "countryjs";
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
  country: string;
}

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
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

  data.items?.forEach((node) => {
    const { latitude: nodeLat, longitude: nodeLon } = node;
    if (!nodeLat || !nodeLon || !node.country) {
      return;
    }

    let key: string | undefined;

    Object.entries(validators).forEach(([validatorKey, validator]) => {
      const region = country.region(node.country);
      const validatorRegion = country.region(validator.country);

      if (region !== validatorRegion) {
        return;
      }

      if (getDistanceFromLatLonInKm(nodeLat, nodeLon, validator.latitude, validator.longitude) <= 2000) {
        key = validatorKey;
      }
    });

    key = key ?? `${nodeLat}-${nodeLon}`;

    if (!validators[key]) {
      validators[key] = {
        count: 0,
        latitude: nodeLat,
        longitude: nodeLon,
        country: node.country,
      };
    }

    validators[key].count += 1;
  });


  const validatorsValues = Object.values(validators);
  const networks: Array<[[number, number], [number, number]]> = [];

  for (let index = 0; index < validatorsValues.length - 1; index++) {
    const validator1 = validatorsValues[index];
    for (
      let subIndex = index + 1;
      subIndex < validatorsValues.length;
      subIndex++
    ) {
      const validator2 = validatorsValues[subIndex];
      const { latitude: lat1, longitude: lon1 } = validator1;
      const { latitude: lat2, longitude: lon2 } = validator2;

      const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

      if (distance >= 5000 && distance <= 10000) {
        networks.push([
          [lat1, lon1],
          [lat2, lon2],
        ]);
      }
    }
  }

  return {
    props: {
      validators: Object.values(validators),
      networks,
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
  networks,
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
          <Map nodes={validators} networks={networks} />
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
          <span className={styles.break} />
          <Card title="Countries" value={`${countries || 0}+`} />
        </div>
      </div>
    </main>
  );
}
