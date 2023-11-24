import { component$ } from "@builder.io/qwik";
import { Linking_picture } from "../linking-picture";
import { FaLinkedinIn } from "@qwikest/icons/font-awesome"

export const LeadershipTeam = component$(({ data }: { data: any }) => {
    return <div class="flex w-fit flex-wrap gap-12 md:gap-20 m-5 items-center justify-center">
        {data['MembersGrid'].map((member: any, index: any) => (
            <div key={index} class="w-[300px] h-[300px] items-center justify-around flex flex-col">
                <Linking_picture width="w-[200px]" height="h-[200px]" url={member['Picture']['data']['attributes']['url']}
                    alt={member['Picture']['data']['attributes']['alternativeText']} />
                <h1 class="font-bold text-primary-blue text-xl">{member['FirstName']} {member['LastName']}</h1>
                <p class="text-sm text-primary-blue">{member['Position']}</p>
                {member['SocialMedia'].length > 0 && <a href={member['SocialMedia'][0]['Link']}>
                    <div class="h-[30px] w-[30px] flex items-center justify-center bg-white shadow rounded-full p-1.5">
                        <FaLinkedinIn class="fill-primary-blue" />
                    </div>
                </a>}

            </div>
        ))}
    </div>
});