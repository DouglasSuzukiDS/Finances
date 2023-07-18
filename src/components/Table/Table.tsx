import { FormEvent, useEffect, useState } from "react"
import { ItemProp } from "../../Types/ItemProps"
import { PenToSquare } from "../../assets/Icons/PenToSquare"
import { TrashCanXMark } from "../../assets/Icons/TrashCanXMark"
import axios from "axios"
import { ProgressBar } from "../ProgressBar/ProgressBar"

export const Table = ({
   items, setItems,
   edit, setEdit,
   positive, setPositive,
   valuePositive, setValuePositive,
   valueNegative, setValueNegative,
   itemForEdit, setItemForEdit,
   typeItem,
   getItems, sumValues }: ItemProp) => {

   const classesTH = [
      'text-light',
      'border',
      'border-collapse',
      'border-slate-600',
      'font-bold',
      'text-xl',
      'p-3'
   ].join(' ')

   const classesTD = [
      typeItem === 'Positive' ? 'text-blue-600' : 'text-indigo-600',
      'border',
      'border-collapse',
      'border-slate-600',
      'font-bold',
      'text-xl',
      'p-3',
      ''
   ].join(' ')

   const classesValue = [
      typeItem === 'Positive' ? 'text-blue-600' : 'text-indigo-600',
      'font-bold',
      'text-xl',
      'my-4'
   ].join(' ')

   const colorValueType = [
      typeItem === 'Positive' ? 'text-green-600' : 'text-red-600',
      'ml-2'
   ].join(' ')

   const server = 'http://localhost:3001/items'

   const handleEdit = async (id: number) => {
      const item = items.filter(item => item.id === id)

      // console.log(`Item for Edit is: ${ JSON.stringify(item) }`)

      setEdit(true)

      item[0].typeItem === 'Positive' ? setPositive(true) : setPositive(false)

      setItemForEdit(item[0])

      // getItems()
   }

   const handleDelete = async (id: number) => {
      const item = items.filter(item => item.id !== id)

      // console.log(`Item for Delete is: ${ JSON.stringify(item) }`)

      await axios.delete(`${server}/${id}`)
         .then(res => {
            alert(`Item deletado com sucesso!`)

            setItems && setItems(item)

            getItems()
            // sumValues(items)
         })
         .catch(err => {
            alert('Erro ao deletar item!')
            console.log(err)
         })
   }

   return (
      <>
         {items.filter(item => item.typeItem === typeItem).length > 0 ?
            <>
               <table className="border border-collapse border-slate-600">
                  <thead>
                     <tr className="border border-collapse border-slate-600">
                        <th className={classesTH}>Nome</th>
                        <th className={classesTH}>Valor</th>
                        <th className={classesTH}>Ações</th>
                     </tr>
                  </thead>

                  <tbody>
                     {
                        items.map((item, index) => (
                           item.typeItem === typeItem &&

                           <tr key={index} className="border border-collapse border-slate-600">
                              <td className={classesTD}>{item.nameItem}</td>

                              <td className={classesTD}>{Number(item.valueItem).toFixed(2)}</td>

                              <td className={classesTD}>
                                 <span className="flex gap-2">
                                    <PenToSquare
                                       w="24" h="24" fill="#FFC107"
                                       className="cursor-pointer transition-opacity hover:opacity-75"
                                       onClick={() => handleEdit(item.id)} />

                                    <TrashCanXMark
                                       w="24" h="24" fill="#DC3545"
                                       className="cursor-pointer transition-opacity  hover:opacity-75"
                                       onClick={() => handleDelete(item.id)} />
                                 </span>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>

               <p className={classesValue}>Valor:
                  <span className={colorValueType}>
                     R$ {typeItem === 'Positive' ? valuePositive.toFixed(2) : valueNegative.toFixed(2)}
                  </span>
               </p>
            </> :
            <>
               <h1 className={ classesValue }>
                  Eita, você não tem nenhum valor 
                  { <span className={ colorValueType }>{typeItem === 'Positive' ? 'Positivo' : 'Negativo'}</span>} para ser exibido 
               </h1>
            </>
         }


      </>
   )
}