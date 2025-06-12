import type { Signal} from "@builder.io/qwik";
import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { Checkbox } from "../checkbox";
import { CheckboxWithInput } from "../checkboxWithInput";
import { supabase } from "~/utils/supabase";

const id_survey = 2;

//Se define estructura necesaria para el uso de las preguntas de respuesta tipo opcional
type QuestionState = {
    id: number;
    survey_id: number;
    question: string;
    answers: string[];
};

// Función | Consulta para obtener las preguntas de la encuesta indicada
const getQuestions = $(async () => {
    const { data, error } = await supabase.schema('rta_surveys').from('questions').select('*').eq('survey_id', id_survey);

    if (error) {
        console.error("Error en getQuestions: " + error)
        throw error;
    }

    return data;
})

// Función | Consulta para registrar que la encuesta en general ha sido respondida
const insertSurveyAnswers = $(async () => {
    const { data, error } = await supabase.schema('rta_surveys').from('survey_answers').insert([
        {
            survey_id: id_survey,
            created_at: new Date().toISOString()
        }
    ]).select('id');

    if (error) {
        console.log("Error en insertSurveyAnswers: " + error);
        throw error;
    }

    return data;
})

// Función | Consulta para guardar las respuestas del usuario a la encuesta
const insertAnswers = $(async (survey_answers_id: number, question_id: number, answer: string) => {
    const { data, error } = await supabase.schema('rta_surveys').from('answers').insert([
        {
            survey_answers_id,
            question_id,
            answer,
            created_at: new Date().toISOString()
        }
    ])

    if (error) {
        console.log("Error en insertAnswers: " + error);
        throw error;
    }

    return data;
})

export const PopupLeaving = component$(({ signalPopupLeaving,
    signalMainPopup
}: {
    signalPopupLeaving: Signal<boolean>,
    signalMainPopup: Signal<boolean>
}) => {
    //Listado de las preguntas que tienen opciones
    const optionsState = useStore<QuestionState[]> ([]);

    //Listado de las preguntas que son abiertas
    const followupsState= useStore<QuestionState[]> ([]);

    const selectReason = useSignal(false);

    const clickButtonSend = useSignal(false);

    const textboxAnswer: Signal<string> = useSignal("");

    const emailInput: Signal<string> = useSignal('');


    useTask$(async () => {
        const questions = await getQuestions();
        questions.map(question => {
            question.is_radio ?
                optionsState.push(
                    {
                        id: question.id,
                        survey_id: question.survey_id,
                        question: question.question,
                        answers: [question.radio1, question.radio2, question.radio3, question.radio4]
                    }
                ) : followupsState.push(
                    {
                        id: question.id,
                        survey_id: question.survey_id,
                        question: question.question,
                        answers: [question.radio1]
                    }
                )

            }
        );
    })

    const handleClick = $(async () => {
        clickButtonSend.value = true;
        const form = document.getElementById('form-leaving') as HTMLFormElement;
        const data = new FormData(form);
        let selectedAnswer = '';
        const fuindex ="followup-";
        const questions = [...optionsState, ...followupsState];

        data.forEach((value, key)=>{
            
            if (key.includes('answer')) {
                selectedAnswer = value as string;
            }

        })

        const formFilled = selectedAnswer.length > 0 && (
            (selectedAnswer.includes(fuindex) && textboxAnswer.value !== '') ||
            (!selectedAnswer.includes(fuindex))
        );

        try {

            if (formFilled) {
                    selectReason.value = true;

                    const answer = (selectedAnswer.includes(fuindex) ? textboxAnswer.value : selectedAnswer);
                    const questionId = (questions.find(q => selectedAnswer.includes(fuindex) ? q.answers[0] === selectedAnswer.split(fuindex).pop() : q.answers.find(answer => answer === selectedAnswer)))?.id;
                    const surveyAnswer = await insertSurveyAnswers();
                    await insertAnswers(surveyAnswer[0]['id'], questionId ?? 0, answer)
                
                    const emailQuestionId = (questions.find(q => q.question ===  'email'))?.id;
                    
                    if(emailInput.value != '' && emailQuestionId){
                    await insertAnswers(surveyAnswer[0]['id'], emailQuestionId ?? 0, emailInput.value)
                    }
                    

                signalPopupLeaving.value = false;
                signalMainPopup.value = false;
                window.localStorage.setItem('sendform_leaving', "true");
            }

        } catch (error) {
            console.log("Error: " + error);
            throw error
        }
    })

    return  <div class={`fixed flex items-center justify-center h-full w-full bottom-0 left-0 right-0 bg-blue-300 bg-opacity-50 top-0 z-[700]`}>
                
                {/* Contenedor | Caja de survey */}
                <div class="flex flex-col items-center justify-evenly md:h-fit h-[90vh] md:w-1/2 w-[80%] max-w-[600px] bg-[#DFEDFF] rounded-3xl p-5 pb-4 transition-all duration-1000 ease-in-out">

                    {/* Form */}
                    <form id="form-leaving" class="flex flex-col flex-1 overflow-hidden items-center w-full">
                    
                        <div class="flex flex-col gap-4 flex-1 w-full overflow-y-auto pr-2">
                            {optionsState.map((questionState: any, index: number) => (
                            <div class="w-full shrink-0" key={index}>
                                
                                {/* Contenedor de título */}
                                <div class={`w-full ${index == 0 ? "min-h-[100px]" : ""} flex flex-col items-center justify-center bg-gradient-to-tr from-primary-blue to-primary-light-blue rounded-2xl text-white mb-4 p-4 text-center`}>
                                    {index == 0 ? <h2 class="font-bold sm:text-[35px] text-[24px]">Leaving so soon?</h2> : ""}
                                    <p>{questionState.question}</p>
                                </div>

                                {/* Respuestas */}
                                <div class="flex flex-col gap-2">
                                    {questionState.answers.map((answer: string, index: number) => {
                                        const followupQuestion = followupsState.find(followup => followup.answers[0] === answer);
                                    
                                        return followupQuestion
                                            ? <CheckboxWithInput key={index} id={followupQuestion.id} text={answer} description={followupQuestion.question} textareaSignal={textboxAnswer} emailInputSignal={emailInput} />
                                            : <Checkbox key={index} classN="w-full" text={answer} id={questionState.id + "-" + index} />
                                    })}
                                </div>
                            
                            </div>
                            ))}
                        </div>

                    </form>

                    {/* Message | Área mensaje de aviso en caso de querer mandar el survey vacío */}
                    <div class={`w-full rounded-3xl bg-white outline outline-secondary-red bg-opacity-60 text-center mt-1 p-1 text-[12px] text-secondary-red ${clickButtonSend.value && selectReason.value == false ? "" : "hidden"}`}>
                        Please ensure all required fields have been confirmed or completed.
                    </div>

                    

                    {/* Button | Botón de submit */}
                    <button
                        onClick$={() => handleClick()}
                        class="text-white bg-btn-green font-bold py-2 px-4 w-fit h-fit rounded-3xl mt-4">
                            Submit
                    </button>
                </div>

    </div>
});