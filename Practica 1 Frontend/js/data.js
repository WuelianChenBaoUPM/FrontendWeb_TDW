const datos = {
    personas: [
        { nombre: "Isaac Newton", nacimiento: 1643, defuncion: 1727, imagen: "./images/newton.jpg", wiki: "https://es.wikipedia.org/wiki/Isaac_Newton" },
        { nombre: "Albert Einstein", nacimiento: 1879, defuncion: 1955, imagen: "./images/einstein.jpeg", wiki: "https://es.wikipedia.org/wiki/Albert_Einstein" },
      ],
    entidades: [
      {
            nombre: "NASA", // Nombre más simple
            nacimiento: 1958,
            defuncion: null,
            imagen: "./images/nasa.jpg",
            wiki: "https://es.wikipedia.org/wiki/NASA",
            personasRelacionadas: ["Wernher von Braun", "Katherine Johnson"] // Ejemplo simplificado
        },
	  
    ],
    productos: [
        { nombre: "Ley de Gravitación Universal", nacimiento: 1687, imagen: "./images/gravedad.jpeg", wiki: "https://es.wikipedia.org/wiki/Ley_de_la_gravitaci%C3%B3n_universal" },
   ],
    usuarios: [
        { usuario: "x", contraseña: "x", rol: "reader" },
        { usuario: "y", contraseña: "y", rol: "reader" },
        { usuario: "z", contraseña: "z", rol: "writer" }
    ]
};