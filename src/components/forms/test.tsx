import { component$ } from '@builder.io/qwik';
import { Form, globalAction$ } from '@builder.io/qwik-city';
import { formAction$, useForm } from '@modular-forms/qwik';

type TestForm = {
    name:string;
    email:string;
    file:File | null;
}

export const useSubmitForm = globalAction$(async (data) => {
    // Handle the form submission here, e.g., send data to the server or perform any other side effects
    console.log('Form submitted:', data.name);
});


export const Test1 = component$(() => {
    const submitForm = useSubmitForm();

    const [testForm, { Form, Field}] = useForm<TestForm>({
        loader: {values:{name:'', email:''}},
      });

    return (
        <Form onsubmit={submitForm}>
            <input name="name" type="text" placeholder="Name" />
            <input name="email" type="email" placeholder="Email" />
            <button type="submit">Submit</button>
        </Form>
    );
});