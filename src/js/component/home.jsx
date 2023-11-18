import React, { useState } from "react";


//create your first component
const Home = () => {
	const [valorTarea, setValorTarea] = useState("");
	const [lista, setLista] = useState([]);
	const [mouseHover, setMouseHover] = useState(null);

	const agregarTarea = (e) => {
		if (e.key === "Enter") {
			//al hacer enter se agrega la tarea nueva a la lista
			setLista(lista.concat([valorTarea]))
			setValorTarea("")
			setMouseHover(null)
		}
	};

	const eliminarTarea = (index) => {
		// filtra y crea una nueva lista que excluye la tarea con el mismo indice
		const nuevaLista = lista.filter((_, i) => i !== index);
		setLista(nuevaLista);
	};
	return (
		<div className="container mt-3 contenedor">
			<h1>todos</h1>
			<div>
				<input type="text" className="input form-control" placeholder="What needs to be done?"
					onKeyDown={agregarTarea} onChange={(e) => { setValorTarea(e.target.value) }} />
				<ul className="lista">
					{lista.map((tarea, index) => (
						<li className="tarea" key={index} onMouseEnter={() => setMouseHover(index)}
							onMouseLeave={() => setMouseHover(null)}>
							{tarea}
							{mouseHover === index && (
								<span
									style={{ cursor: "pointer" }}
									onClick={() => eliminarTarea(index)}
								>
									&#10006; {/* Cruz */}
								</span>
							)}
						</li>
					))}
				</ul>
				<div>{lista.length} item left</div>
			</div>
		</div>
	);
};

export default Home;
