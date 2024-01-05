import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const Slider = component$(() => {
  const images = ['https://images.unsplash.com/photo-1693825948507-acd866203fae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D', 
  'https://images.unsplash.com/photo-1694476053120-d729a3f6a7ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D', 
  'https://images.unsplash.com/photo-1695256294687-5df561945542?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D'];
  const index = useSignal(0);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async (taskCtx) => {
    const timer = setInterval(() => {
      index.value = (index.value + 1) % images.length;
    }, 2000);

    taskCtx.cleanup(() => {
      clearInterval(timer);
    });
  });

  return (
    <div>
      <img class="transition-opacity duration-2000 ease-in-out opacity-100" src={images[index.value]} alt="Slider" width={150} height={150} />
    </div>
  );
});