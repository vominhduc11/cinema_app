import React from 'react';

function ContentFilm({ movie }) {
    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    Nội dung phim
                </h2>
                <div className="bg-gray-800 rounded-lg p-6 text-gray-300 leading-relaxed">
                    <p>
                        {movie.description ||
                            `
      ${movie.title} là một bộ phim được mong đợi nhất năm 2023. Bộ phim kể về cuộc phiêu lưu của nhân vật chính trong một thế giới đầy nguy hiểm và bí ẩn. 
      Với những cảnh quay đẹp mắt và kịch tính, phim hứa hẹn sẽ đem đến cho khán giả những trải nghiệm điện ảnh đáng nhớ.
      
      Đạo diễn bởi một trong những tên tuổi hàng đầu Hollywood, bộ phim có sự tham gia của dàn diễn viên tài năng và nổi tiếng. 
      Đặc biệt, phim sử dụng công nghệ hiện đại nhất hiện nay để tạo ra những hiệu ứng hình ảnh đẹp mắt và chân thực.
    `}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ContentFilm;
