"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import UploadModal from "./UploadModal";
import Loader from "./Loader";
import FileList from "./FileList";

interface CardProps {
  handleResponseData: (data: FileData[]) => void;
  data: FileData[];
}

export type FileData = {
  id: number;
  name: string;
  upload_date: string;
  file_url: string;
};

export type FileUploadResponse = {
  all_files: FileData[];
};

const Card: React.FC<CardProps> = ({ handleResponseData, data }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFileList, setShowFileList] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleIconClick = () => {
    setShowModal(true); // Show the modal when icon is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    handleCloseModal(); // Close modal on submit
    setShowLoader(true); // Show loader during async request

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      const response = await axios.post<FileUploadResponse>(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/upload/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log("Upload response:", response.data.all_files);
      handleResponseData(response.data.all_files);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setShowLoader(false); // Hide loader after response
    }
  };

  return (
    <>
      <div className="w-full bg-white flex flex-col gap-y-1 px-[6px]">
        <div className="w-full h-[40px] flex justify-between items-center text-[#606060] text-sm">
          <div className="w-full h-full flex items-center">
            <Image
              width={25}
              height={25}
              src={"/icons/user.png"}
              // fill
              alt="photo"
              className="rounded-[50%] mr-[4px]"
            />

            <h4 className="font-semibold">Client Name</h4>
          </div>

          <div className="w-full h-full flex items-center">
            <Image
              width={25}
              height={25}
              src={"/images/Hadayetullah.jpg"}
              // fill
              alt="photo"
              className="rounded-[50%] ml-auto mr-[4px]"
            />

            <h4 className="font-semibold">Hadayetullah</h4>
          </div>
        </div>

        <div className="w-full flex flex-row items-center text-[#6F6F6F] text-sm">
          <Image
            width={16}
            height={16}
            src={"/icons/layer.png"}
            alt="layer icon"
            className="mr-[6px]"
          />

          <p>Lorem ipsum dolor sit amet, cons...</p>

          <div className="flex flex-row items-center gap-x-2 justify-between ml-auto bg-[#EEEEEE] px-0.5 py-1 rounded-md font-semibold">
            <Image
              width={16}
              height={16}
              src={"/icons/secure.png"}
              alt="layer icon"
              className="ml-auto"
            />

            <h4>1/2</h4>
          </div>
        </div>

        <div className="w-full h-[40px] flex items-center mb-2 justify-between">
          <Image
            width={25}
            height={25}
            src={"/icons/user.png"}
            alt="photo"
            className="rounded-[50%]"
          />

          <Image
            width={25}
            height={25}
            src={"/icons/user.png"}
            alt="photo"
            className="rounded-[50%]"
          />

          <div className="w-[30px] h-[30px] rounded-[50%] bg-[#EEEEEE] flex items-center justify-center text-[#575757] text-sm text-center">
            <p>12+</p>
          </div>

          <div className="flex flex-row items-center gap-x-1.5 text-[#707070] text-sm font-medium">
            <Image
              width={17}
              height={17}
              src={"/icons/bubble-chat.png"}
              alt="bubble-chat icon"
              className=""
            />

            <h4>15</h4>
          </div>

          <div className="flex flex-row items-center gap-x-1.5 text-[#707070] text-sm font-medium">
            <Image
              width={16}
              height={16}
              src={"/icons/attachment.png"}
              alt="attachment icon"
              className="cursor-pointer"
              onClick={handleIconClick}
            />

            <div
              onClick={() => setShowFileList(true)}
              className="w-[16px] h-[16px] flex flex-row items-center cursor-pointer"
            >
              <h4>{data.length}</h4>
            </div>
          </div>

          <div className="flex flex-row items-center gap-x-1.5 text-[#707070] text-sm font-medium">
            <Image
              width={14}
              height={14}
              src={"/icons/calendar.png"}
              alt="calendar icon"
              className=""
            />

            <h4>08-11-24</h4>
          </div>
        </div>
      </div>

      <UploadModal
        show={showModal}
        onClose={handleCloseModal}
        onFilesSelected={handleFilesSelected}
        onSubmit={handleSubmit}
      />

      {showLoader && <Loader />}

      {showFileList && (
        <FileList data={data} onClose={() => setShowFileList(false)} />
      )}
    </>
  );
};

export default Card;
