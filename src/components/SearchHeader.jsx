import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SearchHeader() {
  const [value, setValue] = useState("");
  const {keyword} = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Videos/${value}`);
  };

  useEffect(()=>{
    setValue(keyword || '');
  },[keyword])

  return (
    <header>
      <Link to="/">
        <img src="/favicon.ico" alt="youtube" />
        <h1>Youtube</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력허세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </header>
  );
}
