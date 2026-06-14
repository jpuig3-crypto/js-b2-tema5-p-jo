// T5. Técnicas para mejorar la estructura y robustez de código
// U1. Gestión de errores y excepciones
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

class InventoryManager {
    #productList = [];

    init(products) {
        if (!Array.isArray(products)) return false;

        const errors = [];
        let allSuccessful = true;

        for (const product of products) {
            const result = this.addProduct(product);
            if (!result.status) {
                allSuccessful = false;
                errors.push(result.message);
            }
        }

        return allSuccessful ? true : errors;
    }

    nProducts() {
        return this.#productList.length;
    }

    validateProducts(product) {
        const code = product ? product.code : 'unknown';

        if (!product || 
            typeof product.code !== 'number' || product.code < 0 || !Number.isInteger(product.code) ||
            typeof product.name !== 'string' || product.name.trim() === '' ||
            typeof product.price !== 'number' || product.price <= 0 ||
            typeof product.discount !== 'number' || product.discount < 0 || !Number.isInteger(product.discount) ||
            typeof product.amount !== 'number' || !Number.isInteger(product.amount)) {
                throw new Error(`ERROR_DATA. alguno de los datos del producto (${code}) no tiene un formato valido.`);
            }
        
            const priceString = product.price.toString();
            if (priceString.includes('.') && priceString.split('.')[1].length > 2) {
                throw new Error(`ERROR_DATA. Alguno de los datos del producto (${code}) no tiene un formato valido.`);
            }

            const codeExists = this.#productList.some(p => p.code === product.code);
            if (codeExists) {
                throw new Error(`INVENTORY_CODE. Ya existe otro producto con ese codigo (${code}).`);
            }

            const nameExists = this.#productList.some(p => p.name.toLowerCase() === product.name.toLowerCase());
            if (nameExists) {
                throw new Error(`INVENTORY_NAME. El nombre del producto (${code}) ya existe.`);
            }
        
            if (product.price < 50) {
                throw new Error(`INVENTORY_NAME. El nombre del producto (${code}) ya existe.`);
            }

            if (product.amount < 0 || product.discount > 10) {
                throw new Error(`INVENTORY_DISCOUNT. El descuento del producto (${code}) debe estar entre 0 y 10.`);
            }

            if (product.amount < 0) {
                throw new Error(`INVENTORY_AMOUNT. La cantidad de producto (${code}) no puede ser inferior a 10.`);
            }

            return true;
    }

    addProduct(product) {
        let status = false;
        let message = '';
        const code = product ? product.code : 'unknown';

        try {
            this.validateProducts(product);
            this.#productList.push(product);
            status = true;
            message = `INVENTORY_ADD. El producto (${code}) ha sido añadido con exito al inventario.`;
        } catch (error) {
            status = false;
            message = error.message;
        } finally {
            return {
                status: status,
                message: message
            };
        }
    }
}

export { InventoryManager };