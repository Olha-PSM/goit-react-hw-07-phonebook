import { Input, Label } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'store/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Label>
      <p>Find contacts by name</p>
      <Input
        type="text"
        name="filter"
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </Label>
  );
};
