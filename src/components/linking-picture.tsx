import { component$ } from '@builder.io/qwik';
import { setURL } from '~/data/constants';

interface Props {
    size?: string
    color?: string
    url:string
    alt:string
}

export const Linking_picture = component$(({size="250px", color="bg-[#2E5899]",url,alt}:Props) => {
  return <div class={`${color} bg-opacity-50 p-4 h-[${size}] w-[${size}] rounded-full flex items-center justify-center`}>
  <div class={`${color} p-4 rounded-full shadow-md w-full h-full`}>
    <img class="rounded-full" height={250} width={250} src={setURL(url)} alt={alt} />
  </div>
</div>
});