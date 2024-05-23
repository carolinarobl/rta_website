import { $, Signal, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { Checkbox } from "../checkbox";
import { CheckboxWithInput } from "../checkboxWithInput";
import { supabase } from "~/utils/supabase";
import { server$ } from "@builder.io/qwik-city";


const getQuestions = server$(async (isSelectedOther: boolean) => {
    const { data, error } = await supabase.from('questions').select('*').eq('id', isSelectedOther ? 11 : 10);

    if (error) {
        console.error("Error en getQuestions: " + error)
        throw error;
    }

    return data;
})

const insertSurveyAnswers = server$(async () => {
    const { data, error } = await supabase.from('survey_answers').insert([
        {
            survey_id: 2,
            created_at: new Date().toISOString()
        }
    ]).select('id');

    if (error) {
        console.log("Error en insertSurveyAnswers: " + error);
        throw error;
    }

    return data;
})

const insertAnswers = server$(async (survey_answers_id: number, question_id: number, answer: string) => {
    const { data, error } = await supabase.from('answers').insert([
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

    const questionState = useStore({
        id: 0,
        survey_id: 0,
        question: "",
        answers: ["", "", "", ""]
    })

    const isSelectedOther = useSignal(false);
    const selectReason = useSignal(false);
    const clickButtonSend = useSignal(false);

    const reasonOther: Signal<string> = useSignal("");

    const othersTextArea = document.querySelector<HTMLTextAreaElement>('textarea');

    othersTextArea?.addEventListener('input', () => {
        if (othersTextArea?.value != null && othersTextArea?.value != "") {
            isSelectedOther.value = true
            reasonOther.value = othersTextArea?.value
        } else {
            isSelectedOther.value = false
        }
    })

    useTask$(async () => {
        const questions = await getQuestions(false);
        questions.map(question => {
            questionState.id = question.id,
                questionState.survey_id = question.survey_id,
                questionState.question = question.question,
                questionState.answers = [question.radio1, question.radio2, question.radio3, question.radio4]
        });
    })

    const handleClickExit = $(async () => {
        signalPopupLeaving.value = false;
    });

    const handleClick = $(async () => {
        clickButtonSend.value = true;

        const form = document.getElementById('form-leaving') as HTMLFormElement;
        const data = new FormData(form);
        let selectedAnswer = '';

        data.forEach((value, key)=>{
            if(key=='answer'){
                selectedAnswer = value as string;
            }
        })
        console.log(selectedAnswer);

        try {
            if (selectedAnswer == "on" && isSelectedOther.value && reasonOther.value != "") {
                selectReason.value = true;
                const questionsOther = await getQuestions(true);
                const questionIdOther = questionsOther[0]['id'];
                const idSurverAnswer = await insertSurveyAnswers();
                await insertAnswers(idSurverAnswer[0]['id'], questionIdOther, reasonOther.value)
            }

            if (selectedAnswer != "on") {
                selectReason.value = true;
                const surveyAnswer = await insertSurveyAnswers();
                await insertAnswers(surveyAnswer[0]['id'], questionState.id, selectedAnswer)
            }

            if (selectReason.value) {
                signalPopupLeaving.value = false;
                signalMainPopup.value = false;
                window.localStorage.setItem('sendform_leaving', "true");
            }

        } catch (error) {
            console.log("Error: " + error);
            throw error
        }
    })

    return <div class={`fixed flex items-center justify-center h-full w-full bottom-0 left-0 right-0 bg-blue-300 bg-opacity-50 top-0 z-[700]`}>
        <div class="flex flex-col items-center justify-evenly sm:h-[80%] h-fit md:w-1/2 w-[80%] bg-[#DFEDFF] rounded-2xl px-5 pb-4 transition-all duration-1000 ease-in-out">
            <div onClick$={() => handleClickExit()} class="ml-auto text-3xl font-bold text-[#8AA7D2] cursor-pointer">×</div>
            <div class="w-full h-[20%] flex flex-col items-center justify-center bg-gradient-to-tr from-primary-blue to-primary-light-blue rounded-3xl text-white mb-6 p-4 text-center">
                <h2 class="font-bold sm:text-[35px] text-[24px]">Leaving so soon?</h2>
                <p>{questionState.question}</p>
            </div>
            <div class={`w-full rounded-3xl bg-secondary-red bg-opacity-70 text-center mt-1 ${clickButtonSend.value && selectReason.value == false ? "" : "hidden"}`}>
                Select an option
            </div>
            <form id="form-leaving" class="flex flex-col items-center justify-between h-[50%] w-full">
                {
                    questionState.answers.map((answer: string, index: number) => (
                        index == 3 ? <CheckboxWithInput key={index} id={index} text={answer} description="Please, specify the reason" signal={isSelectedOther} classN="mt-1" /> : <Checkbox key={index} classN="w-full my-1" text={answer} id={`checkbox-1-${index}`}/>
                    ))
                }
            </form>
            <button
                onClick$={() => handleClick()}
                class="text-white bg-btn-green font-bold py-2 px-4 w-fit h-fit rounded-3xl mt-4">Submit</button>
        </div>

    </div>
});