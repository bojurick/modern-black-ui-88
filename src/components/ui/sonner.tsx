
import { useTheme as useNextThemes } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useTheme } from "@/contexts/ThemeContext"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useNextThemes()
  const { theme: appTheme } = useTheme()
  
  const isLight = appTheme === 'light'

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: isLight 
            ? "group toast group-[.toaster]:bg-white group-[.toaster]:border group-[.toaster]:border-gray-200 group-[.toaster]:shadow-md group-[.toaster]:rounded-lg group-[.toaster]:overflow-hidden" 
            : "group toast group-[.toaster]:bg-black/60 group-[.toaster]:border group-[.toaster]:border-white/10 group-[.toaster]:backdrop-blur-md group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:overflow-hidden",
          title: isLight 
            ? "group-[.toast]:text-gray-800 group-[.toast]:font-medium" 
            : "group-[.toast]:text-white group-[.toast]:font-medium",
          description: isLight 
            ? "group-[.toast]:text-gray-600" 
            : "group-[.toast]:text-gray-300",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: isLight 
            ? "group-[.toast]:border-l-4 group-[.toast]:border-l-green-500 group-[.toast]:bg-white" 
            : "group-[.toast]:border-l-4 group-[.toast]:border-l-green-500",
          error: isLight 
            ? "group-[.toast]:border-l-4 group-[.toast]:border-l-red-500 group-[.toast]:bg-white" 
            : "group-[.toast]:border-l-4 group-[.toast]:border-l-red-500",
          info: isLight 
            ? "group-[.toast]:border-l-4 group-[.toast]:border-l-blue-500 group-[.toast]:bg-white" 
            : "group-[.toast]:border-l-4 group-[.toast]:border-l-blue-500",
          warning: isLight 
            ? "group-[.toast]:border-l-4 group-[.toast]:border-l-amber-500 group-[.toast]:bg-white" 
            : "group-[.toast]:border-l-4 group-[.toast]:border-l-amber-500",
          loader: isLight ? "group-[.toast]:text-gray-800" : "group-[.toast]:text-white",
        },
        duration: 5000,
        unstyled: true,
      }}
      {...props}
    />
  )
}

export { Toaster }
