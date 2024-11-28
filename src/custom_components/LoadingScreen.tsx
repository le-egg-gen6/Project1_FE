import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h- w-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-white">
        <CardContent className="pt-6 px-6 pb-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-black font-medium">
              Loading ...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingScreen;