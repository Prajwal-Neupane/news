import EditPostform from "@/components/EditPostform";

import React from "react";

const EditPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div>
      <EditPostform postId={id} />
    </div>
  );
};

export default EditPage;
