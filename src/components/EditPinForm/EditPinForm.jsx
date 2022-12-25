import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { categories } from '../../utils/dataQuery';
import { FormInput, Overlay } from '..';
import Button, { BUTTON_TYPES_CLASSES } from '../Button';
import { urlFor, client } from '../../utils/client';
import { updatePinRequest } from '../../utils/requests';

import {
  ModalContainer,
  ContentContainer,
  FormContainer,
  ImageContainer,
  ButtonsContainer,
} from './EditPinForm.styles';

const EditPinForm = ({ pin, loginedUser, setShowEditForm }) => {
  // CONFIGURATION
  const navigate = useNavigate();
  const INITIAL_FORM_FIELDS = {
    title: pin?.title,
    about: pin?.about,
    destination: pin?.destination,
    category: pin?.category,
  };

  // STATE MANAGEMENT
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const [editing, setEditing] = useState(false);

  const { title, about, destination, category } = formFields;

  // HANDLERS
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const deletePinHandler = () => {
    client.delete(pin?._id).then(() => {
      toast.success('Deleted pin successfully!');
      navigate(-1);
      setShowEditForm(false);
    });
  };

  const updatePinHandler = () => {
    setEditing(true);
    const doc = {
      _type: 'pin',
      title,
      about,
      destination,
      category,
      userId: loginedUser._id,
      postedBy: {
        _type: 'postedBy',
        _ref: loginedUser._id,
      },
    };

    updatePinRequest(pin, doc, client)
      .then(() => {
        setEditing(true);
        setFormFields(INITIAL_FORM_FIELDS);
        setShowEditForm(false);
        toast.success('Updated successfully!');
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <>
      <ModalContainer>
        <div className="heading">
          <h2>Edit your pin</h2>
        </div>
        <ContentContainer>
          <FormContainer>
            <form>
              <FormInput
                label="title"
                name="title"
                value={title}
                onChange={onChangeHandler}
              />
              <FormInput
                label="about"
                name="about"
                value={about}
                onChange={onChangeHandler}
              />
              <FormInput
                label="destination"
                name="destination"
                value={destination}
                onChange={onChangeHandler}
              />
              <div className="select-field">
                <p>Choose Pin Category</p>
                <select
                  name="category"
                  value={category}
                  onChange={onChangeHandler}
                >
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
            </form>
          </FormContainer>
          <ImageContainer>
            {pin && (
              <img src={urlFor(pin?.image)?.width(150).url()} alt="pin-img" />
            )}
          </ImageContainer>
        </ContentContainer>
        <ButtonsContainer>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.grey}
            onClick={() => {
              deletePinHandler();
            }}
          >
            Delete
          </Button>
          <div className="edit-buttons">
            <Button
              buttonType={BUTTON_TYPES_CLASSES.grey}
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </Button>
            <Button
              buttonType={BUTTON_TYPES_CLASSES.grey}
              valueLength={formFields}
              onClick={() => {
                updatePinHandler();
              }}
            >
              {editing ? 'Updating' : 'Save'}
            </Button>
          </div>
        </ButtonsContainer>
      </ModalContainer>
      <Overlay bgColor="black" />
    </>
  );
};

export default EditPinForm;
