import { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react'
import { Form } from './components/Form/Form'
import { ItemsType } from './Types/ItemsType'
import axios from 'axios'
import { Item } from './components/Item/Item'
import { ProgressBar } from './components/ProgressBar/ProgressBar'

function App() {
  // Inputs
  const [nameItem, setNameItem] = useState('')
  const [typeItem, setTypeItem] = useState('Positive')
  const [valueItem, setValueItem] = useState<string | number>('')
  const [edit, setEdit] = useState(false)
  const [positive, setPositive] = useState(true)

  const [items, setItems] = useState<ItemsType[]>([])
  const [itemForEdit, setItemForEdit] = useState<ItemsType>({
    id: 0,
    nameItem: '',
    typeItem: 'Positive',
    valueItem: null
  })

  const [valuePositive, setValuePositive] = useState(0)
  const [valueNegative, setValueNegative] = useState(0)

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    await axios.get('http://localhost:3001/items')
      .then(res => {
        // console.log(res.data)
        setItems(res.data)

        sumValues(res.data)
      })
      .catch(err => console.log(err))
  }

  const sumValues = (itemsArray: ItemsType[]) => {
    itemsArray.map((item: ItemsType) => {
      if(item.typeItem === 'Positive') {
         let itemsPositive = itemsArray.filter(item => item.typeItem === 'Positive')

         let sumPositive = itemsPositive.reduce(
            (sum, item) => sum = sum + Number(item.valueItem)
         , 0)

         // console.log(`Positives: ${sumPositive}`)

         setValuePositive(Number(sumPositive.toFixed(2)))
      } else {
         let itemsNegative = itemsArray.filter(item => item.typeItem === 'Negative')

         let sumNegative = itemsNegative.reduce(
            (sum, item) => sum = sum + Number(item.valueItem)
         , 0)

         // console.log(`Negatives: ${sumNegative}`)

         setValueNegative(Number(sumNegative.toFixed(2)))
      }
   })
  }

  return (
    <main className='flex flex-col items-center w-full h-screen p-3'>
      <h1 className='text-5xl font-bold text-blue-600 mb-6'>Finanças</h1>

      <Form
        nameItem={nameItem}
        setNameItem={setNameItem}

        typeItem={typeItem}
        setTypeItem={setTypeItem}

        valueItem={valueItem}
        setValueItem={setValueItem}

        edit={edit}
        setEdit={setEdit}

        positive={ positive }
        setPositive={ setPositive }

        valuePositive={ valuePositive }
        setValuePositive={ setValuePositive }

        valueNegative={ valueNegative }
        setValueNegative={ setValueNegative }

        itemForEdit={ itemForEdit }
        setItemForEdit={ setItemForEdit }

        items={ items }

        getItems={ getItems }
        sumValues={ sumValues }
      />

      <Item
        items={items}
        setItems={setItems}

        edit={ edit }
        setEdit={ setEdit } 

        positive={ positive }
        setPositive={ setPositive }
        
        valuePositive={ valuePositive }
        setValuePositive={ setValuePositive }
        
        valueNegative={ valueNegative }
        setValueNegative={ setValueNegative }
        
        itemForEdit={ itemForEdit }
        setItemForEdit={ setItemForEdit } 
        
        getItems={ getItems } 
        sumValues={ sumValues } />

      {/* <ProgressBar 
            valuePositive={ valuePositive }
            valueNegative={ valueNegative }
      /> */}
    </main>
  )
}

export default App
