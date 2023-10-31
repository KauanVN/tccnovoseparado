import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Select,
  Button,
  Image,
} from '@chakra-ui/react';

import { useEffect } from "react";

const ModalComp = ({ data, dataEdit, isOpen, onClose }) => {
  const [id, getId] = useState(dataEdit.id || "");
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");
  const [endereco, setEndereco] = useState(dataEdit.endereco || "");
  const [latitude, setLatitude] = useState(dataEdit.latitude || "");
  const [longetude, setLongitude] = useState(dataEdit.longetude || "");
  const [categoria, setCategoria] = useState(dataEdit.categoria || "");
  const [admin, setAdmin] = useState(dataEdit.admin || "Não");
  const [imagem, setImagem] = useState(dataEdit.imagem || "");
  const [selectedImage, setSelectedImage] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      // Se não houver dados de edição, calcula o próximo ID sequencial
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      getId(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSave() {
    if (!id || !nome || !descricao || !endereco || !latitude || !longetude || !categoria || !imageFile) {
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("administrador")).token;

      if (token) {
        const headers = {
          "Authorization": `Bearer ${token}`,
        };

        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await fetch("http://seuservidor.com/upload", {
          method: "POST",
          headers,
          body: formData,
        });

        if (uploadResponse.status === 200) {
          const uploadData = await uploadResponse.json();

          const response = await fetch("https://tcc-production-e100.up.railway.app/api/lazer", {
            method: "POST",
            headers,
            body: JSON.stringify({
              "id": id,
              "nome": nome,
              "descricao": descricao,
              "endereco": endereco,
              "latitude": latitude,
              "longetude": longetude,
              "categoria": categoria,
              "imagem": uploadData.imageUrl,
            }),
          });

          if (response.status === 201) {
            console.log("Área de lazer cadastrada com sucesso!");
            window.location.reload();
          } else {
            console.error("Erro ao cadastrar área de lazer:", response.status);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao cadastrar área de lazer:", error);
    }

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(5px)"
        zIndex="999"
        color="white"
        borderRadius="10px"
      >
        <ModalHeader>Cadastrar área de lazer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID</FormLabel>
              <Input
                type="text"
                value={id}
                isReadOnly
                onChange={(e) => getId(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Endereço</FormLabel>
              <Input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Latitude</FormLabel>
              <Input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Longitude</FormLabel>
              <Input
                type="text"
                value={longetude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Categoria</FormLabel>
              <Input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Selecione a imagem do Parque</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </Box>
            <Box>
              {selectedImage && (
                <Image src={selectedImage} maxH="200px" alt="Imagem" />
              )}
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
  );
};

export default ModalComp;
