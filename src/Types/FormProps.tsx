import { Dispatch, SetStateAction } from "react"
import { ItemsType } from "./ItemsType"

export type FormProps = {
   nameItem: string
   setNameItem: Dispatch<SetStateAction<string>>

   typeItem: string
   setTypeItem: Dispatch<SetStateAction<string>>

   valueItem: string | number
   setValueItem: Dispatch<SetStateAction<string | number>>

   edit: boolean
   setEdit: Dispatch<SetStateAction<boolean>>

   positive: boolean
   setPositive: Dispatch<SetStateAction<boolean>>

   valuePositive: number
   setValuePositive: Dispatch<SetStateAction<number>>

   valueNegative: number
   setValueNegative: Dispatch<SetStateAction<number>>

   items: ItemsType[]
   setItems ?: Dispatch<SetStateAction<ItemsType[]>>

   itemForEdit: ItemsType
   setItemForEdit: Dispatch<SetStateAction<ItemsType>>

   getItems: () => void
   sumValues: ([]: ItemsType[]) => void
}
