import { QRL, component$, $ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { InitialValues,SubmitHandler,email, minLength, required, useForm } from '@modular-forms/qwik';
import { DownloadBoxImage } from '~/components/download-box-image';
import { FormCarrers } from '~/components/forms/form-carrers';
import { FormPosition } from '~/components/forms/form-position';
import { FormSupport } from '~/components/forms/form-support';
import { Test1 } from '~/components/forms/test';

export default component$(() => {
  return <>
  <DownloadBoxImage></DownloadBoxImage>
  <FormCarrers/>
  <FormPosition></FormPosition>
  <FormSupport></FormSupport>
  </>
});