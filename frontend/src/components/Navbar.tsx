import { PlusSquareIcon } from "@chakra-ui/icons"
import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { BsMoon, BsSun } from "react-icons/bs"
import { Link } from "react-router-dom"



const NavbarHome = () => {
    const { colorMode, toggleColorMode } = useColorMode()



    return (
        <Container maxW={"1140px"} px={4} >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", sd: "row" }}>
                <Text


                >

                </Text>

                <HStack
                    spacing={2}
                    alignItems={"center"}
                >

                    <Link to="/create">
                        <Button>
                            <PlusSquareIcon
                                fontSize={20}

                            />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>

                        {colorMode === "light" ? <BsMoon /> : <BsSun />}

                    </Button>

                </HStack>
            </Flex>

        </Container>
    )
}

export default NavbarHome