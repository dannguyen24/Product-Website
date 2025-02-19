import {create} from 'zustand'

export const userProductStore = create((set) => ({
        products: [],
        setProducts: (products) => set({ products }),
        createProduct: async(newProduct) => {
                // if (!newProduct.name || !newProduct.price || !newProduct.img ) {
                //         return { success: false, message: "Please fill in all fields." };
                // }

                //Send requesst to the backend framework.
                const res = await fetch("http://localhost:3000/api/products/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newProduct),
                });

		const data = await res.json();
                console.log(data);
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };

        },
        fetchProducts: async() => {
                const res = await fetch("http://localhost:3000/api/products/");
                const data = await res.json();
                set({products: data.data});
        },
        deleteProduct: async(pid) => {
                const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
			method: "DELETE",
		});
                const data = await res.json();
                if (!data.success) return { success: false, message: data.message };

                // update the ui immediately, without needing a refresh
                set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
                return { success: true, message: data.message };
        },
        updateProduct: async(pid, updatedProduct) => {
                const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
			method: "PUT",
                        headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
                const data = await res.json();
                if (!data.success) return { success: false, message: data.message };

                //This line uses the set function (likely from Zustand, a state management library) to update the frontend state immediately.
                // It goes through the list of products (state.products) and checks each product's _id.
                // If the product's _id matches the pid, it replaces that product with the updated data (data.data), which was returned from the backend.
                // The rest of the products remain unchanged.

                set((state) => ({
                        products: state.products.map((product) => (product._id === pid ? data.data : product)),
                }));
                return { success: true, message: data.message };

        }


}));