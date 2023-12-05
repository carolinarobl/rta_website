import { component$, useVisibleTask$ } from "@builder.io/qwik";
// import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { useSplide } from "~/hooks/useSplide";
import "@splidejs/splide/css";
import Splide from "@splidejs/splide";

import { type TimelineDefinition, stagger, timeline } from "motion";

export default component$(
  ({
    slides,
    slidesQty,
    duration = 7000,
    hasPagination = true,
    hasArrows = true,
    direction = "ltr",
    addSpace = true,
    id,
  } // bgColor = "transparent",
  : {
    slides: Array<any>;
    slidesQty?: number;
    duration?: number;
    hasPagination?: boolean;
    hasArrows?: boolean;
    direction?: string;
    addSpace?: boolean;
    id?: string;
    // bgColor?: string;
  }) => {
    const numberOfSlides = useSplide({ slidesQty: slidesQty });

    useVisibleTask$(({ track }) => {
      track(numberOfSlides);

      setTimeout(() => {
 
        const options = {
          perPage: numberOfSlides.value,
          interval: duration,
          pagination: hasPagination,
          arrows: hasArrows,
          type: "loop",
          perMove: 1,
          loop: true,
          autoplay: true,
          updateOnMove: true,
          drag: true,
          rewind: true,
          speed: 800,
          padding: "5%",
          direction: direction as "ltr" | "rtl" | "ttb" | undefined,
        };

        const splide = new Splide(
          `${id ? "#" + id : ".splide"}`,
          options,
        ).mount();
        const slides = document.querySelectorAll(
          "li",
        ) as NodeListOf<HTMLElement>;
        const arrows = document.querySelectorAll(
          ".splide__arrow",
        ) as NodeListOf<HTMLElement>;

        const sequence: TimelineDefinition = [
          [
            slides,
            { opacity: [0, 1], y: [-50, 0] },
            { duration: 0.2, delay: stagger(0.1) },
          ],
          [
            arrows,
            { opacity: [0, 1], y: [-50, 0] },
            { duration: 0.2, delay: stagger(0.1) },
          ],
        ];

        timeline(sequence, {});

        splide.on("resize", function () {
          splide.destroy();
          const newSplide = new Splide(
            `${id ? "#" + id : ".splide"}`,
            options,
          ).mount();
          console.log(
            "Al cambiar de tamaño, se volverá a crear el carrusel",
            newSplide,
          );
        });
      }, 50);
    });

    return (
      <>
        <section
          class="splide max-w-screen overflow-hidden"
          id={`${id ? id : ""}`}
          aria-label="Componente Carousel"
        >
          <div class={` splide__track  ${addSpace ? "p-8" : ""}`}>
            <div class="splide__list justify-between">
              {slides.map((element: any, index: number) => (
                <div
                  class="splide__slide items-center bg-transparent"
                  key={index}
                >
                  <div
                    class={` flex items-center object-center ${
                      addSpace ? "mx-2" : ""
                    }  justify-center`}
                  >
                    {element}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  },
);
