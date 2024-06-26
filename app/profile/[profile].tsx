import React from "react";
import { useLocalSearchParams } from "expo-router";
import Jefri from "../../components/Jefri";
import Yusuf from "../../components/Yusuf";
import Agus from "../../components/Agus";

export default function profile() {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  if (profile === "1") {
    return <Jefri />;
  } else if (profile === "2") {
    return <Yusuf />;
  } else if (profile === "3") {
    return <Agus />;
  }
}
