import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FormProps } from "../../Types/FormProps"
import axios from 'axios'

export const Form = ({ 
      nameItem, setNameItem, 
      typeItem, setTypeItem, 
      valueItem, setValueItem,
      edit, setEdit,
      positive, setPositive,
      valuePositive, setValuePositive,
      valueNegative, setValueNegative,
      itemForEdit,
      setItemForEdit,
      items,
      getItems, sumValues }: FormProps) => {

   const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
      const regex = /^[0-9\b\d.]+$/

      if (e.target.value === '' || regex.test(e.target.value)) {
         setValueItem(e.target.value)
      }
   }

   useEffect(() => {
      getItems()
   }, [])

   useEffect(() => {
      setNameItem(itemForEdit.nameItem)
      setTypeItem(itemForEdit.typeItem)
      setValueItem(itemForEdit.valueItem)
   }, [itemForEdit])

   const server = 'http://localhost:3001/items'

   const handleCheckType = (e: ChangeEvent<HTMLSelectElement>) => {
      if(e.target.value === 'Positive') {
         setTypeItem('Positive')
         setPositive(true)
      } else {
         setTypeItem('Negative')
         setPositive(false)
      }
   }

   const handleSave = (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      console.log(nameItem, typeItem, valueItem)

      if(nameItem !== '' && valueItem !== '') {
         axios.post(`${ server }`, {
            nameItem,
            typeItem,
            valueItem
         })
            .then(res => {
               console.log(res)
               alert('Item adicionado com sucesso!')

               getItems()

               handleClear(e)
            })
            .catch(err => {
               console.log(err)
               alert('Erro ao adicionar o item!')
            })
      }
   }

   const handleEdit = (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if(nameItem !== '' && valueItem !== '') {
         axios.put(`${ server }/${itemForEdit.id}`, {
            nameItem,
            typeItem,
            valueItem
         })
            .then(res => {
               console.log(res)
               alert('Item editado com sucesso!')

               getItems()

               setEdit(false)

               setPositive(true)

               handleClear(e)
            })
            .catch(err => {
               console.log(err)
               alert('Erro ao editar o item!')
            })
      }
   }

   const handleClear = (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      setNameItem('')
      setTypeItem('Positive')
      setValueItem('')

      setItemForEdit({
         id: 0,
         nameItem: '',
         typeItem: 'Positive',
         valueItem: ''
      })

      setEdit(false)

      setPositive(true)
   }

   const classTypeValue = [
      positive ? 'text-green-600' : 'text-red-600',
      'font-bold',
      'bg-slate-600', 
      'p-2',
      'text-2xl',
      'w-[200px]',
      'outline-none',
      'rounded-lg',
      'text-center',
      'placeholder:font-bold'
   ].join(' ')

   return (
      <form id='form' className='flex gap-3'>
         <input
            type="text"
            placeholder='Título'
            name='nameItem'
            value={ nameItem }
            onChange={ e => setNameItem(e.target.value) } 
            className='bg-slate-600 p-2 text-light font-bold text-2xl w-[200px] outline-none rounded-lg placeholder:font-bold' />

         <select
            name="typeItem"
            value={ typeItem }
            className={ classTypeValue }
            onChange={ handleCheckType } >
            <option value="Positive" className='text-green-600 font-bold'>Entrada</option>
            <option value="Negative" className='text-red-600 font-bold'>Saída</option>
         </select>

         <input
            type="text"
            placeholder='Valor'
            name='valueItem'
            value={ valueItem }
            onChange={ handleValue } 
            className='bg-slate-600 p-2 text-light font-bold text-2xl w-[200px] outline-none rounded-lg placeholder:font-bold'/>

         <div className="flex gap-3">
            {
               !edit ?
                  <button
                     className='btn btn-primary-outline'
                     onClick={ handleSave }>Salvar
                  </button> :
                  <button
                     className='btn btn-info-outline'
                     onClick={ handleEdit }>Editar
                  </button>
            }

            <button
               className='btn btn-warning-outline'
               onClick={ handleClear }>Limpar
            </button>
         </div>

      </form>
   )
}