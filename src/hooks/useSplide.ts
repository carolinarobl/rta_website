import { $, useOnWindow, useSignal, useVisibleTask$ } from '@builder.io/qwik'

const getNumberOfSlides = () => {

    if (typeof window !== 'undefined') {
        const width = window.outerWidth

        if (width > 1200) {
            return 3
        } else if (width > 800) {
            return 2
        }
        else {
            return 1
        }
    } else  {
        return 3
    }  
}

export const useSplide = () => {
    const numberOfSlides = useSignal(getNumberOfSlides)

    const handleResize = $(() => {
        numberOfSlides.value = getNumberOfSlides()
    })

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