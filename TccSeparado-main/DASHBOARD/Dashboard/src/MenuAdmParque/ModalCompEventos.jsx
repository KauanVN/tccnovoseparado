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
  Image,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";

const ModalCompEventos = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
  onUpdateData,
}) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataTermino, setDataTermino] = useState(new Date());
  const [localizacao, setLocalizacao] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // Uncomment the following lines if you want to use image-related state
  // const [imagem, setImagem] = useState("");

  var administrador = JSON.parse(localStorage.getItem("administrador"));

  useEffect(() => {
    if (dataEdit && Object.keys(dataEdit).length > 0) {
      setNome(dataEdit.nomeEvento || "");
      setDescricao(dataEdit.descricao || "");
      setDataInicio(new Date(dataEdit.dataInicio) || new Date());
      setDataTermino(new Date(dataEdit.dataTermino) || new Date());
      setLocalizacao(dataEdit.local || "");
      // setImagem(dataEdit.imagem || "");
    } else {
      setNome("");
      setDescricao("");
      setDataInicio(new Date());
      setDataTermino(new Date());
      setLocalizacao("");
      // setImagem("");
    }
  }, [dataEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Uncomment the following line if you want to use image-related state
      // setImagem(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!nome || !descricao) {
      console.log("Campos obrigatórios não preenchidos.");
      return;
    }
    try {
      const token = await administrador.token;
      const idLazer = await administrador.parque.idLazer;

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const formData = new FormData();
        formData.append("nomeEvento", nome);
        formData.append("local", administrador.parque.nome);
        formData.append("dataInicio", dataInicio.toISOString());
        formData.append("dataTermino", dataTermino.toISOString());
        formData.append("descricao", descricao);
        formData.append("status", "1");
        formData.append("lazer[idLazer]", idLazer);
        // Uncomment the following lines if you want to include the image in the request
        if (selectedImage) {
          formData.append("imagem", selectedImage);
        }

        const response = await fetch(
          `https://tcc-production-e100.up.railway.app/api/evento`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        if (response.status === 201) {
          alert("evento criado!");
          window.location.reload();
        } else {
          console.error("Erro ao cadastrar evento:", response.status);
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
        <ModalHeader>Cadastrar Novo Evento</ModalHeader>
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
              <FormLabel>Data de Início</FormLabel>
              <DatePicker
                selected={dataInicio}
                onChange={(date) => setDataInicio(date)}
                className="custom-datepicker"
                placeholderText="Selecione uma data"
                dateFormat="dd/MM/yyyy"
                calendarClassName="calendar-background"
                wrapperClassName="transparent-input"
              />
            </Box>
            <Box>
              <FormLabel>Data de Término</FormLabel>
              <DatePicker
                selected={dataTermino}
                onChange={(date) => setDataTermino(date)}
                className="custom-datepicker"
                placeholderText="Selecione uma data"
                dateFormat="dd/MM/yyyy"
                calendarClassName="calendar-background"
                wrapperClassName="transparent-input"
              />
              <style>
                {`
                  .transparent-input .react-datepicker__input-container input {
                    background-color: rgba(255, 255, 255, 0.5);
                    border-radius: 5px;
                  }
                `}
              </style>
            </Box>
            <Box>
              {/* Uncomment the following lines if you want to include the image input */}
              <FormLabel>Imagem</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
  );
};

export default ModalCompEventos;
