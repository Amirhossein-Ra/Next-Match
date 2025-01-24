import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";
import React from "react";
import EditForm from "../EditForm";
import { AuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import ImageUploadButton from "@/components/ImageUploadButton";

export default async function PhotosPage() {
  const userId = await AuthUserId();
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="Image of user"
                />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={true} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton selected={true} loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
