import { component$ } from "@builder.io/qwik";

export const Home = component$(({ data }) => {
  const pageHome = data["pageHome"];
  const zaneRaces = data["zaneRaces"];

  return <div>Home</div>;
});
