"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"

export function ToggleTheme() {
   const { resolvedTheme, setTheme } = useTheme()
   const [isLight, setIsLight] = useState(true)

   useEffect(() => {
      setIsLight(resolvedTheme === "light")
   }, [resolvedTheme])

   function handleChange(checked: boolean) {
      setIsLight(checked)
      setTheme(checked ? "light" : "dark")
   }

   return (
      <div className="flex items-center space-x-2 pr-4">
         <Switch checked={isLight} onCheckedChange={handleChange} />
      </div>
   )
}
