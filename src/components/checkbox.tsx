import { component$, useSignal, useVisibleTask$} from "@builder.io/qwik";

export const Checkbox = component$(
    ({
        text,
        classN,
        id,
    }: {
        text: string,
        classN: string,
        id: string,
    }) => {

        const isSelected = useSignal(false);
        
        // eslint-disable-next-line qwik/no-use-visible-task
        useVisibleTask$(()=>{
            const checkbox = document.getElementById(id) as HTMLInputElement;

            checkbox?.addEventListener('change', ()=>{
                isSelected.value=checkbox.checked
            })
        })

        return <div class={`flex items-center justify-start hover:cursor-pointer ${isSelected.value?"text-white bg-primary-blue":"text-primary-dark-blue bg-white"}  shadow-2xl px-4 rounded-2xl h-[50px] ${classN}`}>
            <input id={id} name={id} value={text} type="checkbox" class={`peer appearance-none border border-primary-dark-blue w-4 h-4 rounded-full mr-[20px] checked:bg-btn-green checked:border-white`} />
            <label for={id} class={`w-full hover:cursor-pointer h-full flex items-center font-bold`}>{text}</label>
        </div>
    });