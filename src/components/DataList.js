import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function DataList({ dataName = "Datas", dataUrls, keysToShow = [] }) {
  const [showDatas, setShowDatas] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIndices, setOpenIndices] = useState({});

  async function loadDatas() {
    setLoading(true);
    try {
      const responses = await Promise.all(
        dataUrls.map((url) => axios.get(url))
      );
      setDatas(responses.map((response) => response.data));
    } catch (error) {
      console.error("Error fetching data details:", error);
    } finally {
      setLoading(false);
    }
  }

  const toggleDataDetails = (index) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const capitalize = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).replaceAll("_", " ");

  if (loading) return <p>Loading data details...</p>;

  return (
    <>
      <div
        onClick={() => {
          setShowDatas(!showDatas);
          if (!showDatas && datas.length < 1) {
            loadDatas();
          }
        }}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 mb-4 rounded flex flex-row items-center justify-between cursor-pointer"
      >
        {showDatas ? `Hide ${dataName}` : `Show ${dataName}`}
        {showDatas ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
      {showDatas && !loading && (
        <div className="bg-gray-700 p-2 rounded overflow-auto max-h-[30vh]">
          {datas.map((data, index) => (
            <div key={data.name} className="mb-4">
              <div
                onClick={() => toggleDataDetails(index)}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer"
              >
                <p className="font-bold">{data.name}</p>
                {openIndices[index] ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                )}
              </div>
              {openIndices[index] && (
                <div className="bg-gray-900 p-4 mt-2 rounded">
                  {Object.keys(data)
                    .filter((key) => keysToShow.includes(key))
                    .map((key) => (
                      <p key={key} className="text-sm text-gray-400">
                        <strong>{capitalize(key)}:</strong> {data[key]}
                      </p>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DataList;
