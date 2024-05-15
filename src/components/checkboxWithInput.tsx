import { Signal, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const CheckboxWithInput = component$(({
    text,
    classN,
    id,
    description = "",
    signal
}: {
    text: string,
    classN?: string,
    id: any,
    description?: string,
    signal: Signal<boolean>
}) => {

    const isSelected = useSignal(false);
        
        // eslint-disable-next-line qwik/no-use-visible-task
        useVisibleTask$(()=>{
            const checkbox = document.getElementById(id) as HTMLInputElement;
            const othersTextArea = document.querySelector<HTMLTextAreaElement>('textarea');

            othersTextArea?.addEventListener('input', ()=>{
                if (othersTextArea?.value != null && othersTextArea?.value != "") {
                    isSelected.value = true
                } else {
                    isSelected.value = false
                }
            })

            checkbox?.addEventListener('change', ()=>{
                isSelected.value=checkbox.checked
            })
        })

    return <div class={`flex flex-col w-full  shadow-2xl px-4 rounded-2xl ${isSelected.value?"bg-primary-blue text-white":"bg-white text-primary-dark-blue"}`}>
        <div class={`flex items-center justify-start hover:cursor-pointer h-[50px] ${classN}`}>
            <input id={id} name={id} type="checkbox" class="peer appearance-none border border-primary-dark-blue w-4 h-4 rounded-full mr-[20px] checked:bg-btn-green checked:border-white" checked={signal.value}/>
            <label for={id} class={`${description ? "w-fit" : "w-full"} hover:cursor-pointer h-full flex items-center font-bold `}>{text}</label>
            {description != "" ? <label for={id} class="hover:cursor-pointer w-full h-full flex items-center font-light">{`(${description})`}</label>
                : null}
        </div>
        <textarea rows={3} name={`${id}-textarea`} id={`${id}-textarea`} class="appearance-none border border-primary-dark-blue rounded-2xl text-primary-dark-blue px-1" />
    </div>
});