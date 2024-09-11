import { create } from "zustand";

export interface IProduct {
    _id?: string;
    name: string;
    image: string;
    price: string;
}

interface IProductStore {
    products: IProduct[];
    setProducts: (products: IProduct[]) => void;
    createProduct: (newProduct: IProduct) => Promise<{ success: boolean; message: string }>;
    fetchProducts: () => Promise<void>;
    deleteProduct: (pid: string) => Promise<{ success: boolean; message: string }>;
    updateProduct: (pid: string, updatedProduct: IProduct) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<IProductStore>((set) => ({
    products: [],
    setProducts: (products: IProduct[]) => set({ products }),

    createProduct: async (newProduct: IProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Preencha todos os campos" };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Produto Cadastrado com sucesso" };
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid: string) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Atualiza a UI sem precisar de um refresh
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid: string, updatedProduct: IProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Atualiza a UI sem precisar de um refresh
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));

        return { success: true, message: data.message };
    },
}));
