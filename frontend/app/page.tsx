"use client";

import axios from "axios";
import Card, { FileData, FileUploadResponse } from "@/components/Card";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [response, setResponse] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tablesTitle = [
    {
      title: "Incomplete",
      bg: "bg-[#D21010]",
    },
    {
      title: "To Do",
      bg: "bg-[#00B5FF]",
    },
    {
      title: "Doing",
      bg: "bg-[#FFE700]",
    },
    {
      title: "Under Review",
      bg: null,
    },
    {
      title: "Completed",
      bg: null,
    },
  ];

  const handleResponseData = (data: FileData[]) => {
    setResponse(data);
  };

  const getData = async () => {
    try {
      const response = await axios.get<FileUploadResponse>(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/files/list/`
      );

      handleResponseData(response.data.all_files);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="bg-white py-2 mx-4">
        <div className="w-full flex justify-evenly gap-x-5 font-[family-name:var(--font-geist-sans)]">
          {tablesTitle.map((tableTitle) => {
            return (
              <div
                key={tableTitle.title}
                className="min-w-[350px] w-full bg-[#EEEEEE] text-black rounded"
              >
                <div className="w-full relative">
                  <div className="w-full h-[50px] px-[12px] bg-[#EEEEEE] flex justify-between items-center absolute text-[#606060] font-semibold text-lg">
                    <div className="flex items-center flex-row gap-x-1">
                      <div
                        className={`${
                          tableTitle.bg != null ? tableTitle.bg : "hidden"
                        } w-[20px] h-[20px] rounded-l-[50%]`}
                      ></div>
                      <h4>{tableTitle.title}</h4>
                    </div>
                    <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#E2DFE3]">
                      <h4>0</h4>
                    </div>
                  </div>
                  <div className="scrollable-element w-full pt-12 px-[6px] flex flex-col gap-y-4 h-[95vh] overflow-y-auto">
                    {response && (
                      <>
                        {Array.from({ length: 10 }).map((_, index) => (
                          <Card
                            key={index}
                            handleResponseData={handleResponseData}
                            data={response}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
