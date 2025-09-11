"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/file-upload"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle, Clock, AlertCircle, Upload, Eye, RefreshCw, Info } from "lucide-react"

// Sample verification data
const verificationSteps = [
  {
    id: "identity",
    title: "Identity Verification",
    description: "Upload a government-issued ID (passport, driver's license, national ID)",
    status: "completed",
    completedAt: "2024-01-08",
    documents: ["passport.jpg"],
    required: true,
  },
  {
    id: "selfie",
    title: "Selfie Verification",
    description: "Take a selfie holding your ID document",
    status: "completed",
    completedAt: "2024-01-08",
    documents: ["selfie_with_id.jpg"],
    required: true,
  },
  {
    id: "address",
    title: "Address Verification",
    description: "Upload a utility bill or bank statement (not older than 3 months)",
    status: "pending",
    submittedAt: "2024-01-09",
    documents: ["utility_bill.pdf"],
    required: false,
  },
  {
    id: "phone",
    title: "Phone Verification",
    description: "Verify your phone number via SMS",
    status: "completed",
    completedAt: "2024-01-07",
    required: true,
  },
  {
    id: "email",
    title: "Email Verification",
    description: "Verify your email address",
    status: "completed",
    completedAt: "2024-01-07",
    required: true,
  },
]

const statusConfig = {
  completed: {
    label: "Verified",
    color: "bg-secondary text-secondary-foreground",
    icon: CheckCircle,
    description: "This step has been completed and verified",
  },
  pending: {
    label: "Under Review",
    color: "bg-accent text-accent-foreground",
    icon: Clock,
    description: "Your documents are being reviewed by our team",
  },
  rejected: {
    label: "Rejected",
    color: "bg-destructive text-destructive-foreground",
    icon: AlertCircle,
    description: "Please resubmit with correct documents",
  },
  not_started: {
    label: "Not Started",
    color: "bg-muted text-muted-foreground",
    icon: Upload,
    description: "Click to start this verification step",
  },
}

export function DashboardVerification() {
  const [uploadingStep, setUploadingStep] = useState<string | null>(null)

  const completedSteps = verificationSteps.filter((step) => step.status === "completed").length
  const totalSteps = verificationSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const requiredSteps = verificationSteps.filter((step) => step.required)
  const completedRequiredSteps = requiredSteps.filter((step) => step.status === "completed").length
  const isBasicVerificationComplete = completedRequiredSteps === requiredSteps.length

  const handleFileUpload = (stepId: string, files: File | File[]) => {
    setUploadingStep(stepId)
    // Simulate upload
    setTimeout(() => {
      setUploadingStep(null)
      console.log(`Uploaded files for ${stepId}:`, files)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold">Verification</h1>
        <p className="text-muted-foreground">
          Complete your verification to build trust and increase your funding potential
        </p>
      </div>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps} of {totalSteps} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {isBasicVerificationComplete ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Basic verification complete!</strong> You can now receive unlimited grants. Complete additional
                steps to increase trust and visibility.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Complete basic verification (identity, selfie, phone, email) to start receiving grants.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{completedSteps}</div>
              <div className="text-sm text-muted-foreground">Steps Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">
                {isBasicVerificationComplete ? "✓" : `${completedRequiredSteps}/${requiredSteps.length}`}
              </div>
              <div className="text-sm text-muted-foreground">Basic Verification</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="space-y-4">
        {verificationSteps.map((step) => {
          const StatusIcon = statusConfig[step.status as keyof typeof statusConfig].icon
          const isUploading = uploadingStep === step.id

          return (
            <Card key={step.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          step.status === "completed"
                            ? "bg-secondary/20 text-secondary"
                            : step.status === "pending"
                              ? "bg-accent/20 text-accent"
                              : step.status === "rejected"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        <StatusIcon className="h-4 w-4" />
                      </div>

                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {step.title}
                          {step.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={statusConfig[step.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[step.status as keyof typeof statusConfig].label}
                      </Badge>

                      {step.completedAt && (
                        <span className="text-xs text-muted-foreground">Completed on {step.completedAt}</span>
                      )}

                      {step.submittedAt && step.status === "pending" && (
                        <span className="text-xs text-muted-foreground">Submitted on {step.submittedAt}</span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {statusConfig[step.status as keyof typeof statusConfig].description}
                    </p>

                    {step.documents && step.documents.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Uploaded Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="gap-1">
                              {doc}
                              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {step.status === "not_started" && (
                      <div className="w-64">
                        <FileUpload
                          accept={step.id === "address" ? ".pdf,.jpg,.jpeg,.png" : ".jpg,.jpeg,.png"}
                          onFileSelect={(files) => handleFileUpload(step.id, files)}
                        />
                      </div>
                    )}

                    {step.status === "rejected" && (
                      <div className="space-y-2">
                        <div className="w-64">
                          <FileUpload
                            accept={step.id === "address" ? ".pdf,.jpg,.jpeg,.png" : ".jpg,.jpeg,.png"}
                            onFileSelect={(files) => handleFileUpload(step.id, files)}
                          />
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resubmit
                        </Button>
                      </div>
                    )}

                    {step.status === "pending" && (
                      <Button variant="outline" size="sm" disabled>
                        <Clock className="mr-2 h-4 w-4" />
                        Under Review
                      </Button>
                    )}

                    {step.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Documents
                      </Button>
                    )}

                    {isUploading && (
                      <Button variant="outline" size="sm" disabled>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Verification Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure documents are clear and readable</li>
                <li>• Use good lighting when taking photos</li>
                <li>• Make sure all corners of documents are visible</li>
                <li>• Documents should not be older than 3 months</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Processing Times</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Identity verification: 1-2 business days</li>
                <li>• Address verification: 2-3 business days</li>
                <li>• Phone/Email: Instant</li>
                <li>• Resubmissions: 1 business day</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
