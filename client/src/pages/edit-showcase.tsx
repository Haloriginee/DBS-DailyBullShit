import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import Form from 'components/common/Form';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';


const EditShowcase = () => {

  const { data: user } = useGetIdentity();
  const [showcaseImage, setShowcaseImage] = useState({ name: '', url: '' });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setShowcaseImage({ name:file?.name, url: result }));
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!showcaseImage.name) return alert("please upload image");

    await onFinish({ ...data, photo: showcaseImage.url, email:user.email })
  }

  return (
    <Form
      type="Edit"
      formLoading={formLoading}
      onFinish={onFinish}
      onFinishHandler={onFinishHandler}
      handleImageChange={handleImageChange}
      register={register}
      showcaseImage={showcaseImage}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditShowcase
