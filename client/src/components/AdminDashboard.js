import React from "react";
import AdminHeader from './AdminHeader';
import AdminActionButtons from './AdminActionButtons';
import AdminCategoryModal from './AdminCategoryModal';
import AdminProductModal from './AdminProductModal';

const AdminDashboard = () => {
 

  return (
    <section>
   <AdminHeader />
   <AdminActionButtons />
  <AdminCategoryModal />
  <AdminProductModal />
    </section>
  );
};

export default AdminDashboard;
