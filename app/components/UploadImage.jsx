'use client'
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function UploadImage({ id }) {
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async (selectedFile) => {
    try {
      setFile(URL.createObjectURL(selectedFile));
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("id_user", id);

      const response = await fetch("/api/UploadImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Imagem enviada com sucesso!");
        // Adicione feedback de sucesso se necessário
      } else {
        console.error("Erro ao enviar imagem API:", response.statusText);
        // Adicione feedback de erro se necessário
      }
    } catch (error) {
      console.error("Erro geral enviar imagem:", error);
      // Adicione feedback de erro se necessário
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Image
        src={file ? file : `/img/users/${id}.jpg?${new Date().getTime()}`}
        className="rounded-start p-0 input-group-text"
        alt="User Image"
        height={60}
        width={60}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}