import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = 'https://supa42.rtatel.com'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg0ODI1MjAwLAogICAgImV4cCI6IDE4NDI2NzgwMDAKfQ.Atj9wTNbdEEVPOjstsO14DtxbY2SEpnr50elVXBgAmM'


export const supabase = createClient(SUPABASE_URL,SUPABASE_KEY, 
    { db: { schema: "rta_surveys" } })