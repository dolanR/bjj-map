import { FC, useEffect, useRef, useState } from "react";
import getEvents from "@/getevents";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHVkZXk3ZnR3IiwiYSI6ImNsb3Fmc3dlbTA2bzcyaW1rZnd0MGZuMnoifQ.Tv9vopthxwZ6Rm2-T0PTIQ";

const Home: FC = () => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const data = getEvents();
    data.then((res) => {
      console.log(res);
    });

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/dudey7ftw/clorjbiid00gs01qneji795zj",
      center: [-79.0377, 43.0962],
      zoom: 6,
    });
  }, []);
  return (
    <>
      <div>
        <div ref={mapContainer} className="h-[calc(100vh-168px)]" />
      </div>
    </>
  );
};

export default Home;
