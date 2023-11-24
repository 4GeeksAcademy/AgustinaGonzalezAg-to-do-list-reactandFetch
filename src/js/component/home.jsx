import React, { useState, useEffect } from "react";

const Home = () => {
  const [valorTarea, setValorTarea] = useState("");
  const [lista, setLista] = useState([]);
  const [mouseHover, setMouseHover] = useState(null);

  useEffect(() => {
    // creo el usuario 
    fetch('https://playground.4geeks.com/apis/fake/todos/user/agustinagonzalez', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify([])
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

    // hago un get a mis tareas
    fetch('https://playground.4geeks.com/apis/fake/todos/user/agustinagonzalez')
      .then(response => response.json())
      .then(data => setLista(data))
      .catch(err => console.log(err));
  }, []);

  const actualizarListaTareas = (nuevaLista) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/agustinagonzalez', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaLista)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  const agregarTarea = (e) => {
    if (e.key === "Enter") {
      const nuevaTarea = { label: valorTarea, done: false };
      const nuevaLista = [...lista, nuevaTarea];

      setLista(nuevaLista);
      setValorTarea("");
      setMouseHover(null);

      actualizarListaTareas(nuevaLista);
    }
  };

  const eliminarTarea = (index) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
    actualizarListaTareas(nuevaLista);
  };

  const borrarTareas = () => {
    const listaVacia = [];
    setLista(listaVacia);
    actualizarListaTareas(listaVacia);
  };

  return (
    <div className="container mt-3 contenedor">
      <h1>todos</h1>
      <div>
        <input
          type="text"
          className="input form-control"
          placeholder="What needs to be done?"
          onKeyDown={agregarTarea}
          onChange={(e) => { setValorTarea(e.target.value) }}
        />
        <ul className="lista">
          {lista.map((tarea, index) => (
            <li
              className="tarea"
              key={index}
              onMouseEnter={() => setMouseHover(index)}
              onMouseLeave={() => setMouseHover(null)}
            >
              {tarea.label}
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
        <div className="centro">
          <button className="btn btn-danger" onClick={borrarTareas}>
            Eliminar tareas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


