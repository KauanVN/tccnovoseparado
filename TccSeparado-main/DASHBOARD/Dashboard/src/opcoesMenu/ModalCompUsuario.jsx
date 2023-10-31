import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios"; // Importe a biblioteca axios

const ModalCompUsuario = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState(dataEdit.email || "");
  const [status, setStatus] = useState(dataEdit.status || "");
  const [image, setImage] = useState(null); // Estado para armazenar a imagem

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleSave = async () => {
    if (!email || !status) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }

    if (emailAlreadyExists()) {
      console.log("E-mail já cadastrado.");
      return;
    }

    try {
      // Envie a imagem para o servidor e obtenha a URL da imagem
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post("URL_DO_SEU_SERVIDOR_PARA_UPLOAD", formData);

        if (response.status === 200) {
          const imageUrl = response.data.imageUrl;

          if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = {
              id: dataEdit.id,
              email,
              status,
              image: imageUrl,
            };
          } else {
            const newItem = {
              id,
              email,
              status,
              image: imageUrl,
            };
            data.push(newItem);
          }

          localStorage.setItem("cad_cliente", JSON.stringify(data));
          setData([...data]);

          console.log("Dados salvos com sucesso!");
          onClose();
        }
      } else {
        console.log("Imagem não selecionada.");
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    }
  };

  const emailAlreadyExists = () => {
    if (dataEdit.id !== id && data?.length) {
      return data.find((item) => item.email === email);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(5px)"
          zIndex="999"
          color="white"
          borderRadius="10px"
        >
          <ModalHeader>Cadastrar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>ID</FormLabel>
                <Input type="text" value={id} isReadOnly />
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Status da Conta</FormLabel>
                <Textarea
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Imagem</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCompUsuario;
