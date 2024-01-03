'use client'
import { Button } from "react-bootstrap";

export default function ButtonControle({value}) {

   function handleClick(label){
      console.log(label);
   }
   let entrada = 'primary',
      intervalo = 'secondary',
      retorno = 'secondary',
      saida = 'secondary'

   if(value == 'entrada'){
      entrada = 'secondary'
      intervalo = 'primary'
   }

   return (
      <>
         <Button variant={entrada} size="lg" onClick={ () => handleClick('entrada') }>
            Entrada
         </Button>
         <Button variant={intervalo} size="lg" onClick={ () => handleClick('intervalo') }>
            Intervalo
         </Button>
         <Button variant={retorno} size="lg" onClick={ () => handleClick('retorno') }>
            Retorno
         </Button>
         <Button variant={saida} size="lg" onClick={ () => handleClick('saida') }>
            Saída
         </Button>
      </>
   )
}