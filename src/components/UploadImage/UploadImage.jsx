/* eslint-disable react/prop-types */
import { Upload, Form, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import uploadFile from "../../utils/file";

const UploadImage = ({
  label,
  fileList,
  setFileList,
  setUrl,
  maxCount = 1,
  accept = "image/*", // Default to accept images
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const customUpload = async ({ file, onSuccess, onError }) => {
    try {
      const url = await uploadFile(file);
      onSuccess(url);
      setUrl(url);
    } catch (error) {
      onError(error);
    }
  };

  const uploadButton = <Button icon={<PlusOutlined />}>Upload</Button>;

  return (
    <Form.Item
      label={label || "Upload"} // Default label if undefined
      rules={[
        {
          required: true,
          message: `Please upload the ${label ? label.toLowerCase() : "file"}!`,
        },
      ]}
    >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUploadChange}
        customRequest={customUpload}
        multiple={maxCount > 1}
        accept={accept} // Accept prop to specify file types
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Form.Item>
  );
};

export default UploadImage;
