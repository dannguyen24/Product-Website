import { Container, Heading, Input, Box, VStack, Button } from '@chakra-ui/react'
import { Toaster, toaster } from "../components/ui/toaster"
import { userProductStore } from "../store/product.js"
import React, { useState } from 'react'

const CreatePage = () => {

        const { createProduct } = userProductStore();

        const [newProduct, setNewProduct] = useState({
                name: "",
                price: "",
                image: "",
        });
        const handleChange = (e) => {
                setNewProduct((prev) => ({ 
                        ...prev, // Keep existing values
                        [e.target.name]: e.target.value // Update only the changed field
                }));
        };
        const handleAddProduct = async () => {
                // e.preventDefault();
                
		const { success, message } = await createProduct(newProduct);
                console.log("Success:", success);
                console.log("Message:", message);

		if (!success) {
                        toaster.create({
                                title: "Error",
                                type: "error",
                                description: message,
                                duration: 2000,
                                isClosable: true,
                        });
                        console.log("Toast should give now Error");
		} else {
                        toaster.create({
                                title: "Success",
                                type: "success",
                                description: message,
                                duration: 2000,
                                
                        });
                        console.log("Toast should give new Success");
		}
		if (success) setNewProduct({ name: "", price: "", image: "" });
	};

        return (
                <Container maxW={"md"}>
                        <VStack spacing={8}>
                                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                                        Create new product
                                </Heading>
                                <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
                                        <VStack spacing={4}>
                                                <Input
                                                        placeholder='Product Name'
                                                        name = 'name'
                                                        value={newProduct.name}
                                                        onChange={handleChange}
                                                        autoFocus
                                                />
                                                <Input
                                                        placeholder='Price'
                                                        name = 'price'
                                                        type='number'
                                                        value={newProduct.price}
                                                        onChange={handleChange}
                                                        autoFocus
                                                />
                                                <Input
                                                        placeholder='Image URL'
                                                        name='image'
                                                        value={newProduct.image}
                                                        onChange={handleChange}
                                                />
                                                <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                                                        Add Product
                                                </Button>


                                        </VStack>

                                </Box>
                        </VStack>
                        <Toaster />
                </Container>
        )
}

export default CreatePage