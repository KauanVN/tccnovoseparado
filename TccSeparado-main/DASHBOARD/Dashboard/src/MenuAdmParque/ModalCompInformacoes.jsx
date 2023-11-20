// Importe as dependências necessárias
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
import { FaTimes } from "react-icons/fa";

const ModalCompInformacoes = ({ dataEdit, isOpen, onClose, onUpdateData }) => {
  // Defina os estados necessários
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [adm, setAdm] = useState("");

  // Use useEffect para atualizar os estados quando dataEdit muda
  useEffect(() => {
    if (dataEdit) {
      setTitulo(dataEdit.nome || "");
      setDescricao(dataEdit.descricao || "");
      setAdm(dataEdit.adm || "");
    } else {
      setTitulo("");
      setDescricao("");
      setAdm("");
    }
  }, [dataEdit]);

  // Função para lidar com o salvamento dos dados
  const handleSave = async () => {
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
              // Substitua estas chaves pelos dados corretos
              "idLazer": dataEdit.idLazer,
              "nome": titulo,
              "descricao": descricao,
              // ... outros campos ...
            }),
          }
        );

        if (response.status === 200) {
          // Adicione a lógica apropriada após o sucesso
          alert("Parque atualizado com sucesso!");
          // Chame onUpdateData se precisar atualizar dados no componente pai
          onUpdateData && onUpdateData();
        } else {
          console.error("Erro ao cadastrar parque:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

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
        <ModalHeader>Editar Informação</ModalHeader>
        <ModalCloseButton
          icon={<FaTimes />}
          _hover={{
            color: "red.500",
          }}
          onClick={onClose}
        />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>ID</FormLabel>
              {/* Use value={dataEdit?.idLazer} para definir o valor readonly */}
              <Input type="text" value={dataEdit?.idLazer} isReadOnly />
            </Box>
            <Box>
              <FormLabel>Título</FormLabel>
              <Input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </Box>
            <Box>
              <FormLabel>Descrição</FormLabel>
              <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </Box>
            <Box>
              <FormLabel>Adm</FormLabel>
              <Select value={adm} onChange={(e) => setAdm(e.target.value)}>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
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
