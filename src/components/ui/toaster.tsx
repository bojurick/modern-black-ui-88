
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useTheme } from "@/contexts/ThemeContext"

export function Toaster() {
  const { toasts } = useToast()
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // Determine the variant for styling
        let variantClass = '';
        
        if (props.variant === 'destructive') {
          variantClass = isLight 
            ? 'bg-red-50 border-red-200 text-red-800' 
            : 'bg-red-900/50 border-red-800/60';
        } else {
          variantClass = isLight 
            ? 'bg-white border border-gray-200 shadow-md text-gray-800'
            : 'bg-black/60 backdrop-blur-md border border-white/10';
        }

        return (
          <Toast key={id} {...props} className={variantClass}>
            <div className="grid gap-1">
              {title && <ToastTitle className={isLight ? "text-gray-800" : ""}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={isLight ? "text-gray-600" : ""}>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className={isLight ? "text-gray-500 hover:text-gray-700" : ""} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
