import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { AiOutlineCloudUpload, AiFillDelete } from 'react-icons/ai';
import Button from '../Button';
import { client } from '../../utils/client';
import { FormInput, Spinner } from '..';
import { categories } from '../../utils/dataQuery';
import {
  CreatePinContainer,
  MainContainer,
  UploadContainer,
  FormContainer,
} from './CreatePin.styles';

const INITIAL_FORM_STATE = {
  title: '',
  about: '',
  destination: '',
  category: '',
};

const CreatePin = ({ loginedUser }) => {
  // STATE MANAGEMENT
  const [formFields, setFormFields] = useState(INITIAL_FORM_STATE);
  const [imageAsset, setImageAsset] = useState(null);

  const [loading, setLoading] = useState(false);
  const [savingPin, setSavingPin] = useState(false);

  // CONFIGURATION
  // const navigate = useNavigate();
  const { title, about, destination, category } = formFields;

  // HANDLER
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/jpg' ||
      type === 'image/tiff'
    ) {
      setLoading(true);

      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Image upload failed, please try again later.');
        });
    } else {
      toast.error('Wrong image type!');
    }
  };

  const savePin = () => {
    if (title && about && destination && category && imageAsset?._id) {
      setSavingPin(true);
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        category,
        hidden: false,
        image: {
          _type: 'image',
          asset: {
            _type: 'referene',
            _ref: imageAsset?._id,
          },
        },
        userId: loginedUser._id,
        postedBy: {
          _type: 'postedBy',
          _ref: loginedUser._id,
        },
      };
      client.create(doc).then(() => {
        toast.success(`Created Pin <${title}> successfully!`);
        setSavingPin(false);
        setFormFields(INITIAL_FORM_STATE);
        setImageAsset(null);
      });
    } else {
      toast.warn('Please fill in all the fields');
    }
  };

  return (
    <CreatePinContainer>
      <MainContainer>
        <UploadContainer>
          <div className="inner-container">
            {loading && <Spinner message="Uploading image..." />}
            {imageAsset ? (
              <>
                <img
                  src={imageAsset?.url}
                  alt="uploaded"
                  className="uploaded-image"
                />
                <button
                  className="delete-btn"
                  onClick={() => setImageAsset(null)}
                >
                  <AiFillDelete size={20} />
                </button>
              </>
            ) : (
              <>
                {!loading && (
                  <label>
                    <div className="upload-box">
                      <AiOutlineCloudUpload size={30} />
                      <p>Click to upload</p>
                    </div>
                    <div className="fomatting-reminder">
                      Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF
                      or TIFF less than 20MB
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      onChange={uploadImage}
                      className="upload-input"
                    />
                  </label>
                )}
              </>
            )}
          </div>
        </UploadContainer>
        <FormContainer>
          <FormInput
            placeholder="Add your title"
            type="text"
            name="title"
            value={title}
            onChange={onChangeHandler}
          />
          <FormInput
            placeholder="Tell everyone what your pin is about"
            type="text"
            name="about"
            value={about}
            onChange={onChangeHandler}
          />
          <FormInput
            placeholder="Add a destination link"
            type="url"
            name="destination"
            value={destination}
            onChange={onChangeHandler}
          />
          <div className="select-field">
            <p>Choose Pin Category</p>
            <select name="category" value={category} onChange={onChangeHandler}>
              <option value="" disabled>
                Select category
              </option>
              {categories?.map((item, i) => (
                <option value={item.name} key={i}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" onClick={savePin}>
            {savingPin ? 'Saving...' : 'Save Pin'}
          </Button>
        </FormContainer>
      </MainContainer>
    </CreatePinContainer>
  );
};

export default CreatePin;
