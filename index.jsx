ReactDOM.render(
    <ThemeProvider theme={themeSelected}>
        <div className="esquema-principal">
            <div className="contenedor-pagina">
                <EnvolventePagina>
                    {esquemaGeneralLibreria(_JFTP_)}
                </EnvolventePagina>
                <BotonLinkPortafolio />
            </div>
        </div>
    </ThemeProvider>,
    document.querySelector('body')
);

setTimeout(() => {
    PR.prettyPrint();
}, 0);