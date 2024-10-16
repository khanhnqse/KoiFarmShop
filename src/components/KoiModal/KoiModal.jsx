/* eslint-disable react/prop-types */
import { Modal } from "antd";
import KoiForm from "../KoiForm/KoiForm";

const KoiModal = ({
  openModal,
  handleCloseModal,

  form,
  submitting,
  fileListKoi,
  fileListCertificate,
  handleChangeKoi,
  handleChangeCertificate,
  handlePreview,
  isUpdateMode,
}) => {
  return (
    <Modal
      confirmLoading={submitting}
      title={isUpdateMode ? "Update Koi" : "Create new Koi"}
      open={openModal}
      onCancel={handleCloseModal}
      onOk={() => form.submit()}
    >
      <KoiForm
        form={form}
        fileListKoi={fileListKoi}
        fileListCertificate={fileListCertificate}
        handleChangeKoi={handleChangeKoi}
        handleChangeCertificate={handleChangeCertificate}
        handlePreview={handlePreview}
      />
    </Modal>
  );
};

export default KoiModal;
