import { useEffect, useState } from "react"
import { APIKeyValues, candidateService, getNestedValue, isArrayOfAPIKeyValues, useFetchData } from "../services/apiService"
import InnerHead from "./InnerHead"
import { set } from "lodash"

const CandidateRounds = () => {

    const { dataList, refetch } = useFetchData({ isList: true, apiFn: candidateService.getAll })

    const [candidateRoundCards, setCandidateRoundCards] = useState<APIKeyValues[]>([]);

    useEffect(() => {
        if (!isArrayOfAPIKeyValues(dataList)) return;

        const newRoundCards: APIKeyValues[] = [];

        for (let i = 0; i < dataList.length; i++) {
            if (!newRoundCards[i]) newRoundCards[i] = {};

            set(newRoundCards[i], "id", getNestedValue(dataList[i], "id"))
            set(newRoundCards[i], "userDto.id", getNestedValue(dataList[i], "userDto.id"))
            set(newRoundCards[i], "userDto.profileDto.id", getNestedValue(dataList[i], "userDto.profileDto.id"))
            set(newRoundCards[i], "userDto.qualificationDto.id", getNestedValue(dataList[i], "userDto.qualificationDto.id"))
            set(newRoundCards[i], "userDto.id", getNestedValue(dataList[i], "userDto.id"))
            set(newRoundCards[i], "name", getNestedValue(dataList[i], "userDto.name"))
            set(newRoundCards[i], "status", getNestedValue(dataList[i], "status"))
            set(newRoundCards[i], "interviewStage", getNestedValue(dataList[i], "interviewStage"))
            set(newRoundCards[i], "rejectionReason", getNestedValue(dataList[i], "rejectionReason"))
            set(newRoundCards[i], "profile", getNestedValue(dataList[i], "userDto.profileDto.name"))
        }

        setCandidateRoundCards(newRoundCards);
    }, [dataList])

    const updateCandidate = async (candidateRoundCard: APIKeyValues) => {
        const data = {
            id: candidateRoundCard.id,
            userDto: {
                id: getNestedValue(candidateRoundCard, "userDto.id"),
                qualificationDto: {
                    id: getNestedValue(candidateRoundCard, "userDto.qualificationDto.id")
                },
                profileDto: {
                    id: getNestedValue(candidateRoundCard, "userDto.profileDto.id")
                },
            },
            interviewStage: candidateRoundCard.interviewStage,
            rejectionReason: candidateRoundCard.rejectionReason,
            status: candidateRoundCard.status,
        }

        const response = await candidateService.update(data)

        if (response.data.success) {
            refetch()
        }
    }

    const handleApproveToNextRound = async (candidateRoundCard: APIKeyValues) => {
        const currentStage = candidateRoundCard.interviewStage;
        const nextStage = getNextInterviewStage(currentStage);

        let newStatus = candidateRoundCard.status;

        if (currentStage === "NOT_INITIATED") {
            newStatus = "SHORTLISTED"; // Mark as shortlisted on first round
        } else if (nextStage === null) {
            newStatus = "SELECTED"; // If it's final, mark as selected
        }

        const updatedCard: APIKeyValues = {
            ...candidateRoundCard,
            interviewStage: nextStage ?? currentStage,
            status: newStatus
        };

        await updateCandidate(updatedCard);
    };


    const handleRejectToNextRound = async (candidateRoundCard: APIKeyValues) => {
        const updatedCard: APIKeyValues = {
            ...candidateRoundCard,
            status: "REJECTED",
            rejectionReason: candidateRoundCard.rejectionReason || "Did not meet the criteria"
        };

        await updateCandidate(updatedCard);
    };

    const getNextInterviewStage = (currentStage: string): string | null => {
        switch (currentStage) {
            case "NOT_INITIATED":
                return "ROUND_1";
            case "ROUND_1":
                return "ROUND_2";
            case "ROUND_2":
                return "FINAL";
            case "FINAL":
                return null; // Means candidate will be selected
            default:
                return null;
        }
    };

    const getBadgeColorClass = (status: string) => {
        switch (status) {
            case "APPLIED":
                return "badge-info badge-soft";
            case "SHORTLISTED":
                return "badge-secondary badge-soft";
            default:
                return "badge-neutral";
        }
    }

    const getTextColorClass = (status: string) => {
        switch (status) {
            case "APPLIED":
                return "text-info";
            case "SHORTLISTED":
                return "text-secondary";
            default:
                return "text-error";
        }
    }

    const getRound = (interviewStage: string) => {
        switch (interviewStage) {
            case "NOT_INITIATED":
                return "Not initiated";
            case "FINAL":
                return "Final";
            case "ROUND_2":
                return "Round 2";
            case "ROUND_1":
                return "Round 1";
        }
    }

    const getStatus = (status: string) => {
        switch (status) {
            case "SELECTED":
                return "Selected";
            case "REJECTED":
                return "Rejected";
            case "SHORTLISTED":
                return "Short-Listed";
            case "APPLIED":
                return "Applied";
        }
    }


    const getCandidateRoundCard = (candidateRoundCard: APIKeyValues, key: number) => {
        return (
            <div key={key} className="card bg-base-100 min-h-[10rem] w-[calc(33vw-3rem)] shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-2xl">{candidateRoundCard["name"]} - {candidateRoundCard["profile"]}</h2>
                    <div>
                        <p className={`badge ${getBadgeColorClass(candidateRoundCard["status"])}`}>
                            {getStatus(candidateRoundCard["status"])}
                        </p>
                    </div>

                    {candidateRoundCard["start"] === "REJECTED" &&
                        <h2 className="text-lg">{candidateRoundCard["rejectionReason"]}</h2>
                    }

                    {candidateRoundCard["status"] !== "SELECTED" && candidateRoundCard["status"] !== "REJECTED" &&
                        <>
                            <div className="card-actions justify-end items-center">
                                <h2 className="text-lg">
                                    Interview: <span className={`${getTextColorClass(candidateRoundCard["status"])}`}>{getRound(candidateRoundCard["interviewStage"])}</span>
                                </h2>
                                <svg
                                    className={`scale-150 size-3.5 animate-spin mr-auto ${getTextColorClass(candidateRoundCard["status"])}`}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" > <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" > </circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path > </svg>
                                <button
                                    className="btn btn-success btn-soft"
                                    onClick={() => handleApproveToNextRound(candidateRoundCard)}
                                >Approve</button>
                                <button
                                    className="btn btn-error btn-soft"
                                    onClick={() => handleRejectToNextRound(candidateRoundCard)}
                                >Reject</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }

    const statusOrder: Record<"APPLIED" | "SHORTLISTED" | "SELECTED" | "REJECTED", number> = {
        APPLIED: 0,
        SHORTLISTED: 1,
        SELECTED: 2,
        REJECTED: 3,
    };

    return (
        <div className="overflow-y-auto h-[calc(100vh-16rem)]">
            <div className="sticky top-0 z-1 shadow-2xl wave-body">
                <InnerHead
                    title={"Interview Rounds"}
                    desc={["Keep a check on Interview Rounds", "Passed Candidate will join as Employee"]}
                    content={undefined}
                />
            </div>

            <div className="w-full flex flex-wrap items-center justify-center gap-4 p-4">
                {[...candidateRoundCards]
                    .sort((a, b) => {
                        const statusA = a["status"] as keyof typeof statusOrder;
                        const statusB = b["status"] as keyof typeof statusOrder;
                        return statusOrder[statusA] - statusOrder[statusB];
                    })
                    .map((candidateRoundCard, key) => (
                        getCandidateRoundCard(candidateRoundCard, key)
                    ))}

            </div>

        </div>
    )
}

export default CandidateRounds
