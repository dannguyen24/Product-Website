import React, { useEffect } from 'react'
import { Container, SimpleGrid, VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { userProductStore } from '../store/product';
import ProductCard from "../components/ProductCard"
import { Toaster, toaster } from "../components/ui/toaster"

 
const HomePage = () => {

  const {fetchProducts, products} = userProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);

  return (
    <Container maxW={'container.md'}>
      <VStack>
        <Text
					fontSize={30}
					fontWeight={"bold"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          
          w={"full"}
      >
 
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </SimpleGrid>

      <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
      </Text>
      </VStack>
    </Container>
  )
}

export default HomePage 