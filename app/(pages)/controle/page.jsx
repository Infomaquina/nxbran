import { Button } from "react-bootstrap";

export default function Controle() {
   return (
      <div className="d-grid gap-3 mt-4">
         <Button variant="primary" size="lg">
            Entrada
         </Button>
         <Button variant="secondary" size="lg" disabled>
            Intervalo
         </Button>
         <Button variant="secondary" size="lg" disabled>
            Retorno
         </Button>
         <Button variant="secondary" size="lg" disabled>
            Saída
         </Button>
      </div>
   );
}
