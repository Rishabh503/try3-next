"use client"
import {useSession,signIn,signOut} from "next-auth/react"

export default function Component(){
    const {data:session}=useSession()
    if(session){
        return(
            <>
            signed in as {session.user.email}
            <button onClick={()=>signOut()}> Sign out</button>
            </>
        )
    }
    return (
        <>
        <h1>not signed in in this padfe</h1>
        <p>pafe</p>
        <button className="p-2 bg-red-400 border-rounded m-10" onClick={()=>signIn()}> Sign out</button>
        </>
    )
}
