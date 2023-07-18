import { ProgressBarProps } from "../../Types/ProgressBar"

export const ProgressBar = ({ valuePositive, valueNegative }: ProgressBarProps) => {
   const widthProgressBar = [
      'border',
      'border-sky-600',
      'w-[250px]',
      'h-6'
   ].join('')

   const goal = [
      `w-[${valuePositive}px]`,
      'bg-sky-600',
      'h-6'
   ].join(' ')
   return( 
      <section>
         <h1 className="font-bold text-4xl text-sky-600 mt-6">Meta</h1>

         <div className={ widthProgressBar }>
            <div className={ goal }>{ valuePositive }</div>
            
         </div>
      </section>
   )
}