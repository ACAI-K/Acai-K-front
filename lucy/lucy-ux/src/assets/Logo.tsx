// src/data/Logo.tsx

export function Logo(props: { class?: string }) {
    return (
        <svg
            class={props.class}
            viewBox="0 0 1200 1200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
            {/*
        Eliminamos los rectángulos decorativos de fondo para hacerlo transparente,
        manteniendo únicamente las trazas originales de AÇAI Koders.
      */}
            <g id="ISOTIPO-LUCY">
                {/* El caracter '>' */}
                <path
                    id="geq"
                    d="M168.75,300l300,300l-300,300"
                    style="fill:#93ccd3;fill-opacity:0;stroke:#ffc84c;stroke-width:104.17px;"
                />

                {/* La Luciérnaga */}
                <g id="Luciernga">
                    {/* Antenas */}
                    <path d="M874.027,403.987c0,0 4.665,-52.157 -33.487,-53.185" style="fill:#ffc84c;fill-opacity:0;stroke:#ffc84c;stroke-width:8.33px;" />
                    <path d="M890.388,403.987c0,0 -4.665,-52.157 33.487,-53.185" style="fill:#ffc84c;fill-opacity:0;stroke:#ffc84c;stroke-width:8.33px;" />

                    {/* Cuerpo central */}
                    <ellipse cx="881.547" cy="586.736" rx="72.403" ry="185.174" style="fill:#ffc84c;stroke:#391c4d;stroke-opacity:0;stroke-width:10.42px;" />

                    {/* Alita izquierda */}
                    <path d="M865.093,405.126c34.622,19.953 15.833,117.529 -41.933,217.763c-57.766,100.233 -132.773,165.411 -167.395,145.458c-34.622,-19.953 -15.833,-117.529 41.933,-217.763c57.766,-100.233 132.773,-165.411 167.395,-145.458Z" style="fill:#ffc84c;stroke:#391c4d;stroke-opacity:0;stroke-width:10.42px;" />

                    {/* Alita derecha */}
                    <path d="M899.812,405.126c-34.622,19.953 -15.833,117.529 41.933,217.763c57.766,100.233 132.773,165.411 167.395,145.458c34.622,-19.953 15.833,-117.529 -41.933,-217.763c-57.766,-100.233 -132.773,-165.411 -167.395,-145.458Z" style="fill:#ffc84c;stroke:#391c4d;stroke-opacity:0;stroke-width:10.42px;" />

                    {/* Destellos de Luz */}
                    <g id="Luz">
                        <path d="M882.1,793.522l0,61.677l0,-61.677Z" style="fill:#ffc84c;fill-opacity:0;stroke:#ffc84c;stroke-width:8.33px;" />
                        <path d="M839.988,776.795l-30.838,53.414l30.838,-53.414Z" style="fill:#ffc84c;fill-opacity:0;stroke:#ffc84c;stroke-width:8.33px;" />
                        <path d="M924.212,776.795l30.838,53.414l-30.838,-53.414Z" style="fill:#ffc84c;fill-opacity:0;stroke:#ffc84c;stroke-width:8.33px;" />
                    </g>
                </g>
            </g>
        </svg>
    );
}