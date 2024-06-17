import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./Style"; // 스타일 컴포넌트 import 확인
import SearchBar from "../../component/common/SearchBar";
import { useLocation, Link } from "react-router-dom";

const MyPagePost = () => {
  const location = useLocation();
  const { endpoint } = location.state || {};
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (endpoint) {
      fetchPosts(endpoint, currentPage);
    }
  }, [endpoint, currentPage]);

  const fetchPosts = (endpoint, page) => {
    axios
      .get(endpoint, { params: { page } })
      .then((response) => {
        setPosts(response.data.result);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getLinkPath = (postId) => {
    if (endpoint.includes("type=question")) {
      return `/readQnA/${postId}`;
    }
    return `/readFree/${postId}`;
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <S.Container>
      <SearchBar />
      {posts.map((post) => (
        <Link
          to={getLinkPath(post.id)}
          key={post.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <S.PostItem>
            <div>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
            <p>{new Date(post.creation_date).toLocaleDateString()}</p>
          </S.PostItem>
        </Link>
      ))}
      <S.Pagination>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </S.Pagination>
    </S.Container>
  );
};

export default MyPagePost;
