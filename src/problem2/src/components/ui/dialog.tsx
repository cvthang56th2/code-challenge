import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "./button"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

interface DialogTriggerProps {
  children: React.ReactNode
}

const Dialog = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const DialogProvider: React.FC<DialogProps> = ({ 
  open = false, 
  onOpenChange = () => {}, 
  children 
}) => {
  return (
    <Dialog.Provider value={{ open, onOpenChange }}>
      {children}
    </Dialog.Provider>
  )
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  const context = React.useContext(Dialog)
  
  return (
    <div onClick={() => context?.onOpenChange(true)}>
      {children}
    </div>
  )
}
DialogTrigger.displayName = "DialogTrigger"

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(Dialog)
    
    if (!context?.open) return null

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => context.onOpenChange(false)}
        />
        
        {/* Dialog */}
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
          <div
            ref={ref}
            className={cn("relative", className)}
            {...props}
          >
            {children}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-0 h-6 w-6"
              onClick={() => context.onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left pr-8",
        className
      )}
      {...props}
    />
  )
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
DialogDescription.displayName = "DialogDescription"

export {
  DialogProvider as Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}