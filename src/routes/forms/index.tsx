import { component$ } from '@builder.io/qwik';
import { DownloadBoxImage } from '~/components/download-box-image';
import { FormCarrers } from '~/components/forms/form-carrers';
import { FormPosition } from '~/components/forms/form-position';
import { FormSupport } from '~/components/forms/form-support';

export default component$(() => {
  return <>
  <DownloadBoxImage></DownloadBoxImage>
  <FormCarrers/>
  <FormPosition></FormPosition>
  <FormSupport></FormSupport>
  </>
});