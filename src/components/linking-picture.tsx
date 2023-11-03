import { component$ } from '@builder.io/qwik';

interface Props {
    size?: string
    color?: string
}

export const Linking_picture = component$(({size="350px", color="#2E5899"}:Props) => {
  return <div style={{width:size, height:size}} class={`bg-[${color}] bg-opacity-75 rounded-full p-6 items-center justify-center flex`}>
    <div style={{width:size, height:size}} class={`bg-[${color}] rounded-full`}>  </div>
  </div>
});