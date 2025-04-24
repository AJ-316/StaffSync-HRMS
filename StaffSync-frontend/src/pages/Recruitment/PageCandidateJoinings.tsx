import { ChatBubbleLeftRightIcon, DocumentPlusIcon, RocketLaunchIcon } from "@heroicons/react/24/solid"
import Header from "../../components/PageHeader/Header"
import CandidateFormFill from "../../components/CandidateFormFill"
import CandidateRounds from "../../components/CandidateRounds"
import CandidateJoining from "../../components/CandidateJoining"

const PageCandidateJoinings = () => {
  return (
    <div className="main-div">
      <Header />
      
      <div className="tabs tabs-border tabs-xl mt-5 justify-center h-[calc(100vh-15rem)] ">
        <label role="tab" className="tab tab-scale">
          <input type="radio" name="tabs-candidate-joining" />
          <DocumentPlusIcon className="w-4.5 h-4.5 mr-1"/> Fill Form
        </label>
        <div className="tab-content content-div wave-body">
          <CandidateFormFill />
        </div>

        <label className="tab tab-scale">
          <input type="radio" name="tabs-candidate-joining" defaultChecked />
          <ChatBubbleLeftRightIcon className="w-4.5 h-4.5 mr-1"/> Rounds
        </label>
        <div className="tab-content scroll-content-div wave-body">
          <CandidateRounds />
        </div>

        <label className="tab tab-scale">
          <input type="radio" name="tabs-candidate-joining" />
          <RocketLaunchIcon className="w-4.5 h-4.5 mr-1"/> Joining
        </label>
        <div className="tab-content scroll-content-div wave-body">
          <CandidateJoining />
        </div>
      </div>
    </div>
  )
}

export default PageCandidateJoinings
