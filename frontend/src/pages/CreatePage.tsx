import { useState } from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Heading,
    Flex,
    useColorModeValue,

    Spinner,
} from '@chakra-ui/react';



import { useProductStore } from '../store/product';

// Estendendo o tema para suportar modos claro e escuro
const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false,
    fonts: {
        heading: 'San Francisco, system-ui, sans-serif',
        body: 'San Francisco, system-ui, sans-serif',
    },
});

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
    })

    const { createProduct } = useProductStore()

    const [loading] = useState(false);
    const toast = useToast();


    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const { success, message } = await createProduct(newProduct);

        if (!success) {
            toast({
                title: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }


        setNewProduct({
            name: '',
            price: '',
            image: '',
        })

    }


    // Usando cores que mudam com base no modo (claro ou escuro)
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const boxColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'gray.200');

    return (
        <ChakraProvider theme={theme}>
            <Flex direction="column" minH="100vh" bg={bgColor} justify="center" align="center">



                {/* Espaçamento para o conteúdo não ficar atrás do cabeçalho */}
                <Box w="full" maxW="md" p={4}>
                    {/* Tela de Cadastro de Produtos */}
                    <Box
                        bg={boxColor}
                        p={6}
                        rounded="2xl"
                        shadow="xl"
                        maxW="md"
                        w="full"
                    >
                        <Heading as="h2" fontSize="2xl" mb={6} color={textColor} textAlign="center">
                            Novo Produto
                        </Heading>
                        <form >
                            <VStack spacing={5}>
                                <FormControl id="product-name" isRequired>
                                    <FormLabel color={textColor}>Nome do Produto</FormLabel>
                                    <Input
                                        placeholder="Digite o nome do produto"
                                        focusBorderColor="teal.400"
                                        rounded="lg"
                                        bg={useColorModeValue('gray.100', 'gray.600')}
                                        value={newProduct.name}

                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl id="product-price" isRequired>
                                    <FormLabel color={textColor}>Preço</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder="Digite o preço do produto"
                                        focusBorderColor="teal.400"
                                        rounded="lg"
                                        bg={useColorModeValue('gray.100', 'gray.600')}
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl id="product-description">
                                    <FormLabel color={textColor}>Imagem</FormLabel>
                                    <Input
                                        placeholder="Imagem do produto"
                                        focusBorderColor="teal.400"
                                        rounded="lg"
                                        bg={useColorModeValue('gray.100', 'gray.600')}
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                    />
                                </FormControl>
                                <Button
                                    colorScheme="teal"
                                    type="submit"
                                    width="full"
                                    mt={4}
                                    rounded="lg"
                                    shadow="md"
                                    fontSize="lg"
                                    py={6}
                                    onClick={handleAddProduct}
                                >
                                    {loading ? <Spinner size="sm" /> : 'Cadastrar Produto'}
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default CreatePage;
