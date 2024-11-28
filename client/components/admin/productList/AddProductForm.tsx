import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const styles: Record<string, React.CSSProperties> = {
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
        alignItems: "center"
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
        fontSize: "14px",
        backgroundColor: "#AFAFAF",
        color: "white",
        padding: "0.5em 1em",
        borderRadius: "5px",
    },
    imagesContainer: {
        overflow: "scroll",
        overflowX: "hidden",
        border: "1px solid #EFF0F4",
        borderRadius: "5px",
        padding: "1em",
        width: "100%",
        height: "100%",
        maxHeight: "232px",
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        gap: "1em",
    },
    imageDiv: {
        display: "flex",
        alignItems: "end",
        width: "125px",
        borderRadius: "5px",
    }
}

const AddProductForm = () => {

    interface Product {
        nombre: string;
        descripcion: string;
        precio: number;
        marca: string;
        politicas: string;
        categoria: string;
        imagenes: File[];
    }

    const dataProduct: Product = {
        nombre: "",
        descripcion: "",
        precio: 0,
        marca: "",
        politicas: "",
        categoria: "",
        imagenes: []
    }

    const [productDetail, setProductDetail] = useState(dataProduct);
    const [listCategory, setListCaterogy] = useState<Category[]>([]);
    const [listProduct, setListProduct] = useState<Product1[]>([]);
    const [registry, setRegistry] = useState({});
    const [ready, setReady] = useState(false);

    const clearForm = () => {
        setProductDetail({
            nombre: "",
            descripcion: "",
            precio: 0,
            marca: "",
            politicas: "",
            categoria: "",
            imagenes: []
        });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validaciones del nombre
        const productExists = listProduct.find(product => product.name === productDetail.nombre);
        if (productExists) {
            alert("Ya existe un producto con este nombre. Por favor cambiarlo.");
        } else {
            let data = productDetail.nombre;
            if (data.length < 10 || data.length > 100) {
                alert("El nombre debe tener entre 10 a 100 caracteres")
            } else {
                let pictures = productDetail.imagenes;
                if (pictures.length < 4 || pictures.length > 8) {
                    alert("Debe seleccionar entre 4 y 8 fotos para registrar el producto.")
                } else {
                    setRegistry(productDetail.nombre);
                    setReady(true);
                }
            }
        }
        console.log(productDetail);
    }
    const handleNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductDetail({ ...productDetail, nombre: e.target.value })
    }
    const handleDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductDetail({ ...productDetail, descripcion: e.target.value })
    }
    const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductDetail({ ...productDetail, precio: parseFloat(e.target.value) });
    }
    const handleMarca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductDetail({ ...productDetail, marca: e.target.value })
    }
    const handlePoliticas = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductDetail({ ...productDetail, politicas: e.target.value })
    }
    const handleCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductDetail({ ...productDetail, categoria: e.target.value })
    }
    const handleClearPhotos = () => {
        setProductDetail({ ...productDetail, imagenes: [] })
    }
    const handleImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const eFiles = e.target.files;
        if (eFiles && eFiles.length > 0) {
            const selectedFiles = Array.from(eFiles); // Convierte FileList a un array
            setProductDetail((prevDetail) => ({
                ...prevDetail,
                imagenes: [...prevDetail.imagenes, ...selectedFiles], // Agrega las nuevas imágenes a las existentes
            }));
        }
    };

    useEffect(() => {
        if (registry !== "" || registry !== undefined || registry !== null) {
            if (ready) {
                registerProduct();
            }
        }
    }, [ready]);

    const registerProduct = () => {
        // Crear el FormData
        const formData = new FormData();

        // Agregar los datos al FormData
        formData.append("brand", productDetail.marca);
        formData.append("categoryId", productDetail.categoria);
        formData.append("description", productDetail.descripcion);
        formData.append("name", productDetail.nombre);

        productDetail.imagenes.forEach((file: File) => {
            formData.append("photos", file);
        });

        formData.append("price", String(productDetail.precio));
        formData.append("tagId", "1");

        const url = "http://localhost:8080/api/v1/products";
        const token = localStorage.getItem("authToken") || null;

        // Enviar la solicitud
        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}` || "",
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Respuesta del servidor:", data);
                Swal.fire({
                    title: "¡Guardado con Éxito!",
                    text: "El producto ha sido guardado agregado al inventario exitosamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#008000",

                }).then((result) => {
                    if (result.isConfirmed) {
                        clearForm();
                    }
                });

            })
            .catch((error) => {
                console.error("Error al registrar el producto:", error);
                alert("Ocurrió un error al registrar el producto. Inténtalo nuevamente.");
            });
    };

    useEffect(() => {
        const url = "http://localhost:8080/api/v1/products";
        fetch(url)
            .then(result => result.json())
            .then(info => {
                setListProduct(info.data.content);
                console.log(info.data);

            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const url = "http://localhost:8080/api/v1/category";
        fetch(url)
            .then(result => result.json())
            .then(info => {
                setListCaterogy(info.data)
            })
            .catch(error => console.log(error));
    }, []);

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
                            <input id='nombre' type="text" style={styles.input} placeholder="Ej.: AA0123K" onChange={handleNombre} required value={productDetail.nombre}/>
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="descripcion" style={{ fontSize: "13px" }}>Descripción</label>
                            <input id='descripcion' type="text" style={styles.input} placeholder="Ej.: Juego de mesa" onChange={handleDescripcion} required value={productDetail.descripcion}/>
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="precio" style={{ fontSize: "13px" }}>Precio</label>
                            <input id='precio' type="float" style={styles.input} placeholder="Ej.: $0.00" onChange={handlePrecio} required value={productDetail.precio || ""}/>
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="marca" style={{ fontSize: "13px" }}>Marca</label>
                            <input id='marca' type="text" style={styles.input} placeholder="Ej.: Acme" onChange={handleMarca} required value={productDetail.marca}/>
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
                                required 
                                value={productDetail.politicas}/>
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
                                }}>
                                <option value="" style={{ color: "#EFF0F4" }} disabled>Categoría...</option>
                                {listCategory.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.inputContainerImage}>
                            <label htmlFor="imagenes" style={{ fontSize: "13px" }}>Imágenes</label>
                            <button onClick={handleClearPhotos}>Limpiar fotos</button>
                            <div style={styles.labelChosen}>
                                <input
                                    type="file"
                                    id="fileInput"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleImagenes}
                                />
                                {/* Etiqueta personalizada */}
                                <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                                    Subir Imagen
                                </label>
                                <img src={"/assets/icons/folder-check.svg"} alt="" />
                            </div>
                        </div>
                        <div style={styles.imagesContainer}>
                            {productDetail.imagenes.map((img, index) => (
                                <div key={index} style={styles.imageDiv}>
                                    <img src={URL.createObjectURL(img)} alt={`Imagen ${index + 1}`} style={styles.img} />
                                </div>
                            ))}
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