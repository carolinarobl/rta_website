import type { Signal} from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const CheckboxWithInput = component$(({
    text,
    classN,
    id,
    description = "",
    textareaSignal,
    emailInputSignal
}: {
    text: string,
    classN?: string,
    id: any,
    description?: string,
    textareaSignal: Signal<string>,
    emailInputSignal: Signal<string>
}) => {

    const isSelected = useSignal(false);
    const textEmpty = useSignal(true);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {

        const form = document.getElementById('form-leaving') as HTMLFormElement;

        form.addEventListener('change', () => {
            const checkbox = document.getElementById(id) as HTMLInputElement;
            isSelected.value = checkbox.checked
        })
    })

    return  <div class={`flex flex-col w-full shadow-2xl p-3 rounded-2xl ${isSelected.value ? "bg-primary-blue text-white" : "bg-white text-primary-dark-blue"}`}>
            
                {/* Container | Contenedor de elementos para radiobutton */}
                <div class={`flex flex-row items-center gap-3 justify-start hover:cursor-pointer ${classN} `}>
                
                    {/* Input | Botón tipo Radio */}
                    <input id={id} name={`answer`} value={"followup-"+text} type="radio" class="peer appearance-none border border-primary-dark-blue w-4 h-4 shrink-0 rounded-full checked:bg-btn-green checked:border-white" 
                    // checked={signal.value}
                    />
            
                    {/* Label | Contenedor de texto de la opción */}
                    <label for={id} class={`hover:cursor-pointer flex flex-col w-full`}>
                
                        {/* Texto | Título de opción/input */}
                        <span class="font-bold">{text}</span>

                    </label>

                </div>

                {/* Container | Contenedor para textbox area opcional */}
                <div class={`${isSelected.value ? "flex flex-col gap-2" : "hidden"}`}>

                    <div class='flex flex-col'>
                        {/* Texto | Descripción de opción/input */}
                        <span class='text-[12px]'>{description != "" ? `(${description})`:null}</span>

                        {/* Input | Textarea */}
                        <textarea
                            rows={3}
                            name={`${id}-textarea`}
                            id={`${id}-textarea`}
                            required={isSelected.value}
                            onInput$={(event) => textareaSignal.value = (event.target as HTMLTextAreaElement).value}
                            class={`appearance-none border rounded-2xl text-primary-dark-blue px-1 text-[15px]
                                ${isSelected.value && textEmpty.value ? "border-secondary-red" : "border-primary-dark-blue"}`} />
                        </div>

                    <div class='flex flex-col'>
                        {/* Texto | Título descriptivo de campo para correo */}
                        <span class='font-semibold text-md'>E-mail</span>
                        <span class='text-[12px]'>Add your e-mail in case you want us to reach to you.</span>
                        
                        {/* Input | Textarea */}
                        <input
                            type="email"
                            name={`mailinput`}
                            id={`mailinput`}
                            onInput$={(event) => emailInputSignal.value = (event.target as HTMLInputElement).value}
                            class={`appearance-none border rounded-full text-primary-dark-blue p-1`} />
                    </div>
                </div>

               
                    
        
        {/* <div class={`w-full rounded-3xl bg-secondary-red bg-opacity-70 text-center mt-1 ${isSelected.value && textEmpty.value ? "" : "hidden"}`}>Specify the reason</div> */}
    </div>
});