import { ItemProp } from "../../Types/ItemProps"
import { Table } from "../Table/Table"

export const Item = ({ 
      items, setItems, 
      edit, setEdit, 
      positive, setPositive, 
      valuePositive, setValuePositive,
      valueNegative, setValueNegative,
      itemForEdit , setItemForEdit,
      getItems, sumValues }: ItemProp) => {
   return(
      <section className="flex justify-between border border-slate-900 rounded-lg w-full mt-6 h-[300px] overflow-y-auto">
         <article className='flex items-center flex-col border-r border-r-gray-600 w-1/2 h-full text-center'>
            <h1 className="mb-6 text-2xl text-green-600">Entradas</h1>

            <Table 
               items={ items } setItems={ setItems } 
               edit={ edit } setEdit={ setEdit }
               itemForEdit={ itemForEdit }
               positive={ positive } setPositive={ setPositive }
               valuePositive={ valuePositive } setValuePositive={ setValuePositive }
               valueNegative={ valueNegative } setValueNegative={ setValueNegative }
               setItemForEdit={ setItemForEdit }
               typeItem="Positive" 
               getItems={ getItems } 
               sumValues={ sumValues }/>
         </article>

         <article className='flex items-center flex-col border-l border-l-gray-600 w-1/2 h-full text-center'>
            <h1 className="mb-6 text-2xl text-red-600">Saídas</h1>

            <Table 
               items={ items } setItems={ setItems } 
               edit={ edit } setEdit={ setEdit }
               itemForEdit={ itemForEdit }
               positive={ positive } setPositive={ setPositive }
               valuePositive={ valuePositive } setValuePositive={ setValuePositive }
               valueNegative={ valueNegative } setValueNegative={ setValueNegative }
               setItemForEdit={ setItemForEdit }
               typeItem="Negative" 
               getItems={ getItems } 
               sumValues={ sumValues } />
         </article>
      </section>
   )
}