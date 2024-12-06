import { useState } from "react"
import React from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useSnackbar } from "notistack"

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const DeleteBook = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${apiUrl}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert("Error! Please check console");
        enqueueSnackbar("Error! Please check console", { variant: "error" });
        console.log(error);
    });
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
          <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
          Yes, Delete
        </button>
        </div>
    </div>
  )
}

export default DeleteBook
