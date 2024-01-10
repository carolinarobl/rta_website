import { $, useOnWindow, useSignal, useVisibleTask$ } from '@builder.io/qwik'

const getNumberOfSlides = ({
    qty,
  }: {
    qty?: number;
  }) => {
    if(qty !== undefined){
        return qty
    }

    else if (typeof window !== 'undefined') {
        const width = window.innerWidth

        if (width > 1200) {
            return 3
        } else if (width > 800) {
            return 2
        }
        else {
            return 1
        }
    } else  {

        return 1
    }  
}

export const useSplide = ({
    slidesQty,
  }: {
    slidesQty?: number;
  }) => {
    const numberOfSlides = useSignal(getNumberOfSlides({ qty: slidesQty }))

    const handleResize = $(() => {
        numberOfSlides.value = getNumberOfSlides({ qty: slidesQty })
    })
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        handleResize()
    })


    useOnWindow(
        'resize',
        $(() => {
            handleResize()
        })
    )

    return numberOfSlides
}