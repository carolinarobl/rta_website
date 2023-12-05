import { component$ } from '@builder.io/qwik';
import { globalAction$ } from '@builder.io/qwik-city';
import {  useForm } from '@modular-forms/qwik';

type TestForm = {
    name:string;
    email:string;
}

export const useSubmitForm = globalAction$(async (data) => {
    console.log(data)
    // Handle the form submission here, e.g., send data to the server or perform any other side effects
});


export const Test1 = component$(() => {
    const submitForm = useSubmitForm();

    const [, { Form}] = useForm<TestForm>({
        loader: {value:{name:'', email:''}},
      });

    return (
        <Form  onSubmit$={() => submitForm}>
            <input name="name" type="text" placeholder="Name" />
            <input name="email" type="email" placeholder="Email" />
            <button type="submit">Submit</button>
        </Form>
    );
});




