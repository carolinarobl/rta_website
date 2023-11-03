import { component$ } from '@builder.io/qwik';
import { FormCarrers } from '~/components/forms/form-carrers';
import { FormPosition } from '~/components/forms/form-position';
import { FormSupport } from '~/components/forms/form-support';

export default component$(() => {
  return <>
  <FormCarrers/>
  <FormPosition></FormPosition>
  <FormSupport></FormSupport>
  </>
});