import { Dispatch, SetStateAction } from "react"

export type ProgressBarProps = {
   valuePositive: number
   setValuePositive?: Dispatch<SetStateAction<number>>

   valueNegative: number
   setValueNegative?: Dispatch<SetStateAction<number>>
}