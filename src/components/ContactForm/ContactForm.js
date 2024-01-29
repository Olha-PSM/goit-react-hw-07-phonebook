import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledField,
  Label,
  StyledForm,
  Button,
  ErrorMsg,
} from './ContactForm.styled';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'store/operations';
import { selectContacts } from '../../store/selectors';
import Notiflix from 'notiflix';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(60, 'Too Long!')
    .required('Required'),
  number: Yup.number().required('Required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const checkedContact = contact => {
    return contacts.some(
      element => element.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  const newContact = contact => {
    if (checkedContact(contact)) {
      Notiflix.Notify.failure(`${contact.name} already in contacts`);
    } else {
      dispatch(addContact(contact));
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        newContact(values);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <Label>
          Name
          <StyledField name="name" type="text" />
          <ErrorMsg name="name" component="div" />
        </Label>
        <Label>
          Number
          <StyledField name="number" type="number" />
          <ErrorMsg name="number" component="div" />
        </Label>

        <Button type="submit">Submit</Button>
      </StyledForm>
    </Formik>
  );
};
