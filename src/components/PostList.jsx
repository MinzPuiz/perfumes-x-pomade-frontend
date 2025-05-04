import React, { useEffect, useState } from 'react';
import { getPosts } from '../../services/postServices';
import Slider from 'react-slick';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
      .catch(err => console.error('Lỗi khi lấy danh sách bài viết:', err));
  }, []);

  const settings = {
    dots: false,
    infinite: posts.length > 4,
    speed: 500,
    slidesToShow: Math.min(posts.length, 4),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(posts.length, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(posts.length, 2),
        },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-[#5d4037] mb-8 tracking-wider">
        📝 Bài viết mới nhất
      </h2>

      <Slider {...settings}>
        {posts.map(post => (
          <div key={post.id} className="px-2">
            <div className="bg-[#fff8e1] border border-[#d7ccc8] rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden">
              <img
                src={`https://minzpuiz.click/posts/${post.thumbnail.split('/').pop()}`}
                alt={post.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold text-[#3e2723] truncate">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6d4c41] mt-1">
                  {new Date(post.published_at).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-sm text-[#6d4c41] mt-1 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 text-right">
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-[#bf360c] hover:underline text-sm font-medium"
                  >
                    Xem bài viết →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PostList;
