import React, { useState, useEffect } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar os estilos padrão
import { FaTimes } from "react-icons/fa"; // Ícone de fechar

const ModalCompInformacoes = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  

  const administrador = JSON.parse(localStorage.getItem("administrador"));




  async function handleSave(){
        
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
                  alert("parque atualizado com sucesso!");
                } else {
                  console.error("Erro ao cadastar parque:", response.status);
                }
                
              }
            } catch (error) {
              console.error("Erro ao excluir o usuário:", error);
            }
      
        }

    

    /*if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = {
        idEvento: dataEdit.idEvento,
        titulo,
        descricao,
        data: dataEvento.toDateString(),
        adm,
      };
    } else {
      const newItem = {
        idEvento: id,
        titulo,
        descricao,
        data: dataEvento.toDateString(),
        adm,
      };
      data.push(newItem);
    }
*/

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
        <ModalHeader>Cadastrar uma Nova Informação</ModalHeader>
        <ModalCloseButton
          icon={<FaTimes />}
          _hover={{
            color: "red.500",
          }}
          onClick={onClose} // Feche a modal ao clicar no ícone do X
        />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID</FormLabel>
              <Input type="text"  isReadOnly />
            </Box>
            <Box>
              <FormLabel>TÍTULO</FormLabel>
              <Input
                type="text"
                
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>DESCRIÇÃO</FormLabel>
              <Textarea
               
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>ADM</FormLabel>
              <Select
                onChange={(e) => setAdm(e.target.value)}
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

export default ModalCompInformacoes;
