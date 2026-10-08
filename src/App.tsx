import { GithubSkyline } from "@/components/github-skyline"
import TornPostcardPortfolio from "@/components/ui/torn-postcard-portfolio"
import { resume } from "@/data/resume"

export default function App() {
  return (
    <main className="w-full">
      <TornPostcardPortfolio {...resume} />
      <GithubSkyline />
    </main>
  )
}
