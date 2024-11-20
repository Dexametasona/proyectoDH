import React from 'react'

const AddProductForm = () => {

    const styles = {
        detail: {
            margin: "1em",
            border: "1px solid #EFF0F4",
            padding: "1em",
            backgroundColor: "#F7F8FA",
            borderRadius: "0.5em",
            fontWeight: "bold"
        },
        formContainer: {
            margin: "16px",
            padding: "25px",
            border: "1px solid #EFF0F4",
            borderRadius: "0.5em",
            display: "flex",
            flexDirection: "column",
            gap: "25px"
        },
        columnsContainer: {
            display: "flex",
            justifyContent: "",
            gap: "44px",
            width: "100%"
        },
        column1: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%"
        },
        inputContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "3px"
        },
        inputContainerImage: {
            display: "flex",
            justifyContent: "space-between",
            alignItem: "center"
        },
        input: {
            fontSize: "12px",
            border: "1px solid #EFF0F4",
            padding: "12px",
            borderRadius: "8px",
            width: "100%"
        },
        labelChosen: {
            display: 'flex',
            alignItems: "center",
            gap: "4px",
            padding: '2px 8px',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: "12px"
        },
        btnGuardar: {
            widthSize: "14px",
            backgroundColor: "#AFAFAF",
            color: "white",
            padding: "0.5em 1em",
            borderRadius: "5px",
        },
        imageContainer: {
            overflow: "scroll",
            overflowX: "hidden",
            border: "1px solid #EFF0F4",
            borderRadius: "5px",
            padding: "1em",
            width: "100%",
            maxWidth: "633px",
            height: "100%",
            maxHeight: "232px",
        }

    }

  return (
    <div>
        <div style={styles.detail}>
            <span>Detalles del producto</span>
        </div>
        <form style={styles.formContainer}>
            <div>
                <p style={{fontSize: "12px"}}>Completa los detalles del nuevo producto y al final guarda la información registrada</p>
            </div>
            <div style={styles.columnsContainer}>
                <div style={styles.column1}>
                    <div style={styles.inputContainer}>
                        <label htmlFor="id" style={{fontSize: "13px"}}>ID</label>
                        <input id='id' type="text" style={styles.input} placeholder="Ej.: AA0123K"/>
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="descripcion" style={{fontSize: "13px"}}>Descripción</label>
                        <input id='descripcion' type="text" style={styles.input} placeholder="Ej.: Juego de mesa"/>
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="precio" style={{fontSize: "13px"}}>Precio</label>
                        <input id='precio' type="text" style={styles.input} placeholder="Ej.: $0.00"/>
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="marca" style={{fontSize: "13px"}}>Marca</label>
                        <input id='marca' type="text" style={styles.input} placeholder="Ej.: Acme"/>
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="politicas" style={{fontSize: "13px"}}>Políticas de uso</label>
                        <textarea
                            id="politicas"
                            rows={3}
                            cols={40}
                            placeholder="Ej.: Apto para mayores"
                            style={styles.input}
                        />
                    </div>
                </div>
                <div style={styles.column1}>
                    <div style={styles.inputContainer}>
                        <label htmlFor="categoria" style={{fontSize: "13px"}}>Categoría</label>
                        <input id='categoria' type="text" style={styles.input} placeholder="Ej.: AA0123K"/>
                    </div>
                    <div style={styles.inputContainerImage}>
                        <label htmlFor="imagenes" style={{fontSize: "13px"}}>Imágenes</label>
                        <div style={styles.labelChosen}>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                // onChange={handleFileChange}
                            />
                            {/* Etiqueta personalizada */}
                            <label htmlFor="fileInput" style={{cursor: "pointer"}}>
                                Subir Imagen
                            </label>
                            <img src={"/assets/icons/folder-check.svg"} alt="" />
                        </div>
                    </div>
                    <div style={styles.imageContainer}>
                        
                    </div>
                </div>
            </div>
            <div style={{textAlign: "end"}}>
                <button style={styles.btnGuardar}>Guardar</button>
            </div>
        </form>
    </div>
  )
}

export default AddProductForm