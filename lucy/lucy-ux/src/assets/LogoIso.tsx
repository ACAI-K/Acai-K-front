// src/data/Logo.tsx

export function Logo(props: { class?: string, color?: string }) {
    if (!props.color) {
        props.color = "ffc84c";
    }
    return (
        <svg
            class={props.class}
            viewBox="0 0 3000 1200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
            <g id="IMAGOTIPO-LUCY">
                <path id="geq" d="M561.707,298.435l300,300l-300,300" style={`fill:#${props.color}${props.color};fill-opacity:0;stroke:#${props.color};stroke-width:104.17px;`}/>
                <g id="Luciernaga"></g>
                <path d="M1272.027,399.422c0,0 4.665,-52.157 -33.487,-53.185" style={`fill:#${props.color};fill-opacity:0;stroke:#${props.color};stroke-width:8.33px;`}/>
                <path d="M1288.388,399.422c0,0 -4.665,-52.157 33.487,-53.185" style={`fill:#${props.color};fill-opacity:0;stroke:#${props.color};stroke-width:8.33px;`}/>
                <ellipse cx="1279.547" cy="582.171" rx="72.403" ry="185.174" style={`fill:#${props.color};stroke:#${props.color};stroke-opacity:0;stroke-width:10.42px;`}/>
                <path d="M1263.093,400.561c34.622,19.953 15.833,117.529 -41.933,217.763c-57.766,100.233 -132.773,165.411 -167.395,145.458c-34.622,-19.953 -15.833,-117.529 41.933,-217.763c57.766,-100.233 132.773,-165.411 167.395,-145.458Z" style={`fill:#${props.color};stroke:#${props.color};stroke-opacity:0;stroke-width:10.42px;`}/>
                <path d="M1297.812,400.561c-34.622,19.953 -15.833,117.529 41.933,217.763c57.766,100.233 132.773,165.411 167.395,145.458c34.622,-19.953 15.833,-117.529 -41.933,-217.763c-57.766,-100.233 -132.773,-165.411 -167.395,-145.458Z" style={`fill:#${props.color};stroke:#${props.color};stroke-opacity:0;stroke-width:10.42px;`}/>
                <g id="Luz">
                    <path d="M1280.1,788.957l0,61.677l0,-61.677Z" style={`fill:#${props.color};fill-opacity:0;stroke:#${props.color};stroke-width:8.33px;`}/>
                    <path d="M1237.988,772.23l-30.838,53.414l30.838,-53.414Z" style={`fill:#${props.color};fill-opacity:0;stroke:#${props.color};stroke-width:8.33px;`}/>
                    <path d="M1322.212,772.23l30.838,53.414l-30.838,-53.414Z" style={`fill:#${props.color};fill-opacity:0;stroke:#${props.color};stroke-width:8.33px;`}/>
                </g>
            </g>
        </svg>
    );
}