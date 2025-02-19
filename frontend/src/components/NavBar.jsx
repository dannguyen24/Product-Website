import React from 'react'
import { Flex, Box, HStack, Button, Container} from '@chakra-ui/react'
import { useColorMode } from "../components/ui/color-mode";

import { Link } from "react-router-dom";

const NavBar = () => {
        const { colorMode, toggleColorMode } = useColorMode();
        return (
                <Container maxW={"1140px"} px={4}>
                        <Flex
                                h={16}
                                alignItems={"center"} 
                                justifyContent={"space-between"}
                                flexDir={{
                                        base: "column",
                                        sm: "row",
                                }}
                        >
                                
                                <Box
                                        fontWeight="bold"
                                        fontSize="xl"
                                >
                                        <Link to="/">Product Store</Link>
                                        
                                </Box>
                                <HStack spacing={2} alignItems={"center"}>
                                        <Link to={"/create"}>
                                                <Button>
                                                        {/* <PlusSquareIcon /> */}
                                                        CHANGE
                                                </Button>
                                        </Link>
                           
                                        <Button onClick={toggleColorMode}>
                                                {colorMode === "light" ? "🌙" : "☀️"}
                                        </Button>
                                        
                                </HStack>
                        </Flex>

                </Container>
        
       
        
    
        )
}

export default NavBar