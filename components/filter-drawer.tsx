"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface FilterDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: {
    categories: string[]
    locations: string[]
    urgency: string
    amountRange: number[]
    verificationStatus: string
    fundingStatus: string
  }
  onFiltersChange: (filters: any) => void
}

const categories = ["Education", "Health", "Business", "Startup", "Community", "Emergency", "Arts", "Technology"]

const locations = ["Lagos, NG", "Nairobi, KE", "Accra, GH", "Cape Town, ZA", "Ibadan, NG", "Kampala, UG"]

export function FilterDrawer({ open, onOpenChange, filters, onFiltersChange }: FilterDrawerProps) {
  const [tempFilters, setTempFilters] = useState(filters)

  const handleCategoryChange = (category: string, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    setTempFilters((prev) => ({
      ...prev,
      locations: checked ? [...prev.locations, location] : prev.locations.filter((l) => l !== location),
    }))
  }

  const applyFilters = () => {
    onFiltersChange(tempFilters)
    onOpenChange(false)
  }

  const clearFilters = () => {
    const clearedFilters = {
      categories: [],
      locations: [],
      urgency: "",
      amountRange: [0, 10000],
      verificationStatus: "",
      fundingStatus: "",
    }
    setTempFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Wishes</SheetTitle>
          <SheetDescription>Refine your search to find the perfect wishes to support</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Categories */}
          <div>
            <Label className="text-base font-semibold">Categories</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={tempFilters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Locations */}
          <div>
            <Label className="text-base font-semibold">Locations</Label>
            <div className="space-y-3 mt-3">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={tempFilters.locations.includes(location)}
                    onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                  />
                  <Label htmlFor={location} className="text-sm">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Urgency */}
          <div>
            <Label className="text-base font-semibold">Urgency</Label>
            <RadioGroup
              value={tempFilters.urgency}
              onValueChange={(value) => setTempFilters((prev) => ({ ...prev, urgency: value }))}
              className="mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="any-urgency" />
                <Label htmlFor="any-urgency">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent">Urgent only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-urgent" id="not-urgent" />
                <Label htmlFor="not-urgent">Not urgent</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Amount Range */}
          <div>
            <Label className="text-base font-semibold">Amount Range</Label>
            <div className="mt-3 space-y-3">
              <Slider
                value={tempFilters.amountRange}
                onValueChange={(value) => setTempFilters((prev) => ({ ...prev, amountRange: value }))}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${tempFilters.amountRange[0].toLocaleString()}</span>
                <span>${tempFilters.amountRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Verification Status */}
          <div>
            <Label className="text-base font-semibold">Verification Status</Label>
            <RadioGroup
              value={tempFilters.verificationStatus}
              onValueChange={(value) => setTempFilters((prev) => ({ ...prev, verificationStatus: value }))}
              className="mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="any-verification" />
                <Label htmlFor="any-verification">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="verified" id="verified" />
                <Label htmlFor="verified">Verified only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unverified" id="unverified" />
                <Label htmlFor="unverified">Unverified</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Funding Status */}
          <div>
            <Label className="text-base font-semibold">Funding Status</Label>
            <RadioGroup
              value={tempFilters.fundingStatus}
              onValueChange={(value) => setTempFilters((prev) => ({ ...prev, fundingStatus: value }))}
              className="mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="any-funding" />
                <Label htmlFor="any-funding">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active">Still accepting grants</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="funded" id="funded" />
                <Label htmlFor="funded">Fully funded</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
            Clear All
          </Button>
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
