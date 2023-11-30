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
    Progress,
  } from "@chakra-ui/react";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { FaTimes } from "react-icons/fa";
  import { uploadImage } from '../opcoesMenu/FirebaseService';

  const ModalCompEventos  = ({
    data,
    setData,
    dataEdit,
    isOpen,
    onClose,
    onUpdateData,
    Image,
  }) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataTermino, setDataTermino] = useState(new Date());
    const [localizacao, setLocalizacao] = useState("");
    const [imagem, setImagem] = useState('');
    const [validationError, setValidationError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const administrador = JSON.parse(localStorage.getItem("administrador"));
    const [imagemState, setImagemState] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
      if (dataEdit && Object.keys(dataEdit).length > 0) {
        setNome(dataEdit.nomeEvento || "");
        setDescricao(dataEdit.descricao || "");
        setDataInicio(new Date(dataEdit.dataInicio) || new Date());
        setDataTermino(new Date(dataEdit.dataTermino) || new Date());
      } else {
        setNome("");
        setDescricao("");
        setDataInicio(new Date());
        setDataTermino(new Date());
      }
    }, [dataEdit]);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      uploadImage(
        file,
        (progress) => {
          setUploadProgress(progress);
          setIsLoading(true);
        },
        (downloadURL) => {
          console.log('Download URL:', downloadURL);
          setImagemState(downloadURL);
          setIsLoading(false);
          setUploadProgress(0);
        },
        (error) => {
          console.error('Upload Error:', error);
          setIsLoading(false);
          setUploadProgress(0);
        }
      );
    };

    const handleSave = async () => {
      if (!nome || !descricao || dataTermino < dataInicio) {
        setValidationError("Por favor, preencha todos os campos corretamente.");
        return;
      }

      try {
        const token = await administrador.token;
        const idLazer = await administrador.parque.idLazer;
        console.log(imagemState)
        if (token) {
          const headers = {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          };

          const response = await fetch(
            `https://tcc-production-e100.up.railway.app/api/evento`,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                nomeEvento: nome,
                local: administrador.parque.nome,
                dataInicio: dataInicio,
                dataTermino: dataTermino,
                descricao: descricao,
                imagem:imagemState,
                status: 1,
                lazer: {
                  idLazer: idLazer,
                },
              }),
            }
          );

          if (response.status === 201) {
            alert("Evento criado!");
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
            onClick={() => {
              setValidationError(null);
              onClose();
            }}
          />
          <ModalBody>
            {validationError && (
              <Box
                bg="red.500"
                color="white"
                p={2}
                mb={4}
                borderRadius="md"
                textAlign="center"
              >
                {validationError}
              </Box>
            )}
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
                  onChange={(date) => {
                    setDataInicio(date);
                    if (date > dataTermino) {
                      setDataTermino(date);
                    }
                  }}
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
                  minDate={dataInicio}
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
                <FormLabel>Selecione a imagem do Evento</FormLabel>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                {isLoading && <Progress value={uploadProgress} size="sm" />}
              </Box>
              <Box>
                {imagem && (
                  <Image
                    src={imagem}
                    maxH="200px"
                    alt="Imagem"
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

  export default ModalCompEventos;