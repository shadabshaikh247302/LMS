"use client"
import ModalButton from '@/app/components/Button/CustomModalBtn'
// import CreateBatchForm from '@/app/components/Form/CreateBatchForm';
// import CreateBatchForm from '@/app/components/Form/CreateBatchForm';
import CustomModal from '@/app/components/modal/CustomModal'
import BatchTable from '@/app/components/table/BatchTable';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const NO_SSR = dynamic(() => import("@/app/components/Form/CreateBatchForm"), { ssr: false });


export default function page() {
    const [isModalOpen, setModalOpen] = useState({
      addBatch: false,
      viewDetails: false,
    });

  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true }));
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false }));

  return (
    <>
      <div className="d-flex justify-content-start">
        <ModalButton handleClick={() => handleOpenModal("addBatch")}>
          <i className="bi bi-file-earmark-spreadsheet-fill"></i> New Batch
        </ModalButton>

      </div>

      <div className="mt-3">
        <BatchTable/>        
      </div>

      {/* Modal component */}
      <CustomModal
        id="addBatch"
        isVisible={isModalOpen.addBatch}
        onClose={() => handleCloseModal("addBatch")}
        title="Add New Batch"
      >
        <NO_SSR/>
      </CustomModal>
    </>
  )
}
