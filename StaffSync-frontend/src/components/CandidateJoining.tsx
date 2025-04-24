import { useEffect, useState } from "react"
import { APIKeyValues, candidateService, employeeService, getNestedValue, isArrayOfAPIKeyValues, useFetchData } from "../services/apiService"
import InnerHead from "./InnerHead"
import { set } from "lodash"

const CandidateRounds = () => {

    const { dataList } = useFetchData({ isList: true, apiFn: candidateService.getAll })

    const [candidateRoundCards, setCandidateRoundCards] = useState<APIKeyValues[]>([]);

    useEffect(() => {
        if (!isArrayOfAPIKeyValues(dataList)) return;

        const newRoundCards: APIKeyValues[] = [];

        for (let i = 0; i < dataList.length; i++) {
            if (!newRoundCards[i]) newRoundCards[i] = {};

            set(newRoundCards[i], "id", getNestedValue(dataList[i], "id"))
            set(newRoundCards[i], "userDto.id", getNestedValue(dataList[i], "userDto.id"))
            set(newRoundCards[i], "name", getNestedValue(dataList[i], "userDto.name"))
            set(newRoundCards[i], "status", getNestedValue(dataList[i], "status"))
            set(newRoundCards[i], "interviewStage", getNestedValue(dataList[i], "interviewStage"))
            set(newRoundCards[i], "rejectionReason", getNestedValue(dataList[i], "rejectionReason"))
            set(newRoundCards[i], "profile", getNestedValue(dataList[i], "userDto.profileDto.name"))
            set(newRoundCards[i], "joinDate", "")
        }

        setCandidateRoundCards(newRoundCards);
    }, [dataList])

    const handleJoining = async (candidateRoundCard: APIKeyValues) => {
        console.log(candidateRoundCard)

        const joinDateStr = candidateRoundCard["joinDate"];
        if (!joinDateStr) {
            alert("Joining date is required.");
            return;
        }

        const joiningDate = new Date(joinDateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (joiningDate < today) {
            alert("Joining date cannot be in the past.");
            return;
        }

        const response = await candidateService.delete(Number.parseInt(candidateRoundCard["id"]))

        if (!response.data.success) {
           console.log(response.data.message)
           return;
        }

        const employeeData = {
            userDto: {
                id: getNestedValue(candidateRoundCard, "userDto.id"),
                qualificationDto: {
                    id: getNestedValue(candidateRoundCard, "userDto.qualificationDto.id")
                },
                profileDto: {
                    id: getNestedValue(candidateRoundCard, "userDto.profileDto.id")
                },
            },
            joinDate: candidateRoundCard["joinDate"]
        }

        await employeeService.add(employeeData);
    }

    const getCandidateRoundCard = (candidateRoundCard: APIKeyValues, key: number) => {
        return (
            <div key={key} className="card bg-base-100 min-h-[10rem] w-[calc(33vw-3rem)] shadow-sm">
                <div className="card-title m-5">
                    {candidateRoundCard["name"]} - {candidateRoundCard["profile"]}
                    <p className="badge badge-neutral">Selected</p>
                </div>

                <div className="card-body m-5 mt-0">
                    Ready To Join from:
                    <input
                        type="date"
                        className="input"
                        onChange={(e) => {
                            candidateRoundCard["joinDate"] = e.target.value;
                        }}
                    />
                    <button
                        type="button"
                        className="btn btn-soft btn-accent"
                        onClick={() => handleJoining(candidateRoundCard)}
                    >
                        Initiate
                    </button>
                </div>
            </div>
        )
    }

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
                {candidateRoundCards.map((candidateRoundCard, key) => (
                    candidateRoundCard["status"] === "SELECTED" &&
                    getCandidateRoundCard(candidateRoundCard, key)
                ))}
            </div>

        </div>
    )
}

export default CandidateRounds
