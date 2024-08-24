"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Head from 'next/head';


export default function Home() {
  const [commentsData, setCommentsData] = useState([]);

  const fetchCommentsData = () => {
    fetch('/data/comments.json')
      .then(response => response.json())
      .then(data => setCommentsData(data));
  };

  useEffect(() => {
    fetchCommentsData();
    const intervalId = setInterval(fetchCommentsData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCommentsData((prevComments) => {
        if (prevComments.length > 0) {
          const [first, ...rest] = prevComments;
          return [...rest, first]; // 첫 번째 항목을 배열 끝으로 이동
        }
        return prevComments;
      });
    }, 1000); // 2초마다 한 항목씩 이동

    return () => clearInterval(intervalId);
  }, [commentsData]);

  return (
    <div className="App">
      <Head>
        <title>P.EYE</title>
        <meta name="description" content="P.EYE" />
      </Head>
      
      <div className="viewMain">
        <h1 style={{color:"#FF7436"}}>p.eye</h1>
        <h4>Luck on your side</h4>
        <h3>MIRAGE!</h3>
        <ul className="view-board">
          {commentsData.slice(0, 5).map((e, i) => (
            e.active && (
              <li key={i} className="view-items">
                {e.content}
                <span className="view-items-time">
                  {e.timestamp.substring(0, 4)}년 
                  {e.timestamp.substring(4, 6)}월 
                  {e.timestamp.substring(6, 8)}일 
                  {e.timestamp.substring(8, 10)}:{e.timestamp.substring(10, 12)}
              </span>
              </li>
            )
          ))}
        </ul>
        <Link href="/view/add" className='add-btn'>추가하기</Link>
      </div>
    </div>
  );
}
