import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  title: string
  description: string
}

interface WishStepperProps {
  steps: Step[]
  currentStep: number
}

export function WishStepper({ steps, currentStep }: WishStepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                step.id < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.id === currentStep
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground/30 bg-background text-muted-foreground",
              )}
            >
              {step.id < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
            </div>
            <div className="mt-2 text-center">
              <div
                className={cn(
                  "text-xs font-medium",
                  step.id <= currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn("mx-4 h-0.5 w-12 lg:w-20", step.id < currentStep ? "bg-primary" : "bg-muted-foreground/30")}
            />
          )}
        </div>
      ))}
    </div>
  )
}
