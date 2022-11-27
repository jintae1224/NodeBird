import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import ImageZoom from "./ImageZoom";

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  // console.log(images);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImageZoom image={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: "50%", display: "inline-block" }}
          role="presentation"
          src={`http://localhost:3065/${images[1].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          style={{ width: "50%", display: "inline-block" }}
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImageZoom image={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <div>
      <img
        style={{ width: "50%" }}
        role="presentation"
        src={`http://localhost:3065/${images[0].src}`}
        alt={images[0].src}
        onClick={onZoom}
      />
      <div
        role="presentation"
        style={{
          display: "inline-block",
          width: "50%",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 보기
      </div>
      {showImageZoom && <ImageZoom image={images} onClose={onClose} />}
    </div>
  );
};

export default PostImages;
