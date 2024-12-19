"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Coins } from "lucide-react"

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void;
    title: string;
    message: string;
    actionText: string;
  }

const InsufficientCreditsDialog: React.FC<DialogProps> = ({isOpen, onClose, onAction, title, message, actionText})=> {
    console.log("Dialog visibility1 :", isOpen);
    if (!isOpen) return null;
    console.log("Dialog visibility2:", isOpen);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex justify-center items-center my-8 ">
        <Coins size={80}  />
          <DialogTitle className=""> {title}</DialogTitle>
          <DialogDescription>
          {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button type="submit" onClick={onAction} className="w-full sm:w-auto rounded-md">
          {actionText}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default InsufficientCreditsDialog;