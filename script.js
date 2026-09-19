const boton = document.getElementById("boton");

const carta = document.getElementById("carta");


boton.addEventListener("click", () => {

    carta.classList.add("abierta");

    boton.innerHTML = "❤️ Te quiero mucho";

    crearCorazones();

});


function crearCorazones() {

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            const corazon =
                document.createElement("div");

            corazon.classList.add("corazon");

            corazon.innerHTML =
                ["❤️", "💕", "💗", "💖", "💘", "🥹"][
                    Math.floor(Math.random() * 6)
                ];

            corazon.style.left =
                Math.random() * 100 + "vw";

            corazon.style.fontSize =
                Math.random() * 30 + 15 + "px";

            corazon.style.animationDuration =
                Math.random() * 3 + 3 + "s";

            document.body.appendChild(corazon);


            setTimeout(() => {

                corazon.remove();

            }, 6000);

        }, i * 100);

    }

}