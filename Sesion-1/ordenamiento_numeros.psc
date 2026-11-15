Algoritmo ordenamiento_numeros
	definir numero1,numero2,numero3,option_, caja Como Entero
	// pedimos los numeros
	Escribir "Ingresa numero 1"
	leer numero1
	escribir "ingresa numero 2"
	leer numero2
	Escribir "ingresa numero 3"
	leer numero3
	
	//se pregunta como es el orden
	escribir "Como quieres organizar los numeros?"
	Escribir "1. menor a mayor"
	Escribir "2. mayor a menor"
	leer option_
	
	//primero se ordena menor a mayor, si el numero1 es mayor que el numero2
	//el n1 se mete en una variable para reasignarlo al n2, y el que antes estaba en el n2 se pasa a n1 porque es menor
	Si option_ = 1 Entonces
		si numero1 > numero2 Entonces
			caja <- numero1
			numero1 <- numero2
			numero2 <- caja
		FinSi
		
		// es la misma idea que el de arriba, si el numero2 es mayor que el numero3 hay que intercambiarlos con el mismo Proceso 
		si numero2 > numero3 entonces 
			caja <- numero2
			numero2 <- numero3
			numero3 <- caja
		FinSi
		
		//esta ultima comparacion es el numero3 que paso a numero2 porque era menor en el (SI pasado)
		//se compara con el numero1 porque no sabemos si el nuevo valor del numero2 es menor que el numero1
		si numero1 > numero2 Entonces
			caja <- numero1
			numero1 <- numero2
			numero2 <- caja
		FinSi
	FinSi
	
	//es la misma idea del (SI) de arriba pero se le cambia el operador, ya no es si es mayor n1 que n2, si no n1 es menor que n2
	//si es menor, se ira desplazando para que los numeros queden de mayor a menor
	Si option_ = 2 Entonces
		si numero1 < numero2 Entonces
			caja <- numero1
			numero1 <- numero2
			numero2 <- caja
		FinSi
		si numero2 < numero3 entonces 
			caja <- numero2
			numero2 <- numero3
			numero3 <- caja
		FinSi
		si numero1 < numero2 Entonces
			caja <- numero1
			numero1 <- numero2
			numero2 <- caja
		FinSi
	FinSi
	
	Escribir numero1 " ", numero2 " ", numero3 " "
FinAlgoritmo
