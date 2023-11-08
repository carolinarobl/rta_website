import { component$ } from "@builder.io/qwik";

export const PrivacyPolicy = component$(({ data }) => {
    // console.log(data['TextContent'])
    return <div class="p-6">
        <script type="module" src="https://md-block.verou.me/md-block.js"></script>
        <h1 class="text-primary-blue text-center font-semibold text-2xl mb-4">{data['Titles'][0]['Text']}</h1>
        <md-block class="mb-4 space-x-4 tracking-wider text-primary-blue font-normal text-base">{data['TextContent']}</md-block>
    </div>
});