import { QRL, component$, $ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { InitialValues,SubmitHandler,email, minLength, required, useForm } from '@modular-forms/qwik';
import { FormCarrers } from '~/components/forms/form-carrers';
import { FormPosition } from '~/components/forms/form-position';


type LoginForm = {
  email: string;
  password: string;
};

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => {
  return {
    email: '',
    password: '',
  };
});

export const Test = component$(() => {
    const [loginForm, { Form, Field }] = useForm<LoginForm>({
      loader: useFormLoader(),
    });

    const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values)=>{
      console.log(values.email)
      return values
    });

    return <Form onSubmit$={handleSubmit}>
        <Field name ="email"
        validate={[
        required("Agrega este campo"),
        email("No es un correo valido")]}>
            {(field, props)=> (
                <div>
                  <label for={field.name}>Email</label>
                  <input
                    {...props}
                    id={field.name}
                    value={field.value}
                    type="email"
                    required
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
            )}
        </Field>
        <Field name="password"
        validate={[
          required("ingresa una contraseña"),
          minLength(9, "tu contraseña debe de tener 9 caracteres o más")
        ]}>
            {(field, props)=> (
              <div>
                  <label for={field.name}>Password</label>
                  <input
                    {...props}
                    id={field.name}
                    value={field.value}
                    type="password"
                    required
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
            )}
        </Field>
        <button type="submit">Login</button>
    </Form>
  });

export default component$(() => {
  return <>
  <Test></Test>
  <FormCarrers/>
  <FormPosition></FormPosition>
  </>
});