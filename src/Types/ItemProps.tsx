import { Dispatch, SetStateAction } from "react"
import { ItemsType } from "./ItemsType"

export type ItemProp = {
   items: ItemsType[]
   setItems?: Dispatch<SetStateAction<ItemsType[]>>

   typeItem?: string

   edit: boolean
   setEdit: Dispatch<SetStateAction<boolean>>

   positive: boolean
   setPositive: Dispatch<SetStateAction<boolean>>

   valuePositive: number
   setValuePositive: Dispatch<SetStateAction<number>>

   valueNegative: number
   setValueNegative: Dispatch<SetStateAction<number>>

   itemForEdit: ItemsType
   setItemForEdit: Dispatch<SetStateAction<ItemsType>>

   getItems: () => void
   sumValues: ([]: ItemsType[]) => void
}