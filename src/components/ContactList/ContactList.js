import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'store/operations';
import { selectVisibleContacts } from '../../store/selectors';
import { List, Item } from './ContactList.styled';

export const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <Item key={id}>
          <span>{name}:</span>
          <span>{number}</span>

          <button type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </button>
        </Item>
      ))}
    </List>
  );
};
