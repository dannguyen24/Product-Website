import { Box, Image, IconButton, Heading, HStack, VStack, Input, Button} from "@chakra-ui/react"
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { userProductStore } from '../store/product';
import { Toaster, toaster } from "../components/ui/toaster"
import {
        DialogBody,
        DialogBackdrop,
        DialogActionTrigger,
        DialogCloseTrigger,
        DialogContent,
        DialogFooter,
        DialogHeader,
        DialogRoot,
        DialogTitle,
        DialogTrigger,
} from "../components/ui/dialog"



const ProductCard = ({product}) => {
        const [ updatedProduct, setUpdatedProduct] = useState(product);
        const { deleteProduct, updateProduct } = userProductStore();

        const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};
        const handleUpdateProduct = async (pid, updatedProduct) => {
                console.log("Get into handleUpDateProduct")
		const { success, message } = await updateProduct(pid, updatedProduct);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

        return (
        <Box
                shadow='lg'
                rounded='lg'
                overflow='hidden'
                transition='all 0.3s'
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                m="5"
        >
        {/* <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' /> */}
                <Box p={4} >
                        <Heading as='h3' size='md' mb={2}>
                                {product.name}
                        </Heading>

                        {/* <Text fontWeight='bold' fontSize='xl' mb={4}>
                                ${product.price}
                        </Text> */}
                        <HStack spacing={2}>
                                        
                                <IconButton onClick={() => handleDeleteProduct(product._id)}>
                                        <MdDelete />
                                </IconButton>


                                <DialogRoot>
                                        <DialogTrigger asChild>
                                                <IconButton>
                                                        <FaEdit />
                                                </IconButton>
                                        </DialogTrigger>
                                        <DialogContent>
                                                <DialogHeader>
                                                        <DialogTitle>Update Product</DialogTitle>
                                                </DialogHeader>
                                                
                                                <DialogBody pb="4">
                                                        <VStack spacing={4}>
                                                                <Input
                                                                        placeholder='Product Name'
                                                                        name='name'
                                                                        value={updatedProduct.name}
                                                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                                                />
                                                                <Input
                                                                        placeholder='Price'
                                                                        name='price'
                                                                        type='number'
                                                                        value={updatedProduct.price}
                                                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                                                />
                                                                <Input
                                                                        placeholder='Image URL'
                                                                        name='image'
                                                                        value={updatedProduct.image}
                                                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                                                />
                                                        </VStack>
                                                </DialogBody>
                                                <DialogFooter> 
                                                        <DialogActionTrigger asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                        </DialogActionTrigger>
                                                        <Button
                                                                colorScheme='blue'
                                                                mr={3}
                                                                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                                        >
                                                                Update
                                                        </Button>
                                                </DialogFooter>
                                        </DialogContent>
                                </DialogRoot>
                        </HStack>
                </Box>

              
        </Box>
        
        )
}

export default ProductCard 