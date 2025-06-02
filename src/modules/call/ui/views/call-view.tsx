"use client";
import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface Props {
    meeetingId: string
}
export const CallView = ({ meeetingId }: Props) => {
    const trpc = useTRPC();
    const {data}=useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meeetingId}));
    if(data.status==="completed"){
        return(
            <div className="h-screen flex items-center justify-center">
                <ErrorState
                title="Meeting has Ended"
                description="Thank you for joining the meeting"
                />
            </div>
        )
    }
    return <CallProvider meetingId={meeetingId} meetingName={data.name} />
}