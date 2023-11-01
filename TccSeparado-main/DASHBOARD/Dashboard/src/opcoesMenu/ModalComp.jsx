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
  const [idLazer, getIdLazer] = useState(dataEdit.idLazer || "");
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");
  const [endereco, setEndereco] = useState(dataEdit.endereco || "");
  const [latitude, setLatitude] = useState(dataEdit.latitude || "");
  const [longetude, setLongetude] = useState(dataEdit.longetude || "");
  const [categoria, setCategoria] = useState(dataEdit.categoria || "");
  const [admin, setAdmin] = useState(dataEdit.admin || "Não");
  const [imagem, setImagem] = useState(dataEdit.imagem || "");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!Object.keys(dataEdit).length) {
      // Se não houver dados de edição, calcula o próximo ID sequencial
      const nextId = data.length > 0 ? Math.max(...data.map((item) => item.idLazer)) + 1 : 1;
      getIdLazer(nextId.toString());
    }
  }, [data, dataEdit]);

  const handleImageChange = (item) => {
    const file = item.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(item.imagem);
      };
      reader.readAsDataURL(file);
    }
  };

  var administrador = JSON.parse(localStorage.getItem("administrador"));


  async function handleSave(){
    if (!idLazer || !nome || !descricao || !endereco || !latitude || !longetude|| !categoria) return;
  
      try {
        const token = await administrador.token;
  
        if (token) {
          const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
          };
  
          const response = await fetch(
            `https://tcc-production-e100.up.railway.app/api/lazer`,
            {
              method: "PUT",
              headers: headers,
              body: JSON.stringify({
                "idLazer": idLazer,
                "nome": nome,
                "descricao": descricao,
                "endereco": endereco,
                "latitude": latitude,
                "longetude": longetude,
                "categoria": categoria,
                "imagem": "imagem",
              }),
            }
          );
  
          if (response.status === 200) {
            console.log("Usuário cadastrado com sucesso!");
            onClose();
            window.location.reload();
          } else {
            console.error("Erro ao cadastar parque:", response.status);
          }
          
        }
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
      }

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
                value={idLazer}
                isReadOnly
                onChange={(e) => getIdLazer(e.target.value)}
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
                onChange={(e) => setLongetude(e.target.value)}
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
              <FormLabel>Adm</FormLabel>
              <Select
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
                borderRadius="5px"
                bg="rgba(255, 255, 255, 0.3)"
                color="black"
              >
                <option value="Sim" style={{ backgroundColor: 'transparent' }}>
                  Sim
                </option>
                <option value="Não" style={{ backgroundColor: 'transparent' }}>
                  Não
                </option>
              </Select>
            </Box>
            <Box>
              <FormLabel>Selecione a imagem do Parque</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </Box>
            <Box>
              {imagem && (
                <Image src={imagem} maxH="200px" alt="Imagem" 
                onChange={(e) => setImagem(e.target.value)}
                />
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
 