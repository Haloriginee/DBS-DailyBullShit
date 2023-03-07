import React from 'react'

import { useState } from 'react'
import { useNavigate } from '@pankod/refine-react-router-v6'
import { useGetIdentity } from '@pankod/refine-core'
import { FieldValues, useForm } from '@pankod/refine-react-hook-form'
import Form from 'components/common/Form'

const CreateShowcase = () => {

  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [showcaseImage, setShowcaseImage] = useState({ name: '', url: ''})

  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setShowcaseImage({ name: file?.name, url: result }));
  };

  const onFinishHandler = async (data: FieldValues) => {
    if(!showcaseImage.name) return alert('Please select an image');

    await onFinish({ ...data, photo: showcaseImage.url, email: user.email })
  };

  return (

    <Form
      type="Create"
      onFinish={onFinish}
      formLoading={formLoading}
      register={register}
      showcaseImage={showcaseImage}
      handleImageChange={handleImageChange}
      onFinishHandler = {onFinishHandler}
      handleSubmit={handleSubmit}
    />

  )
}

export default CreateShowcase
