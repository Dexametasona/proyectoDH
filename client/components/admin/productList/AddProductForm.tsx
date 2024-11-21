import React, { useEffect, useState } from 'react'

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

const AddProductForm = () => {

    let dataProduct = {
        nombre: "",
        descripcion: "",
        precio: 0.00,
        marca: "",
        politicas: "",
        categoria: ""
    }

    const [productDetail, setProductDetail] = useState(dataProduct);
    const [listCategory, setListCaterogy] = useState<Category[]>([]);

    const handleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log(productDetail);
    }
    const handleNombre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, nombre: e.target.value })
    }
    const handleDescripcion = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, descripcion: e.target.value })
    }
    const handlePrecio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, precio: Number(e.target.value) })
    }
    const handleMarca = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, marca: e.target.value })
    }
    const handlePoliticas = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, politicas: e.target.value })
    }
    const handleCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, categoria: e.target.value })
    }

    useEffect(() => {
        const url = "http://localhost:8080/api/v1/category";
        fetch(url)
            .then(result => result.json())
            .then(info => {
                console.log(info.data);
                setListCaterogy(info.data)
            })
            .catch(error => console.log(error));
    }, [])

    console.log(listCategory);


    return (
        <div>
            <div style={styles.detail}>
                <span>Detalles del producto</span>
            </div>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <div>
                    <p style={{ fontSize: "12px" }}>Completa los detalles del nuevo producto y al final guarda la información registrada</p>
                </div>
                <div style={styles.columnsContainer}>
                    <div style={styles.column1}>
                        <div style={styles.inputContainer}>
                            <label htmlFor="nombre" style={{ fontSize: "13px" }}>Nombre</label>
                            <input id='nombre' type="text" style={styles.input} placeholder="Ej.: AA0123K" onChange={handleNombre} />
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="descripcion" style={{ fontSize: "13px" }}>Descripción</label>
                            <input id='descripcion' type="text" style={styles.input} placeholder="Ej.: Juego de mesa" onChange={handleDescripcion} />
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="precio" style={{ fontSize: "13px" }}>Precio</label>
                            <input id='precio' type="number" style={styles.input} placeholder="Ej.: $0.00" onChange={handlePrecio} />
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="marca" style={{ fontSize: "13px" }}>Marca</label>
                            <input id='marca' type="text" style={styles.input} placeholder="Ej.: Acme" onChange={handleMarca} />
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="politicas" style={{ fontSize: "13px" }}>Políticas de uso</label>
                            <textarea
                                id="politicas"
                                rows={3}
                                cols={40}
                                placeholder="Ej.: Apto para mayores"
                                style={styles.input}
                                onChange={handlePoliticas}
                            />
                        </div>
                    </div>
                    <div style={styles.column1}>
                        <div style={styles.inputContainer}>
                            <label htmlFor="categoria" style={{ fontSize: "13px" }}>Categoría</label>
                            <select
                                id="miSelect"
                                name="opciones"
                                className="form-control"
                                required
                                value={productDetail.categoria || ''} // Sincroniza el valor
                                onChange={handleCategoria}
                                style={{
                                    fontSize: "13px", padding: "12px", border: "1px solid #EFF0F4",
                                    borderRadius: "0.5em",
                                }}
                            >
                                <option value="" style={{color: "#EFF0F4"}} disabled>Categoría...</option>
                                {listCategory.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                            {/* <select id='categoria' type="text" style={styles.input} placeholder="Ej.: AA0123K" /> */}
                        </div>
                        <div style={styles.inputContainerImage}>
                            <label htmlFor="imagenes" style={{ fontSize: "13px" }}>Imágenes</label>
                            <div style={styles.labelChosen}>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                // onChange={handleFileChange}
                                />
                                {/* Etiqueta personalizada */}
                                <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                                    Subir Imagen
                                </label>
                                <img src={"/assets/icons/folder-check.svg"} alt="" />
                            </div>
                        </div>
                        <div style={styles.imageContainer}>

                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "end" }}>
                    <button style={styles.btnGuardar}>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default AddProductForm